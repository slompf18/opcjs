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
- Arrays: valueRank/isArray → `T[]`.
- Optional fields: `?` (optionally `| undefined`).

### Enums & OptionSets
- Emit `enum`/`const enum` (configurable) with numeric values, **suffix enum names with `Enum` if the enum names last 4 letters are not already 'enum'**.
- When encoding an enum, call the enum helper with the value (e.g., `SecurityTokenRequestTypeEnum.encode(writer, value)`); decoding uses the same helper.
- For option sets, emit bitflag helpers (e.g., `hasFlag(value, Flag.X)`).

Template:
```
// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

/**
 * doc
 */
export enum ConversionLimitEnumEnum {
    NoConversion = 0,
    Limited = 1,
    Unlimited = 2,
}

export namespace ConversionLimitEnumEnum {
    export function decode(reader: BufferReader): ConversionLimitEnumEnum {
        return reader.readInt32() as ConversionLimitEnumEnum;
    }

    export function encode(writer: BufferWriter, value: ConversionLimitEnumEnum): void {
        writer.writeInt32(value as any);
    }
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

### Abstract Types
- Types with `IsAbstract="true"` and no fields are generated as empty placeholder classes.
- Abstract types serve as base types for polymorphic references (e.g., `DataSetWriterTransportDataType`, `DataSetWriterMessageDataType`, `ReceiveQosDataType`).
- Abstract types must also implement the `IEncodable` interface.
- Generated abstract types include:
  - Empty constructor: `constructor() { }`
  - Static decode returning instance: `public static decode(reader: BufferReader): TypeName`
  - Empty encode method: `encode(writer: BufferWriter): void`
  - Comment markers indicating the type is abstract with no fields to encode/decode.

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
- The ids for the binary decoders can be found in NodeIds.csv. Look in the first column for the type name appended with '_Encoding_DefaultBinary' or '_Encoding_DefaultXML'.
- Add a switch case for all types in SchemaCodec in both methods.

Generate three files:
nodeSets/binaryDecoder.ts
```
import { BufferReader } from "../codecs/binary/bufferReader";

export const decodeOpenSecureChannelRequest = (reader: BufferReader) => {    const { OpenSecureChannelRequest } = require("./types/openSecureChannelRequest");    return OpenSecureChannelRequest.decode(reader); }
```

nodeSets/binaryEncoders.ts
```
import { BufferWriter } from "../codecs/binary/bufferWriter";
import { IIdentifiable } from "../codecs/iIdentifiable";
import { ExpandedNodeId } from "../types/expandedNodeId";
import { NodeId } from "../types/nodeId";

export const encodeId = (writer: BufferWriter, encoderId: number) => {
   const id = new ExpandedNodeId(NodeId.NewFourByte(0,encoderId));
   writer.writeExpandedNodeId(id);
}

export const encodeOpenSecureChannelRequest = (writer: BufferWriter, identifiable: IIdentifiable) => {    
  encodeId(writer, 446);
  (identifiable as any).encode(writer);
}
```

nodeSets/schemaCodec.ts
```
import { BufferReader } from "../codecs/binary/bufferReader";
import { BufferWriter } from "../codecs/binary/bufferWriter";
import { IIdentifiable } from "../codecs/iIdentifiable";

export class SchemaCodec {

    public static encodeBinary(writer: BufferWriter, obj: IIdentifiable): void {
        const id = obj.id;
        switch (id) {
            case 29: require("./binaryEncoders").encodeEnumeration(writer, obj); break;
            case 446: require("./binaryEncoders").encodeOpenSecureChannelRequest(writer, obj); break;
            case 447: require("./binaryEncoders").encodeOpenSecureChannelResponse(writer, obj); break;
            default:
                throw new Error(`Binary encoder for id ${id} not found`);
        }
    }

    public static decode(reader: BufferReader): unknown {
        const eid = reader.readExpandedNodeId();
        const id = eid.NodeId.Identifier as number;
        switch (id) {
            case 29: return require("./binaryDecoders").decodeEnumeration(reader);
            case 444: return require("./binaryDecoders").decodeOpenSecureChannelRequest(reader);
            case 447: return require("./binaryDecoders").decodeOpenSecureChannelResponse(reader)‚;
            default:
                throw new Error(`Binary decoder for id ${id} not found`);
        }
    }
}
```

**Important**: 
- All imports in binaryDecoders and binaryEncoders use `require()` to dynamically load types where needed, avoiding massive import statements.
- Switch cases in schemaCodec.ts must be **sorted by id** (ascending order) for maintainability and binary search optimization.
- Encoder functions use `(identifiable as any).encode(writer)` to avoid TypeScript type system conflicts with dynamic require() loading.
- The decode method reads the ExpandedNodeId from the buffer first, then extracts the numeric identifier for the switch statement.
- Decoder functions use dynamic `require()` to load the type class and call its static `decode()` method.

## Testing
- Not required for now.

## CLI/API Shape
- CLI: `npm run generate:services` should execute the generator with defaults; allow `--input schema/Opc.Ua.NodeSet2.Services.xml --outDir ./generated` overrides via args.
- API: `generate({ input, outDir, ...config })`.
