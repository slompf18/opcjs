# @opcua/types

TypeScript implementation of OPC UA builtin types as defined in **OPC UA Part 6, Section 5.1, Table 1**.

## Overview

This package provides TypeScript type definitions and implementations for all 25 OPC UA builtin types, enabling type-safe code generation and runtime type resolution.

## Features

- ✅ **Complete OPC UA Type Coverage**: All 25 builtin types from OPC UA Part 6
- ✅ **Type-Safe**: Full TypeScript strict mode compliance
- ✅ **Runtime Catalog**: JSON-based catalog for dynamic type resolution
- ✅ **Primitive Mappings**: Direct mapping to native TypeScript types
- ✅ **Complex Types**: NodeId, LocalizedText, QualifiedName, and more
- ✅ **Cross-Platform**: Works in Node.js and browser environments
- ✅ **Zero Dependencies**: No external runtime dependencies

## Installation

```bash
npm install @opcua/types
```

## Usage

### Importing Types

```typescript
import {
  NodeId,
  LocalizedText,
  QualifiedName,
  ByteString,
  XmlElement,
  BuiltinTypeId,
  getByNodeId,
} from '@opcua/types';
```

### Working with NodeId

```typescript
// Create a numeric NodeId
const nodeId = new NodeId(2, 123);
console.log(nodeId.toString()); // "ns=2;i=123"

// Create a string NodeId
const stringNodeId = new NodeId(3, "Temperature");
console.log(stringNodeId.toString()); // "ns=3;s=Temperature"

// Parse a NodeId from string
const parsed = NodeId.parse("ns=2;i=123");

// Check equality
if (nodeId.equals(parsed)) {
  console.log("NodeIds are equal");
}
```

### Working with LocalizedText

```typescript
// Create localized text
const text = new LocalizedText("en-US", "Temperature Sensor");
console.log(text.toString()); // "[en-US] Temperature Sensor"

// Create text without locale
const defaultText = LocalizedText.fromText("Default Text");
console.log(defaultText.toString()); // "Default Text"
```

### Working with QualifiedName

```typescript
// Create a qualified name
const qname = new QualifiedName(2, "Temperature");
console.log(qname.toString()); // "2:Temperature"

// Parse from string
const parsed = QualifiedName.parse("2:Temperature");
```

### Working with ByteString

```typescript
import { ByteString } from '@opcua/types';

// Create a ByteString
const bytes = new ByteString(new Uint8Array([0x01, 0x02, 0x03, 0x04]));

// Convert to/from base64
const base64 = bytes.toBase64();
console.log(base64); // "AQIDBA=="

const decoded = ByteString.fromBase64(base64);

// Convert to/from hex
const hex = bytes.toHex();
console.log(hex); // "01020304"

const fromHex = ByteString.fromHex("01020304");

// Check equality
console.log(bytes.equals(fromHex)); // true
```

### Working with XmlElement

```typescript
import { XmlElement } from '@opcua/types';

// Create an XML element
const xml = XmlElement.create("Temperature", "25.5", {
  unit: "C"
});
console.log(xml.toString()); // "<Temperature unit=\"C\">25.5</Temperature>"

// Validate XML
if (xml.isValid()) {
  console.log("Valid XML");
}

// Escape/unescape
const escaped = XmlElement.escape("Hello & <World>");
const unescaped = XmlElement.unescape(escaped);
```

### Working with ExtensionObject

```typescript
import { ExtensionObject, ExtensionObjectEncoding, NodeId, ByteString } from '@opcua/types';

// Create an ExtensionObject with binary encoding
const typeId = new NodeId(2, 123); // Custom structure type
const body = new ByteString(new Uint8Array([0x01, 0x02, 0x03, 0x04]));
const extObj = ExtensionObject.createBinary(typeId, body);

// Check encoding type
if (extObj.isBinaryEncoded()) {
  const binaryBody = extObj.getBinaryBody();
  console.log('Binary body length:', binaryBody?.length);
}
```

### Working with StatusCode

