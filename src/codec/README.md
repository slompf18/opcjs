# OPC UA Codec Implementation

This directory contains the OPC UA codec implementation for encoding and decoding OPC UA types according to OPC 10000-6 Part 6 specification.

## Implementation Progress

**Status**: ~85% Complete  
**Tests**: 501/501 passing ✅  
**Phases Complete**: 7/11 (Setup, Foundation, Primitives, XML, JSON, Complex Types, Array Encoding, **Extensibility**) ✅

**What Works Now**:
- **All 16 primitive types with Binary encoding** ✅
- **All 16 primitive types with XML encoding** ✅ (70 comprehensive tests!)
- **All 16 primitive types with JSON encoding** ✅ (71 comprehensive tests!)
- **All 9 complex builtin types with Binary encoding** ✅ **PHASE 6 COMPLETE**
- **Array encoding tests for Binary, XML, and JSON** ✅ **Phase 7 TESTS COMPLETE**:
  - Binary arrays with Int32 length prefix (22 tests)
  - XML arrays with repeated elements pattern (15 tests)
  - JSON arrays with native array syntax (27 tests)
- CodecFacade with unified registration and routing
- Comprehensive boundary value validation
- IEEE 754 floating point with special values (NaN, Infinity)
- DateTime range validation (1601-9999 UTC)
- Buffer overflow protection

**Next Steps**: Implement array encoding/decoding logic in encoders/decoders, then add XML/JSON encoding for all 9 complex types

## Architecture

The codec system uses **Strategy Pattern** for format-specific encoding (Binary, XML, JSON) and **Facade Pattern** for unified type registration and routing.

### Key Principles

- **Unified Registration**: Primitive types and generated types use identical registration API
- **No Special-Casing**: Primitives are treated the same as complex types
- **Format Strategy**: Each encoding format (Binary/XML/JSON) has its own encoder/decoder implementation
- **Encoding ID Routing**: CodecFacade routes encode/decode operations based on encoding IDs from NodeIds.csv

## Implementation Status

### ✅ Phase 1: Setup (Complete)
- Directory structure created
- Vitest testing framework configured
- Test fixtures directories created

### ✅ Phase 2: Foundation (Complete)
- Core interfaces: `IEncoder`, `IDecoder`
- Core types: `EncodingFormat`, `TypeEncoder`, `TypeDecoder`, `EncodingMetadata`
- Error handling: `CodecError` with context (FR-044)
- Binary encoder/decoder with:
  - Little-endian byte order (FR-008)
  - IEEE 754 floating point (FR-009)
  - UTF-8 string encoding (FR-010)
  - Buffer boundary validation (FR-018)
  - Length validation (FR-019: max 16,777,216 bytes)
- XML encoder/decoder with:
  - Well-formed XML output (FR-022)
  - Proper element naming (FR-023)
  - XML escaping (FR-024)
- JSON encoder/decoder with:
  - RFC 8259 compliance (FR-030)
  - Proper JSON data types (FR-031)
  - Null value handling (FR-033)
- CodecFacade with type registry
- ITelemetryContext for observability (FR-059)

### ✅ Phase 3: Primitive Types (Complete)
All 16 OPC UA primitive types implemented with Binary, XML, and JSON encoding:
- ✅ Boolean (i=1)
- ✅ SByte (i=2), Byte (i=3)
- ✅ Int16 (i=4), UInt16 (i=5)
- ✅ Int32 (i=6), UInt32 (i=7)
- ✅ Int64 (i=8), UInt64 (i=9)
- ✅ Float (i=10), Double (i=11)
- ✅ String (i=12)
- ✅ DateTime (i=13)
- ✅ Guid (i=14)
- ✅ ByteString (i=15)
- ✅ XmlElement (i=16)

**Test Coverage**: 
- 14 binary codec tests
- 23 comprehensive primitive tests
- 70 XML codec tests (all 16 types with encoding, decoding, round-trip, boundary values, special values, null handling, error cases)
- 71 JSON codec tests (all 16 types with encoding, decoding, round-trip, special values, null handling, error cases)
- 9 facade tests
- 27 NodeId tests (all 6 encoding formats)
- 18 complex type integration tests
- 26 StatusCode tests (encoding, severity classification, well-known codes)
- 21 DiagnosticInfo tests (all 7 optional fields, recursive structure)
- 36 Variant tests (all 26 builtin type IDs, arrays, multi-dimensional arrays)
- 23 ExtensionObject tests (all 3 encoding formats, edge cases)
- **22 Binary array tests** ✅ (Int32 length prefix, null/empty arrays, large arrays, validation)
- **15 XML array tests** ✅ (repeated elements, ListOf pattern, format verification)
- **27 JSON array tests** ✅ (native arrays, nested arrays, round-trip, large arrays)
- **71 Extensibility tests** ✅ (custom type registration, ApplicationDescription, multiple types, recursive encoding, builtin isolation)

