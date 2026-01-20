# OPC UA Services TypeScript Generator Specification

## Goal
Convert `schema/Opc.Ua.NodeSet2.Services.xml` into TypeScript types (interfaces/enums) **and** runtime encoders/decoders for OPC UA services. Use the following template for generated classes (constructor with fields, static `decode(BufferReader)`, instance `encode(BufferWriter)`), and preserve documentation as JSDoc.

```
import { BufferReader } from "../coders/binary/bufferReader";
import { BufferWriter } from "../coders/binary/bufferWriter";
import { IEncodable } from "../coders/iEncodable";
import { UInt32 } from "../types/baseTypes"
import { ByteString } from "../types/byteString"

export class OpenSecureChannelResponse implements IEncodable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public ServerProtocolVersion: UInt32,
        public SecurityToken: ChannelSecurityToken,
        public ServerNonce: ByteString
    ) { }

    static decode(buffer: BufferReader) {
        const obj = new OpenSecureChannelResponse(
            ResponseHeader.decode(buffer),
            buffer.readUInt32(),
            ChannelSecurityToken.decode(buffer),
            buffer.readByteString()
        );
        return obj;
    }

    encode(buffer: BufferWriter) {
        this.ResponseHeader.encode(buffer);
        buffer.writeUInt32(this.ServerProtocolVersion);
        this.SecurityToken.encode(buffer);
        this.ServerNonce.encode(buffer);
    }
}
```

## Inputs & Outputs
- **Input**: OPC UA NodeSet services XML (operations, requests/responses, data types, enums, option sets, encodings).
- **Output**: Generated TS declarations **with** encode/decode helpers (binary focus) grouped by types and services; barrel exports; manifest of emitted items.

## Parsing & Model
- Parse XML once; build an in-memory model:
  - Services with Request/Response pairs and encoding IDs (binary/xml/json when present).
  - DataTypes: built-ins, structures, enums, option sets; fields include name, type, isArray/valueRank, optionality, defaults, docs, namespace.
  - Resolve aliases/typedefs; normalize namespaces → import paths or local symbols.
  - **Type names**: Prefer `SymbolicName` over `BrowseName` when available. `SymbolicName` provides valid identifiers (e.g., `ThreeDCartesianCoordinates` instead of `3DCartesianCoordinates`).
  - **Numeric prefixes**: If a type name starts with digits and no `SymbolicName` exists, convert leading numbers to word equivalents (e.g., `3D` → `ThreeD`).

## Type Mapping (core)
- Built-ins → TS:
  - Boolean→`boolean`; SByte/Byte/Int16/UInt16/Int32/UInt32→`number`; Int64/UInt64→`bigint` (configurable to `number` with comment); Float/Double→`number`; String→`string`.
  - DateTime→`Date` (configurable: `string | number`);
  - Guid→`string` (UUID); ByteString→`Uint8Array`.
  - NodeId/ExpandedNodeId→`string | number` or custom `NodeId` (configurable).
  - LocalizedText→`{ locale?: string; text?: string }`; QualifiedName→`{ namespaceIndex: number; name: string }`.
  - StatusCode→`number | branded type`; ExtensionObject→`unknown | branded type`.
  - **Variant**: Fields without a `DataType` attribute are mapped to `Variant` (holds any OPC UA value).
- Arrays: valueRank/isArray → `T[]`.
- Optional fields: `?` (optionally `| undefined`).

## Enums & OptionSets
- Emit `enum`/`const enum` (configurable) with numeric values, **suffix enum names with `Enum`** (e.g., `SecurityTokenRequestTypeEnum`).
- When encoding an enum, call the enum helper with the value (e.g., `SecurityTokenRequestTypeEnum.encode(writer, value)`); decoding uses the same helper.
- For option sets, emit bitflag helpers (e.g., `hasFlag(value, Flag.X)`).

## Structures
- Emit `class` per structure with JSDoc from XML comments.
- All classes must implement the `IEncodable` interface.
- Preserve original type names and namespaces (apply configurable prefix if needed).

## Abstract Types
- Types with `IsAbstract="true"` and no fields are generated as empty placeholder classes.
- Abstract types serve as base types for polymorphic references (e.g., `DataSetWriterTransportDataType`, `DataSetWriterMessageDataType`, `ReceiveQosDataType`).
- Abstract types must also implement the `IEncodable` interface.
- Generated abstract types include:
  - Empty constructor: `constructor() { }`
  - Static decode returning instance: `public static decode(reader: BufferReader): TypeName`
  - Empty encode method: `encode(writer: BufferWriter): void`
  - Comment markers indicating the type is abstract with no fields to encode/decode.

## Type Aliases
- The generator maintains a comprehensive mapping of OPC UA type aliases to their underlying types.
- All 53 type aliases are resolved (e.g., `NumericRange→String`, `Duration→Double`, `IntegerId→UInt32`, `Counter→UInt32`, etc.).
- Type aliases include categories:
  - Numeric types: `Duration`, `UtcTime`, `IntegerId`, `Counter`, `Index`, etc.
  - String types: `NumericRange`, `UriString`, `NormalizedString`, `DecimalString`, etc.
  - ByteString types: `ImageBMP`, `ImageGIF`, `ImageJPG`, `ImagePNG`, `AudioDataType`, etc.
  - Complex types: `ContinuationPoint`, `Enumeration`, `Structure`, etc.

## Services
- For each service emit:
  - `interface <ServiceName>Request { ... }`
  - `interface <ServiceName>Response { ... }`
  - `ServiceDescriptor` entries:
    ```ts
    export interface ServiceDescriptor<Req, Res> {
      name: string;
      request: TypeInfo<Req>;
      response: TypeInfo<Res>;
      binaryEncodingId?: string;
      xmlEncodingId?: string;
      jsonEncodingId?: string;
    }
    ```
  - Registry map: `services: Record<string, ServiceDescriptor<any, any>>`.

## Codecs (runtime)
- Always emit binary encode/decode per generated type, matching the `services.ts` template:
  - `static decode(reader: BufferReader): Type` – construct and decode fields in order.
  - `encode(writer: BufferWriter): void` – write fields in order.
- JSON/XML codecs are out-of-scope for now.

## File Layout
- `types/` for data types (per-namespace or per-type files). Provide stubs for built-ins (e.g., `ByteString`, `Guid`, `NodeId`, `ExpandedNodeId`, `QualifiedName`, `LocalizedText`, `StatusCode`, `ExtensionObject`, `XmlElement`, `DiagnosticInfo`, `DataValue`, `Variant`) in `src/types`, similar to the existing `ByteString` stub.
- `services/` for requests/responses and registry.
- `index.ts` barrel exports.
- Banner: `// AUTO-GENERATED – DO NOT EDIT`.

## Configuration
- `outDir`, `module` (esm/cjs), `dateStrategy`, `nodeIdType`, `int64Strategy`, `splitFiles`, `namespacePrefix`, `emitDocs`.
- Include/exclude filters for namespaces or specific services/types.
- No test generation required.

## Validation & Safety
- Validate XML schema expectations; fail fast with clear errors on unresolved types.
- Emit comments for unresolved/unknown types; fall back to `unknown`.
- Produce a JSON manifest: counts, namespaces, unresolved references.

## Testing
- Not required for now.

## CLI/API Shape
- CLI: `npm run generate:services` should execute the generator with defaults; allow `--input schema/Opc.Ua.NodeSet2.Services.xml --outDir ./generated` overrides via args.
- API: `generate({ input, outDir, ...config })`.