```typescript
import { StatusCode } from '@opcua/types';

// Create StatusCode instances using predefined constants
const good = new StatusCode(StatusCode.Good);
const badTimeout = new StatusCode(StatusCode.BadTimeout);
const uncertain = new StatusCode(StatusCode.UncertainLastUsableValue);

// Convert to string with name and hex value
console.log(good.toString()); // "Good (0x00000000)"
console.log(badTimeout.toString()); // "BadTimeout (0x800A0000)"

// Check severity
console.log(good.isGood()); // true
console.log(badTimeout.isBad()); // true
console.log(uncertain.isUncertain()); // true

// Common predefined status codes
StatusCode.Good                        // 0x00000000
StatusCode.BadTimeout                  // 0x800A0000
StatusCode.BadCertificateInvalid       // 0x80120000
StatusCode.UncertainLastUsableValue    // 0x40880000
```

### Working with DataValue

```typescript
import { DataValue, Variant, VariantType, StatusCode } from '@opcua/types';

// Create a DataValue with all fields
const value = new Variant(VariantType.Double, 25.5);
const statusCode = new StatusCode(StatusCode.Good);
const dataValue = new DataValue(
  value,
  statusCode,
  new Date(), // Source timestamp
  new Date()  // Server timestamp
);

// Check value quality
console.log('Severity:', dataValue.getSeverity()); // "Good"
if (dataValue.isGood()) {
  console.log('Value:', dataValue.value?.value);
}
console.log(dataValue.toString());
```

### Working with Variant

```typescript
import { Variant, VariantType } from '@opcua/types';

// Create a variant with a scalar value
const intVariant = new Variant(VariantType.Int32, 42);
console.log(intVariant.toString()); // "Variant(Int32: 42)"

// Create a variant with an array
const arrayVariant = new Variant(
  VariantType.Double, 
  [1.1, 2.2, 3.3], 
  [3] // Array dimensions
);

console.log(arrayVariant.isArray()); // true
console.log(arrayVariant.getArrayLength()); // 3
```

### Working with DiagnosticInfo

```typescript
import { DiagnosticInfo, StatusCode } from '@opcua/types';

// Create diagnostic info with additional text
const diagInfo = DiagnosticInfo.fromText('Connection timeout occurred');

// Create nested diagnostic info with StatusCode
const innerDiag = DiagnosticInfo.fromText('Socket closed unexpectedly');
const badError = new StatusCode(StatusCode.BadUnexpectedError);
const outerDiag = new DiagnosticInfo({
  additionalInfo: 'Network error',
  innerStatusCode: badError,
  innerDiagnosticInfo: innerDiag
});

console.log('Diagnostic depth:', outerDiag.getDepth()); // 1
console.log(outerDiag.toString());
```

### Using the Catalog

```typescript
import { getByNodeId, getByName, getAllTypes } from '@opcua/types';

// Get type by numeric NodeId
const boolType = getByNodeId(1);
console.log(boolType?.opcUaName);        // "Boolean"
console.log(boolType?.typescriptType);   // "boolean"

// Get type by OPC UA name
const int32Type = getByName("Int32");
console.log(int32Type?.numericId);       // 6
console.log(int32Type?.typescriptType);  // "number"

// Get all types
const allTypes = getAllTypes();
console.log(allTypes.length); // 25
```

### Primitive Type Mappings

```typescript
import { BuiltinTypeId, getPrimitiveTypeName, isPrimitive } from '@opcua/types';

// Check if a type is primitive
console.log(isPrimitive(BuiltinTypeId.Boolean));  // true
console.log(isPrimitive(BuiltinTypeId.NodeId));   // false

// Get TypeScript type name
console.log(getPrimitiveTypeName(BuiltinTypeId.Boolean));  // "boolean"
console.log(getPrimitiveTypeName(BuiltinTypeId.Int32));    // "number"
console.log(getPrimitiveTypeName(BuiltinTypeId.String));   // "string"
```

## OPC UA Builtin Types

This package implements all 25 OPC UA builtin types:

### Primitive Types (1-12, 14)
- **Boolean** (i=1) → `boolean`
- **SByte** (i=2) → `number`
- **Byte** (i=3) → `number`
- **Int16** (i=4) → `number`
- **UInt16** (i=5) → `number`
- **Int32** (i=6) → `number`
- **UInt32** (i=7) → `number`
- **Int64** (i=8) → `bigint`
- **UInt64** (i=9) → `bigint`
- **Float** (i=10) → `number`
- **Double** (i=11) → `number`
- **String** (i=12) → `string`
- **DateTime** (i=13) → `Date`
- **Guid** (i=14) → `string`