**Total: 501 tests passing** ✅

### ✅ Phase 4: XML Encoder/Decoder (Complete)
Implemented standalone XmlEncoder and XmlDecoder classes with methods for all 16 primitive types:
- **Well-formed XML output** (FR-022) per XML 1.0 specification
- **Proper element naming** (FR-023) per OPC UA XML schema
- **XML escaping** (FR-024) for special characters (&, <, >, ", ')
- **Special value handling** for Float/Double (NaN, Infinity, -Infinity)
- **ISO 8601 DateTime format** with millisecond precision
- **Base64 ByteString encoding**
- **RFC 4122 Guid format validation**
- **Null value support** with empty elements
- **Comprehensive error handling** with malformed XML detection

70 XML tests covering encoding, decoding, round-trip, special values, null handling, error cases ✅

### ✅ Phase 5: JSON Encoder/Decoder (Complete)
Implemented standalone JsonEncoder and JsonDecoder classes with methods for all 16 primitive types:
- **RFC 8259 compliance** (FR-030) for JSON output
- **Proper JSON data types** (FR-031) - number, string, boolean, null
- **Int64/UInt64 as strings** to preserve precision beyond 2^53
- **Special float values as strings** (NaN, Infinity, -Infinity)
- **ISO 8601 DateTime format** in JSON strings
- **Base64 ByteString encoding** in JSON strings
- **RFC 4122 Guid format** in JSON strings
- **Null value support** (FR-033) with JSON null keyword
- **Comprehensive type validation** and error reporting (FR-035)

71 JSON tests covering encoding, decoding, round-trip, special values, null handling, error cases ✅


### ✅ Phase 6: Complex Builtin Types (Complete)
All 9 complex types with Binary encoding:

- ✅ NodeId (i=17) - 6 encoding formats (TwoByte, FourByte, Numeric, String, Guid, ByteString)
- ✅ ExpandedNodeId (i=18) - Extends NodeId with namespace URI and server index
- ✅ QualifiedName (i=20) - Namespace index + name string
- ✅ LocalizedText (i=21) - Locale + text with encoding mask
- ✅ DataValue (i=23) - Value with optional status, timestamps, and picoseconds
- ✅ StatusCode (i=19) - 32-bit status code with severity classification
- ✅ DiagnosticInfo (i=25) - Recursive diagnostic with 7 optional fields
- ✅ Variant (i=24) - Type-flexible value container with 26 builtin type IDs
- ✅ ExtensionObject (i=22) - Encoded structure container with TypeId and body

27 NodeId tests + 18 complex type tests + 26 StatusCode tests + 21 DiagnosticInfo tests + 36 Variant tests + 23 ExtensionObject tests passing ✅

### ✅ Phase 7: Array Encoding (Complete)
**Tests complete** (92 tests):
- 32 Binary array tests (including 10 using helper methods)
- 23 XML array tests (including 8 using helper methods)
- 37 JSON array tests (including 10 using helper methods)

**Implementation complete**:
- ✅ Binary array encoding with `writeArray()`/`readArray()` helper methods
- ✅ XML array encoding with `encodeArray()`/`decodeArray()` helper methods
- ✅ JSON array encoding with `encodeArray()`/`decodeArray()` helper methods
- ✅ Int32 length prefix (-1=null, 0=empty, positive=count) per FR-011 (Binary)
- ✅ ListOf container pattern with repeated elements per OPC UA spec (XML)
- ✅ Native JSON array syntax per OPC UA spec (JSON)
- ✅ Array length validation per FR-019 (max 100M elements on decode)

**Binary Array Helper Methods:**
```typescript
// Encoding
encoder.writeArray([10, 20, 30], (enc, value) => enc.writeInt32(value));

// Decoding
const result = decoder.readArray((dec) => dec.readInt32());
// Result: [10, 20, 30]

// Null arrays
encoder.writeArray(null, (enc, value: number) => enc.writeInt32(value));
// Result: writes -1 as length prefix
```

**XML Array Helper Methods:**
```typescript
// Encoding
encoder.encodeArray([10, 20, 30], 'Int32', (enc, value) => enc.encodeInt32(value));
// Result: <ListOfInt32><Int32>10</Int32><Int32>20</Int32><Int32>30</Int32></ListOfInt32>

// Decoding
const result = decoder.decodeArray('ListOfInt32', 'Int32', (dec) => dec.decodeInt32());
// Result: [10, 20, 30]

// Null arrays
encoder.encodeArray(null, 'Int32', (enc, value: number) => enc.encodeInt32(value));
// Result: <ListOfInt32/>
```

**JSON Array Helper Methods:**
```typescript
// Encoding
encoder.encodeArray([10, 20, 30], (enc, value) => enc.encodeInt32(value));
// Result: [10, 20, 30]

// Decoding
const result = decoder.decodeArray((dec) => dec.decodeInt32());
// Result: [10, 20, 30]

// Null arrays
encoder.encodeArray(null, (enc, value: number) => enc.encodeInt32(value));
// Result: null
```

Three comprehensive test suites covering array encoding patterns:

**Binary Arrays (32 tests)**:
- Int32 length prefix encoding (-1=null, 0=empty, positive=count) per FR-011
- All primitive types (Int32, String, Boolean, Double, Byte)
- Null and empty array handling
- Large arrays (1000, 10k elements) with performance validation
- Array length validation per FR-019 (max 16,777,216 elements)
- Byte layout verification for length prefix
- Round-trip tests for all array types
- Helper methods: 10 tests using `writeArray()`/`readArray()`

**XML Arrays (23 tests)**:
- Repeated elements pattern per OPC UA spec
- ListOf container pattern (e.g., `<ListOfInt32><Int32>10</Int32>...</ListOfInt32>`)
- Null array with xsi:nil attribute (self-closing element)
- Empty array with empty container
- XML format verification
- Special character escaping in arrays
- Helper methods: 8 tests using `encodeArray()`/`decodeArray()`
- Single-element and large array handling (100 elements)

**JSON Arrays (37 tests)**:
- Native JSON array syntax `[element1, element2, ...]`
- Null array as `null` keyword
- Empty array as `[]`
- Nested arrays and mixed types
- Large arrays (1000, 10k elements) with performance validation
- Unicode and special character handling
- Round-trip validation
- Helper methods: 10 tests using `encodeArray()`/`decodeArray()`
- All primitive types (Int32, String, Boolean, Double, Int64)
- Error handling for non-array inputs

**Independent Test Verification**: Array `[10, 20, 30]` encodes correctly in all formats:
- Binary: length prefix 3 + three Int32s ✅
- XML: three `<Int32>` elements ✅
- JSON: `[10,20,30]` ✅

### ✅ Phase 7: Extensible Codec Registration (Complete)
**Tests complete** (71 tests) ✅:
- 16 tests: Custom type registration via CodecFacade
- 14 tests: ApplicationDescription encoding/decoding
- 10 tests: Multiple custom types coexistence
- 15 tests: Recursive encoding (custom types containing builtins)
- 16 tests: Builtin types still work after custom registration

**Unified Registration API**:
Custom types register with the facade using the same API as builtin types. No special-casing required.

```typescript
// Register custom type with facade for all three formats
facade.registerType<ApplicationDescription>(
  'ApplicationDescription',
  'i=298',  // Binary encoding ID
  EncodingFormat.Binary,
  encodeBinary,
  decodeBinary
);

facade.registerType<ApplicationDescription>(
  'ApplicationDescription',
  'i=299',  // XML encoding ID
  EncodingFormat.Xml,
  encodeXml,
  decodeXml
);

facade.registerType<ApplicationDescription>(
  'ApplicationDescription',
  'i=15634',  // JSON encoding ID
  EncodingFormat.Json,
  encodeJson,
  decodeJson
);

// Encode/decode using encoding IDs (same API as primitives)
const binary = facade.encode(app, 'i=298');  // Buffer
const xml = facade.encode(app, 'i=299');     // string
const json = facade.encode(app, 'i=15634');  // string

const decoded = facade.decode<ApplicationDescription>(binary, 'i=298');
```

**Custom Type Example**: ApplicationDescription with 6 fields:
- `applicationUri: string`
- `productUri: string`
- `applicationName: string`
- `applicationType: Int32` (enum)
- `gatewayServerUri: string`
- `discoveryUrls: string[]` (array)

**Encoder Implementation Pattern**:
```typescript
function encodeBinary(encoder: BinaryEncoder, value: ApplicationDescription): void {
  encoder.writeString(value.applicationUri);
  encoder.writeString(value.productUri);
  encoder.writeString(value.applicationName);
  encoder.writeInt32(value.applicationType);
  encoder.writeString(value.gatewayServerUri);
  encoder.writeArray(value.discoveryUrls, (enc, url) => enc.writeString(url));
}
```

**Decoder Implementation Pattern**:
```typescript
function decodeBinary(decoder: BinaryDecoder): ApplicationDescription {
  return {
    applicationUri: decoder.readString(),
    productUri: decoder.readString(),
    applicationName: decoder.readString(),
    applicationType: decoder.readInt32(),
    gatewayServerUri: decoder.readString(),
    discoveryUrls: decoder.readArray((dec) => dec.readString()),
  };
}
```

**Key Benefits**:
- ✅ Identical API for builtin and custom types
- ✅ No interference between custom and builtin type registrations
- ✅ Multiple custom types can coexist
- ✅ Custom types can contain builtin types (recursive encoding)
- ✅ All three formats supported (Binary, XML, JSON)
- ✅ Type-safe registration with TypeScript generics

See [tests/fixtures/types/application-description.ts](../../../tests/fixtures/types/application-description.ts) for complete implementation example.

### 🚧 Phase 8: Array Encoding Implementation (Next)
Implement array encoding/decoding methods in encoders/decoders:
- Binary encoder: writeArray() methods with length prefix
- Binary decoder: readArray() methods with validation
- XML encoder/decoder: repeated element handling
- JSON encoder/decoder: native array support (already working)

## Usage Example

```typescript
import { CodecFacade } from './codec/index.js';
import { registerInt32, registerString, registerBoolean } from './codec/index.js';

// Create facade and register types
const facade = new CodecFacade();
registerInt32(facade);
registerString(facade);
registerBoolean(facade);

// Encode via facade (using encoding ID)
const buffer = facade.encode('i=6', 42);  // i=6 is Int32's encoding ID

// Decode via facade
const value = facade.decode<number>('i=6', buffer);
console.log(value);  // 42

// Encode string
const strBuffer = facade.encode('i=12', 'Hello, OPC UA!');
const str = facade.decode<string>('i=12', strBuffer);
```

## Testing

Run tests with:
```bash
npm test               # Watch mode
npm test -- --run      # Run once
npm test -- --coverage # With coverage
```

Current test status: **501/501 passing** ✅
- 14 tests: Binary encoder/decoder primitives
- 9 tests: CodecFacade registration and routing
- 23 tests: Comprehensive primitive type coverage with boundary values
- 27 tests: NodeId encoding (all 6 formats)
- 18 tests: Complex types (ExpandedNodeId, QualifiedName, LocalizedText, DataValue)
- 70 tests: XML encoder/decoder (all 16 primitive types with comprehensive coverage)
- 71 tests: JSON encoder/decoder (all 16 primitive types)
- 92 tests: Array encoding (Binary, XML, JSON with helper methods)
- 71 tests: Extensible codec registration (custom types, ApplicationDescription)
- 106 tests: Additional complex types (StatusCode, DiagnosticInfo, Variant, ExtensionObject)

## OPC UA Specification Compliance

### Binary Encoding (OPC 10000-6 Section 5.2)
- ✅ Little-endian byte order (FR-008)
- ✅ IEEE 754 floating point (FR-009)
- ✅ Length-prefixed UTF-8 strings (FR-010)
- ✅ Buffer boundary validation (FR-018)
- ✅ Array length validation (FR-019)

### Security Requirements
- ✅ No buffer overflows
- ✅ Length validation before allocation (max 16,777,216)
- ✅ Malformed input rejection with clear errors (FR-044)

### Observability (FR-059)
- ✅ Structured logging via ITelemetryContext
- ✅ Operation type, type name, format, duration tracking

## Next Steps

1. Complete remaining primitive types (Byte, Int16, Float, Double, DateTime, Guid, etc.)
2. Implement XML and JSON encoders/decoders
3. Implement complex builtin types (NodeId, DataValue, Variant, etc.)
4. Add array encoding support
5. Implement NodeIds.csv parser and code generation
6. Add comprehensive test suites for all types
7. Performance benchmarks (target: <100ms for 10k elements)
8. Cross-format round-trip validation
9. API documentation (JSDoc)

## References

- [spec.md](../../specs/004-codecs/spec.md) - Feature specification
- [tasks.md](../../specs/004-codecs/tasks.md) - Implementation tasks  
- [plan.md](../../specs/004-codecs/plan.md) - Implementation plan
- OPC 10000-6 Part 6 - Data Encoding specification
