# OPC UA Services TypeScript Generator Specification

## Goal
Convert `schema/Opc.Ua.NodeSet2.Services.xml` into TypeScript types (interfaces/enums) and optional runtime codecs for OPC UA services.

## Inputs & Outputs
- **Input**: OPC UA NodeSet services XML (operations, requests/responses, data types, enums, option sets, encodings).
- **Output**: Generated TS declarations (+ optional encode/decode helpers) grouped by types and services; barrel exports; manifest of emitted items.

## Parsing & Model
- Parse XML once; build an in-memory model:
  - Services with Request/Response pairs and encoding IDs (binary/xml/json when present).
  - DataTypes: built-ins, structures, enums, option sets; fields include name, type, isArray/valueRank, optionality, defaults, docs, namespace.
  - Resolve aliases/typedefs; normalize namespaces → import paths or local symbols.

## Type Mapping (core)
- Built-ins → TS:
  - Boolean→`boolean`; SByte/Byte/Int16/UInt16/Int32/UInt32→`number`; Int64/UInt64→`bigint` (configurable to `number` with comment); Float/Double→`number`; String→`string`.
  - DateTime→`Date` (configurable: `string | number`);
  - Guid→`string` (UUID); ByteString→`Uint8Array`.
  - NodeId/ExpandedNodeId→`string | number` or custom `NodeId` (configurable).
  - LocalizedText→`{ locale?: string; text?: string }`; QualifiedName→`{ namespaceIndex: number; name: string }`.
  - StatusCode→`number | branded type`; ExtensionObject→`unknown | branded type`.
- Arrays: valueRank/isArray → `T[]`.
- Optional fields: `?` (optionally `| undefined`).

## Enums & OptionSets
- Emit `enum`/`const enum` (configurable) with numeric values.
- For option sets, emit bitflag helpers (e.g., `hasFlag(value, Flag.X)`).

## Structures
- Emit `interface` per structure with JSDoc from XML comments.
- Preserve original type names and namespaces (apply configurable prefix if needed).

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

## Codecs (optional runtime)
- When enabled, generate binary (and optionally JSON/XML) encode/decode using `TypeInfo` with field order, type IDs, array flags.
- Emit `encodeFoo(writer, value)` / `decodeFoo(reader)` alongside types.
- Allow disabling to emit types-only.

## File Layout
- `types/` for data types (per-namespace or per-type files).
- `services/` for requests/responses and registry.
- `index.ts` barrel exports.
- Banner: `// AUTO-GENERATED – DO NOT EDIT`.

## Configuration
- `outDir`, `module` (esm/cjs), `emitCodecs` boolean, `dateStrategy`, `nodeIdType`, `int64Strategy`, `splitFiles`, `namespacePrefix`, `emitDocs`.
- Include/exclude filters for namespaces or specific services/types.

## Validation & Safety
- Validate XML schema expectations; fail fast with clear errors on unresolved types.
- Emit comments for unresolved/unknown types; fall back to `unknown`.
- Produce a JSON manifest: counts, namespaces, unresolved references.

## Testing
- Snapshot tests on generated TS for a small fixture subset.
- Type-check generated output with `tsc --noEmit`.
- If codecs enabled: round-trip tests on sample values.

## CLI/API Shape
- CLI: `generate-nodeset --input schema/Opc.Ua.NodeSet2.Services.xml --outDir ./generated --emitCodecs`
- API: `generate({ input, outDir, emitCodecs, ...config })`.