### Complex Types (15-21)
- **ByteString** (i=15) → `ByteString` class
- **XmlElement** (i=16) → `XmlElement` class
- **NodeId** (i=17) → `NodeId` class
- **ExpandedNodeId** (i=18) → `ExpandedNodeId` class
- **StatusCode** (i=19) → `StatusCode` class (with all OPC UA predefined constants)
- **QualifiedName** (i=20) → `QualifiedName` class
- **LocalizedText** (i=21) → `LocalizedText` class

### Variant Types (22-25)
- **ExtensionObject** (i=22) → `ExtensionObject` class
- **DataValue** (i=23) → `DataValue` class
- **Variant** (i=24) → `Variant` class
- **DiagnosticInfo** (i=25) → `DiagnosticInfo` class

## API Reference

### Classes

#### `NodeId`
Represents a node identifier in an OPC UA address space.

**Constructor**: `new NodeId(namespace?: number, identifier?: number | string | Uint8Array)`

**Methods**:
- `toString(): string` - Convert to string format (e.g., "ns=2;i=123")
- `equals(other: NodeId): boolean` - Check equality
- `isNull(): boolean` - Check if this is a null NodeId
- `static parse(str: string): NodeId` - Parse from string

#### `ExpandedNodeId`
Extends NodeId with server identification.

**Constructor**: `new ExpandedNodeId(namespace?: number, identifier?: number | string | Uint8Array, namespaceUri?: string, serverIndex?: number)`

#### `LocalizedText`
Represents localized text with an optional locale.

**Constructor**: `new LocalizedText(locale: string | undefined, text: string)`

**Methods**:
- `static fromText(text: string): LocalizedText` - Create without locale
- `toString(): string` - Convert to string
- `equals(other: LocalizedText): boolean` - Check equality
- `isEmpty(): boolean` - Check if text is empty

#### `QualifiedName`
Represents a namespace-qualified name.

**Constructor**: `new QualifiedName(namespaceIndex?: number, name?: string)`

**Methods**:
- `toString(): string` - Convert to string (format: "ns:name")
- `equals(other: QualifiedName): boolean` - Check equality
- `static parse(str: string): QualifiedName` - Parse from string
- `isNull(): boolean` - Check if null

#### `ExtensionObject`
Represents a container for complex structures.

**Constructor**: `new ExtensionObject(typeId: NodeId, encoding?: ExtensionObjectEncoding, body?: ByteString | XmlElement | null)`

**Static Methods**:
- `static createEmpty(typeId: NodeId): ExtensionObject` - Create with no body
- `static createBinary(typeId: NodeId, body: ByteString): ExtensionObject` - Create with binary encoding
- `static createXml(typeId: NodeId, body: XmlElement): ExtensionObject` - Create with XML encoding

**Methods**:
- `isBinaryEncoded(): boolean` - Check if binary encoded
- `isXmlEncoded(): boolean` - Check if XML encoded
- `isEmpty(): boolean` - Check if no body
- `getBinaryBody(): ByteString | null` - Get binary body
- `getXmlBody(): XmlElement | null` - Get XML body
- `toString(): string` - Convert to string
- `equals(other: ExtensionObject): boolean` - Check equality

#### `DataValue`
Represents a value with quality and timestamp metadata.

**Constructor**: `new DataValue(value?, statusCode?, sourceTimestamp?, serverTimestamp?, sourcePicoseconds?, serverPicoseconds?)`

**Static Methods**:
- `static createEmpty(): DataValue` - Create with all fields null
- `static fromValue(value: Variant): DataValue` - Create with just a value

**Methods**:
- `isGood(): boolean` - Check if status is good
- `isBad(): boolean` - Check if status is bad
- `isUncertain(): boolean` - Check if status is uncertain
- `getSeverity(): 'Good' | 'Uncertain' | 'Bad' | 'Unknown'` - Get status severity
- `hasValue(): boolean` - Check if has value
- `hasSourceTimestamp(): boolean` - Check if has source timestamp
- `hasServerTimestamp(): boolean` - Check if has server timestamp
- `toString(): string` - Convert to string
- `equals(other: DataValue): boolean` - Check equality

