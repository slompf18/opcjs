/**
 * @opcua/types - OPC UA Builtin Types for TypeScript
 * 
 * This package provides TypeScript implementations of OPC UA builtin types
 * as defined in OPC UA Part 6, Section 5.1, Table 1.
 * 
 * @packageDocumentation
 */

// Catalog exports
export {
  BuiltinType,
  BuiltinTypesCatalog,
  EncodingInfo,
  getByNodeId,
  getByName,
  getPrimitives,
  getComplexTypes,
  getAllTypes,
  validateCatalog,
  catalog,
} from './catalog.js';

// Primitive type exports
export {
  BuiltinTypeId,
  BuiltinTypeIdValue,
  PrimitiveTypeMap,
  getPrimitiveTypeName,
  isPrimitive,
  OpcUaTypeName,
} from './primitives.js';

// NodeId exports
export {
  NodeId,
  NodeIdType,
} from './nodeid.js';

// ExpandedNodeId export
export {
  ExpandedNodeId,
} from './expanded-nodeid.js';

// LocalizedText export
export {
  LocalizedText,
} from './localized-text.js';

// QualifiedName export
export {
  QualifiedName,
} from './qualified-name.js';

// ByteString exports
export {
  ByteString,
} from './bytestring.js';

// XmlElement exports
export {
  XmlElement,
} from './xml-element.js';

// ExtensionObject exports
export {
  ExtensionObject,
  ExtensionObjectEncoding,
} from './extension-object.js';

// DataValue exports
export {
  DataValue,
} from './data-value.js';

// Variant exports
export {
  Variant,
  VariantType,
  VariantValue,
  VariantArrayValue,
} from './variant.js';

// DiagnosticInfo exports
export {
  DiagnosticInfo,
} from './diagnostic-info.js';

// StatusCode exports
export {
  StatusCode,
  StatusCodeSeverity,
} from './status-code.js';
