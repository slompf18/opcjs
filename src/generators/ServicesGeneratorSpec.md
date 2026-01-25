# OPC UA Services TypeScript Generator Specification

## Goal
Convert `schema/Opc.Ua.NodeSet2.Services.xml` into TypeScript types (classes/enums) **and** runtime encoders/decoders for OPC UA services. Use the following template for generated classes (constructor with fields, static `decode(BufferReader)`, instance `encode(BufferWriter)`), and preserve documentation as JSDoc.

## General
- Parse the models only once:
  - nodeSets/Opc.Ua.NodeSet2.Services.xml
    - **Type names**: Prefer `SymbolicName` over `BrowseName` when available. `SymbolicName` provides valid identifiers (e.g., `ThreeDCartesianCoordinates` instead of `3DCartesianCoordinates`).
    - **Numeric prefixes**: If a type name starts with digits and no `SymbolicName` exists, convert leading numbers to word equivalents (e.g., `3D` → `ThreeD`).
    - Resolve aliases/typedefs; normalize namespaces → import paths or local symbols.
    - Validate XML schema expectations; fail fast with clear errors on unresolved types.
    - Emit comments for unresolved/unknown types; fall back to `unknown`.
  - nodeSets/schema/NodeIds.csv

## Type generation

- The generated types shall end in the nodeSets/types folder.

### Type Mapping (core)
- Built-ins → TS:
  - Boolean→`boolean`; SByte/Byte/Int16/UInt16/Int32/UInt32→`number`; Int64/UInt64→`bigint`; Float→`Float32` (number); Double→`Float64` (number); String→`string`.
  - DateTime→`Date`; Guid→`Guid` (class); ByteString→`ByteString` (type alias for `Uint8Array`).
  - NodeId→`NodeId` (class); ExpandedNodeId→`ExpandedNodeId` (class).
  - LocalizedText→`LocalizedText` (class); QualifiedName→`QualifiedName` (class).
  - StatusCode→`StatusCode` (enum - UInt32 values); ExtensionObject→`ExtensionObject` (class).
  - **Variant**: Fields without a `DataType` attribute are mapped to `Variant` (holds any OPC UA value).
- Arrays: valueRank/isArray → `T[]`. For array fields, element type is the base type without optional markers (e.g., `string[]` not `string | undefined[]`).
- Optional fields: `?` (optionally `| undefined`) for non-array fields only.

### Enums & OptionSets
- Emit `enum`/`const enum` (configurable) with numeric values, **suffix enum names with `Enum` if the enum names last 4 letters are not already 'enum'**.
- All enums are UInt32 values.
- Enums are encoded/decoded directly using `writer.writeUInt32()` and `reader.readUInt32()` - no separate encode/decode functions are generated.
- For option sets, emit bitflag helpers (e.g., `hasFlag(value, Flag.X)`).

Template:
```typescript
// AUTO-GENERATED – DO NOT EDIT

/**
 * doc
 */
export enum ConversionLimitEnumEnum {
    NoConversion = 0,
    Limited = 1,
    Unlimited = 2,
}
```

### Structures
- Emit `class` per structure with JSDoc from XML comments.
- All classes must implement the `IIdentifiable` interface.
- Preserve original type names and namespaces (apply configurable prefix if needed).
- The id can be aquired from the NodeIds.csv. Use the name, look for it in the first column to find the type. 

Template:
```
import { RequestHeader } from "./requestHeader";
import { UInt32, ByteString } from "../../types/baseTypes";
import { SecurityTokenRequestTypeEnum } from "./securityTokenRequestType";
import { MessageSecurityModeEnum } from "./messageSecurityMode";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * OpenSecureChannelRequest
 */
export class OpenSecureChannelRequest implements IIdentifiable { 
    readonly id = 444
    constructor(
        public RequestHeader: RequestHeader,
        public ClientProtocolVersion: UInt32,
        public RequestType: SecurityTokenRequestTypeEnum,
        public SecurityMode: MessageSecurityModeEnum,
        public ClientNonce: ByteString,
        public RequestedLifetime: UInt32
    ) { }
}
```

**Important**: 
- Types should only have constructor with fields and readonly id. No encode/decode methods on the type classes themselves - encoding/decoding is handled by separate encoder/decoder functions.
- No parameters in the constructor of types can be null or undefined. All constructor parameters are required and non-nullable.

### Abstract Types
- Types with `IsAbstract="true"` and no fields are generated as empty placeholder classes.
- Abstract types serve as base types for polymorphic references (e.g., `DataSetWriterTransportDataType`, `DataSetWriterMessageDataType`, `ReceiveQosDataType`).
- Abstract types must also implement the `IIdentifiable` interface.
- Generated abstract types include only:
  - Empty constructor: `constructor() { }`
  - readonly id field if available

### Type Aliases
- The generator maintains a comprehensive mapping of OPC UA type aliases to their underlying types.
- All 53 type aliases are resolved (e.g., `NumericRange→String`, `Duration→Double`, `IntegerId→UInt32`, `Counter→UInt32`, etc.).
- Type aliases include categories:
  - Numeric types: `Duration`, `UtcTime`, `IntegerId`, `Counter`, `Index`, etc.
  - String types: `NumericRange`, `Uri@String`, `NormalizedString`, `DecimalString`, etc.
  - ByteString types: `ImageBMP`, `ImageGIF`, `ImageJPG`, `ImagePNG`, `AudioDataType`, etc.
  - Complex types: `ContinuationPoint`, `Enumeration`, `Structure`, etc.


