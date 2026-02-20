/**
 * @fileoverview OPC UA Codec public API exports
 * @module codec
 */

// Core types and interfaces
export { EncodingFormat, TypeEncoder, TypeDecoder, EncodingMetadata } from './types.js';
export { CodecError } from './errors.js';
export { IEncoder } from './interfaces/encoder.js';
export { IDecoder } from './interfaces/decoder.js';

// Codec implementations
export { BinaryEncoder } from './binary/encoder.js';
export { BinaryDecoder } from './binary/decoder.js';
export { XmlEncoder } from './xml/encoder.js';
export { XmlDecoder } from './xml/decoder.js';
export { JsonEncoder } from './json/encoder.js';
export { JsonDecoder } from './json/decoder.js';

// Facade
export { CodecFacade } from './facade.js';

// Telemetry
export {
  ITelemetryContext,
  ILogger,
  DefaultTelemetryContext,
  NoOpTelemetryContext,
} from './telemetry.js';

// Primitive type registration functions
export { registerBoolean } from './primitives/boolean.js';
export { registerByte, registerSByte } from './primitives/byte.js';
export { registerInt16, registerUInt16 } from './primitives/int16.js';
export { registerInt32 } from './primitives/int32.js';
export { registerUInt32 } from './primitives/uint32.js';
export { registerInt64, registerUInt64 } from './primitives/int64.js';
export { registerFloat, registerDouble } from './primitives/float.js';
export { registerString } from './primitives/string.js';
export { registerDateTime } from './primitives/datetime.js';
export { registerGuid } from './primitives/guid.js';
export { registerByteString } from './primitives/bytestring.js';
export { registerXmlElement } from './primitives/xmlelement.js';

// Complex types - Re-export from @opcua/types package (public API)
export {
  NodeId,
  NodeIdType,
  ExpandedNodeId,
  QualifiedName,
  LocalizedText,
  DataValue,
  StatusCode,
  StatusCodeSeverity,
  DiagnosticInfo,
  Variant,
  VariantType,
  ExtensionObject,
  ExtensionObjectEncoding,
} from '../types/src/index.js';

// Complex type registration and encoding functions
export {
  registerNodeId,
  numericNodeId,
  stringNodeId,
  guidNodeId,
  byteStringNodeId,
} from './complex/nodeid.js';
export {
  registerExpandedNodeId,
  expandedNodeId,
} from './complex/expanded-nodeid.js';
export {
  registerQualifiedName,
  qualifiedName,
} from './complex/qualified-name.js';
export {
  registerLocalizedText,
  localizedText,
} from './complex/localized-text.js';
export {
  type DataValueMask,
  registerDataValue,
  dataValue,
} from './complex/datavalue.js';
export {
  StatusCodes,
  registerStatusCode,
  statusCode,
  getSeverity,
  isGood,
  isUncertain,
  isBad,
  getCode,
  getSubCode,
} from './complex/statuscode.js';
export {
  type DiagnosticInfoMask,
  registerDiagnosticInfo,
  diagnosticInfo,
  simpleDiagnosticInfo,
  diagnosticInfoWithStatus,
  nestedDiagnosticInfo,
} from './complex/diagnosticinfo.js';
export {
  type VariantEncodingMask,
  type VariantValue,
  registerVariant,
  variant,
  nullVariant,
  arrayVariant,
  isArray as isVariantArray,
  isNull as isVariantNull,
  getTypeName as getVariantTypeName,
} from './complex/variant.js';
export {
  registerExtensionObject,
  extensionObjectNull,
  extensionObjectByteString,
  extensionObjectXml,
  getByteStringBody,
  getXmlBody,
  hasNoBody,
} from './complex/extensionobject.js';
