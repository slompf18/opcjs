/**
 * @opcua/base - OPC UA base package
 *
 * Exports builtin types and codec APIs.
 */

export type { IOpcType } from './types/iOpcType.js';
export type { IReader} from './codecs/interfaces/iReader.js';
export type { IWriter } from './codecs/interfaces/iWriter.js';
export {Encoder} from './codecs/encoder.js';
export {Decoder} from './codecs/decoder.js';
export { BinaryReader } from './codecs/binary/binaryReader.js';
export { DataValue } from './types/dataValue.js';
export { DiagnosticInfo } from './types/diagnosticInfo.js';
export { ExpandedNodeId } from './types/expandedNodeId.js';
export { ExtensionObject } from './types/extensionObject.js';
export { LocalizedText } from './types/localizedText.js';
export { NodeIdType, NodeId } from './types/nodeId.js';
export { QualifiedName } from './types/qualifiedName.js';
export { VariantType, Variant } from './types/variant.js';
export type { VariantValue, VariantArrayValue } from './types/variant.js';
export { XmlElement } from './types/xmlElement.js';
export { BuiltinTypeId, getPrimitiveTypeName, isPrimitive } from './types/primitives.js';
export type { BuiltinTypeIdValue, PrimitiveTypeMap, UaString, UaByteString } from './types/primitives.js';
export { SecureChannel } from './secureChannel/secureChannel.js';
export type { ISecureChannel } from './secureChannel/iSecureChannel.js';
export { ChannelFactory } from './transports/channelFactory.js';
export { Configuration } from './configuration/configuration.js';
export { registerEncoders } from './schema/encoderRegistrations.js';
export { registerTypeDecoders } from './schema/decoderRegistrations.js';
export { registerBinaryDecoders } from './schema/decoderRegistrations.js';
export { registerXmlDecoders } from './schema/decoderRegistrations.js';
export { registerJsonDecoders } from './schema/decoderRegistrations.js';
export * from './schema/types.js';
export * from './schema/enums.js';