## Codecs 
- Always emit binary encode/decode per generated type for all generated types.
- JSON/XML codecs are out-of-scope for now.
- **Important**: Two different IDs are used:
  - **Type ID**: Found in NodeIds.csv with just the type name (e.g., `OpenSecureChannelRequest,444,DataType`). This is stored in the `id` field of the class and used for the encoder switch statement.
  - **Encoding ID**: Found in NodeIds.csv with `_Encoding_DefaultBinary` suffix (e.g., `OpenSecureChannelRequest_Encoding_DefaultBinary,446,Object`). This is written to the wire by `encodeId()` and used for the decoder switch statement.
- Add a switch case for all types in SchemaCodec in both methods.

Generate three files:

### nodeSets/binaryDecoders.ts
All decoder functions are organized in a static `BinaryDecoders` class:
```typescript
import { BufferReader } from "../codecs/binary/bufferReader";
import { MessageSecurityModeEnum } from "./types/messageSecurityMode";
import { SecurityTokenRequestTypeEnum } from "./types/securityTokenRequestType";

export class BinaryDecoders {
    static decodeOpenSecureChannelRequest = (reader: BufferReader) => {
        const { OpenSecureChannelRequest } = require("./types/openSecureChannelRequest");
        return new OpenSecureChannelRequest(
            BinaryDecoders.decodeRequestHeader(reader),
            reader.readUInt32(),
            reader.readUInt32() as SecurityTokenRequestTypeEnum,
            reader.readUInt32() as MessageSecurityModeEnum,
            reader.readByteString(),
            reader.readUInt32()
        );
    };
}
```

**Note**: All enum types used across all structures are imported at the top of the file for TypeScript compile-time type checking, but are not required inline since type casts have no runtime effect.

### nodeSets/binaryEncoders.ts
All encoder functions are organized in a static `BinaryEncoders` class with inline encoding logic:
```typescript
import { BufferWriter } from "../codecs/binary/bufferWriter";
import { IIdentifiable } from "../codecs/iIdentifiable";

export class BinaryEncoders {
    static encodeOpenSecureChannelRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {
        const obj = identifiable as any;
        BinaryEncoders.encodeRequestHeader(writer, obj.RequestHeader);
        writer.writeUInt32(obj.ClientProtocolVersion);
        writer.writeUInt32(obj.RequestType);
        writer.writeUInt32(obj.SecurityMode);
        writer.writeByteString(obj.ClientNonce);
        writer.writeUInt32(obj.RequestedLifetime);
    };
}
```

**Note**: 
- Individual encoder functions do **not** call `encodeId()`. The type ID is written once in `SchemaCodec.encodeBinary()` before calling the encoder function.
- Enum values are encoded directly using `writeUInt32()` - no separate enum encode/decode functions or enum imports needed.
- NodeId is imported for potential use by encoder functions that need to encode NodeId fields.

### nodeSets/schemaCodec.ts
The SchemaCodec class imports and uses the static encoder/decoder classes:
```typescript
import { BufferReader } from "../codecs/binary/bufferReader";
import { BufferWriter } from "../codecs/binary/bufferWriter";
import { IIdentifiable } from "../codecs/iIdentifiable";
import { ExpandedNodeId } from "../types/expandedNodeId";
import { NodeId } from "../types/nodeId";
import { BinaryEncoders } from "./binaryEncoders";
import { BinaryDecoders } from "./binaryDecoders";

export class SchemaCodec {

    private static encodeId(writer: BufferWriter, id: number): void {
        const eid = new ExpandedNodeId(NodeId.NewFourByte(0, id));
        writer.writeExpandedNodeId(eid);
    }

    public static encodeBinary(writer: BufferWriter, obj: IIdentifiable): void {
        const id = obj.id;  // Uses type ID from the object
        SchemaCodec.encodeId(writer, id);
        switch (id) {
            case 29: BinaryEncoders.encodeEnumeration(writer, obj); break;
            case 444: BinaryEncoders.encodeOpenSecureChannelRequest(writer, obj); break;  // Type ID: 444
            case 447: BinaryEncoders.encodeOpenSecureChannelResponse(writer, obj); break;
            default:
                throw new Error(`Binary encoder for id ${id} not found`);
        }
    }

    public static decode(reader: BufferReader): unknown {
        const eid = reader.readExpandedNodeId();
        const id = eid.NodeId.Identifier as number;  // Reads encoding ID from wire
        switch (id) {
            case 29: return BinaryDecoders.decodeEnumeration(reader);
            case 446: return BinaryDecoders.decodeOpenSecureChannelRequest(reader);  // Encoding ID: 446
            case 450: return BinaryDecoders.decodeOpenSecureChannelResponse(reader);
            default:
                throw new Error(`Binary decoder for id ${id} not found`);
        }
    }
}
```

**Important**: 
- All encoder and decoder functions are organized as static methods within `BinaryEncoders` and `BinaryDecoders` classes respectively.
- Encoder functions contain inline encoding logic with all field encoding happening directly in the function body.
- Decoder functions construct type instances directly with decoded field values.
- All enum types used in decoders are imported at the top of the file for compile-time type checking (sorted alphabetically and deduplicated).
- Type casts like `as EnumType` are compile-time only and have no runtime effect.
- Encoders use `const obj = identifiable as any` to access fields with type safety bypass for dynamic requires.
- Complex type encoding/decoding uses `BinaryEncoders.encodeTypeName()` / `BinaryDecoders.decodeTypeName()` for recursive calls.
- Switch cases in schemaCodec.ts must be **sorted by id** (ascending order) for maintainability.
- The decode method reads the ExpandedNodeId from the buffer first, then extracts the numeric identifier for the switch statement.

## Testing
- Not required for now.

## CLI/API Shape
- CLI: `npm run generate:services` should execute the generator with defaults; allow `--input schema/Opc.Ua.NodeSet2.Services.xml --outDir ./generated` overrides via args.
- API: `generate({ input, outDir, ...config })`.