#### `Variant`
Represents a union type that can hold any OPC UA builtin type.

**Constructor**: `new Variant(variantType?: VariantType, value?, arrayDimensions?)`

**Static Methods**:
- `static createNull(): Variant` - Create a null variant

**Methods**:
- `isNull(): boolean` - Check if null
- `isArray(): boolean` - Check if contains array
- `isScalar(): boolean` - Check if scalar value
- `getArrayLength(): number` - Get array length
- `toString(): string` - Convert to string
- `equals(other: Variant): boolean` - Check equality

**Enums**:
- `VariantType` - Enumeration of variant types (matches BuiltinTypeId)

#### `DiagnosticInfo`
Represents detailed diagnostic information.

**Constructor**: `new DiagnosticInfo(options?)`

**Static Methods**:
- `static createEmpty(): DiagnosticInfo` - Create empty diagnostic info
- `static fromText(text: string): DiagnosticInfo` - Create with just additional info

**Methods**:
- `isEmpty(): boolean` - Check if empty
- `hasInnerDiagnostics(): boolean` - Check if has nested diagnostics
- `getDepth(): number` - Get nesting depth
- `flatten(): DiagnosticInfo[]` - Flatten nested structure to array
- `toString(includeInner?: boolean): string` - Convert to string
- `equals(other: DiagnosticInfo): boolean` - Check equality

#### `ByteString`
Represents a sequence of bytes.

**Constructor**: `new ByteString(data?: Uint8Array)`

**Static Methods**:
- `static fromBase64(base64: string): ByteString` - Create from base64 string
- `static fromHex(hex: string): ByteString` - Create from hex string
- `static empty(): ByteString` - Create empty ByteString

**Methods**:
- `toUint8Array(): Uint8Array` - Get underlying Uint8Array
- `toBase64(): string` - Convert to base64
- `toHex(): string` - Convert to hex
- `at(index: number): number | undefined` - Get byte at index
- `equals(other: ByteString): boolean` - Check equality
- `toString(): string` - Convert to string representation
- `get length: number` - Get byte length

#### `XmlElement`
Represents an XML fragment.

**Constructor**: `new XmlElement(content?: string)`

**Static Methods**:
- `static create(tagName: string, content?: string, attributes?: Record<string, string>): XmlElement` - Create XML element
- `static escape(text: string): string` - Escape special characters
- `static unescape(xml: string): string` - Unescape entities
- `static empty(): XmlElement` - Create empty XmlElement

**Methods**:
- `isValid(): boolean` - Validate XML structure
- `toString(): string` - Get XML string
- `equals(other: XmlElement): boolean` - Check equality
- `get length: number` - Get string length

### Catalog Functions

- `getByNodeId(numericId: number): BuiltinType | undefined`
- `getByName(name: string): BuiltinType | undefined`
- `getPrimitives(): BuiltinType[]`
- `getComplexTypes(): BuiltinType[]`
- `getAllTypes(): BuiltinType[]`
- `validateCatalog(): boolean`

### Primitive Functions

- `getPrimitiveTypeName(typeId: number): string | undefined`
- `isPrimitive(typeId: number): boolean`

## Specification Compliance

This package implements:
- **OPC UA Part 6** (OPC 10000-6): Data Access - Mappings
  - Section 5.1: Builtin Types
  - Table 1: Built-in Data Types

## TypeScript Configuration

This package is built with strict TypeScript settings:
- `strict: true`
- `target: ES2022`
- `module: Node16`
- All types explicitly defined
- Zero linting errors

## Contributing

When contributing, ensure:
1. All code passes `npx tsc --noEmit` with zero errors
2. Follow the existing code style
3. Add JSDoc comments to all public APIs
4. Include examples in documentation

## License

MIT

## Related Packages

- `@opcua/generator` - Code generator using these types
- `@opcua/client` - OPC UA client implementation

## Resources

- [OPC UA Specification](https://reference.opcfoundation.org/)
- [OPC Foundation](https://opcfoundation.org/)
