/**
 * OPC UA Variant type implementation (i=24).
 * 
 * A Variant is a union type that can hold any OPC UA builtin type with runtime
 * type information. The type is determined at runtime through an encoding byte.
 * 
 * Binary Encoding (OPC 10000-6 Section 5.2.2.16, Table 25):
 * - EncodingMask byte (bits 0-5: Type ID, bit 6: ArrayDimensions, bit 7: Array)
 * - Value (type depends on Type ID)
 * - ArrayLength (Int32, only if Array bit set)
 * - Array elements (only if Array bit set)
 * - ArrayDimensions (Int32[], only if ArrayDimensions bit set)
 * 
 * Type IDs (bits 0-5 of EncodingMask):
 * - 0: Null
 * - 1: Boolean
 * - 2: SByte
 * - 3: Byte
 * - 4: Int16
 * - 5: UInt16
 * - 6: Int32
 * - 7: UInt32
 * - 8: Int64
 * - 9: UInt64
 * - 10: Float
 * - 11: Double
 * - 12: String
 * - 13: DateTime
 * - 14: Guid
 * - 15: ByteString
 * - 16: XmlElement
 * - 17: NodeId
 * - 18: ExpandedNodeId
 * - 19: StatusCode
 * - 20: QualifiedName
 * - 21: LocalizedText
 * - 22: ExtensionObject
 * - 23: DataValue
 * - 24: Variant
 * - 25: DiagnosticInfo
 * 
 * @module codec/complex/variant
 */

import { CodecError } from '../errors.js';
import type { IEncoder } from '../interfaces/encoder.js';
import type { IDecoder } from '../interfaces/decoder.js';
import { CodecFacade } from '../facade.js';
import { EncodingFormat } from '../types.js';
import { Variant, VariantType, type VariantValue as TypesVariantValue } from '../../types/src/index.js';
import type { NodeId } from './nodeid.js';
import * as NodeIdCodec from './nodeid.js';
import type { ExpandedNodeId } from './expanded-nodeid.js';
import * as ExpandedNodeIdCodec from './expanded-nodeid.js';
import type { QualifiedName } from './qualified-name.js';
import * as QualifiedNameCodec from './qualified-name.js';
import type { LocalizedText } from './localized-text.js';
import * as LocalizedTextCodec from './localized-text.js';
import type { StatusCode } from './statuscode.js';
import * as StatusCodeCodec from './statuscode.js';
import type { DataValue } from './datavalue.js';
import * as DataValueCodec from './datavalue.js';
import type { DiagnosticInfo } from './diagnosticinfo.js';
import * as DiagnosticInfoCodec from './diagnosticinfo.js';
import type { ExtensionObject } from './extensionobject.js';
import * as ExtensionObjectCodec from './extensionobject.js';

// Re-export for backward compatibility
export { Variant, VariantType };
export type { TypesVariantValue as VariantValue };

// Internal codec type that includes StatusCode and recursive Variant
type CodecVariantValue = TypesVariantValue | StatusCode | Variant;

/**
 * NOTE: Variant class and VariantType enum are imported from types package.
 * Properties: variantType, value, arrayDimensions
 */

/**
 * Encoding mask bits for Variant.
 */
export enum VariantEncodingMask {
  /** Bits 0-5: Type ID (0-25) */
  TypeMask = 0x3F,
  /** Bit 6: ArrayDimensions present */
  ArrayDimensions = 0x40,
  /** Bit 7: Value is an array */
  Array = 0x80,
}

/**
 * Create a Variant with a scalar value.
 * 
 * @param type - The type ID of the value
 * @param value - The value to store
 * @returns A Variant
 */
export function variant(type: VariantType, value: CodecVariantValue): Variant {
  return new Variant(type, value as TypesVariantValue, null);
}

/**
 * Create a null Variant.
 * 
 * @returns A null Variant
 */
export function nullVariant(): Variant {
  return new Variant(VariantType.Null, null, null);
}

/**
 * Create a Variant with an array value.
 * 
 * @param type - The type ID of array elements
 * @param values - Array of values
 * @param dimensions - Optional array dimensions for multi-dimensional arrays
 * @returns A Variant
 */
export function arrayVariant(
  type: VariantType,
  values: CodecVariantValue[],
  dimensions: number[] | null = null
): Variant {
  return new Variant(type, values as TypesVariantValue[], dimensions);
}

/**
 * Check if a Variant holds an array.
 * 
 * @param v - The Variant to check
 * @returns True if the Variant contains an array
 */
export function isArray(v: Variant): boolean {
  return Array.isArray(v.value);
}

/**
 * Check if a Variant is null.
 * 
 * @param v - The Variant to check
 * @returns True if the Variant is null
 */
export function isNull(v: Variant): boolean {
  return v.variantType === VariantType.Null;
}

/**
 * Get the variant type name as a string.
 * 
 * @param type - The variant type ID
 * @returns The type name
 */
export function getTypeName(type: VariantType): string {
  return VariantType[type] || 'Unknown';
}

/**
 * Encode a Variant to binary format.
 * 
 * Binary encoding per OPC 10000-6 Section 5.2.2.16:
 * 1. EncodingMask byte (bits 0-5: type, bit 6: dimensions, bit 7: array)
 * 2. If not array: encode single value
 * 3. If array: encode Int32 length, then encode each element
 * 4. If dimensions present: encode Int32 count, then encode each dimension (Int32)
 * 
 * @param encoder - The binary encoder
 * @param value - The Variant to encode
 */
export function encodeBinary(encoder: IEncoder, value: Variant): void {
  // Validate type ID
  if (value.variantType < 0 || value.variantType > 25) {
    throw new CodecError(`Invalid Variant type ID: ${value.variantType}. Must be 0-25.`);
  }

  // Calculate encoding mask
  let mask = value.variantType & VariantEncodingMask.TypeMask;
  
  const isArrayValue = Array.isArray(value.value);
  if (isArrayValue) {
    mask |= VariantEncodingMask.Array;
  }
  
  if (value.arrayDimensions !== null && value.arrayDimensions.length > 0) {
    mask |= VariantEncodingMask.ArrayDimensions;
  }

  // Write encoding mask
  encoder.writeByte(mask);

  // Encode value(s)
  if (isArrayValue) {
    // Array value
    const array = value.value as CodecVariantValue[];
    encoder.writeInt32(array.length);
    
    for (const elem of array) {
      encodeVariantValue(encoder, value.variantType, elem);
    }
  } else if (value.variantType !== VariantType.Null) {
    // Scalar value (not null)
    encodeVariantValue(encoder, value.variantType, value.value as CodecVariantValue);
  }

  // Encode dimensions if present
  if (value.arrayDimensions !== null && value.arrayDimensions.length > 0) {
    encoder.writeInt32(value.arrayDimensions.length);
    for (const dim of value.arrayDimensions) {
      encoder.writeInt32(dim);
    }
  }
}

/**
 * Encode a single variant value based on its type.
 * 
 * @param encoder - The binary encoder
 * @param type - The variant type ID
 * @param value - The value to encode
 */
function encodeVariantValue(encoder: IEncoder, type: VariantType, value: CodecVariantValue): void {
  switch (type) {
    case VariantType.Null:
      // Null has no value
      break;
    case VariantType.Boolean:
      encoder.writeBoolean(value as boolean);
      break;
    case VariantType.SByte:
      encoder.writeSByte(value as number);
      break;
    case VariantType.Byte:
      encoder.writeByte(value as number);
      break;
    case VariantType.Int16:
      encoder.writeInt16(value as number);
      break;
    case VariantType.UInt16:
      encoder.writeUInt16(value as number);
      break;
    case VariantType.Int32:
      encoder.writeInt32(value as number);
      break;
    case VariantType.UInt32:
      encoder.writeUInt32(value as number);
      break;
    case VariantType.Int64:
      encoder.writeInt64(value as bigint);
      break;
    case VariantType.UInt64:
      encoder.writeUInt64(value as bigint);
      break;
    case VariantType.Float:
      encoder.writeFloat(value as number);
      break;
    case VariantType.Double:
      encoder.writeDouble(value as number);
      break;
    case VariantType.String:
      encoder.writeString(value as string);
      break;
    case VariantType.DateTime:
      encoder.writeDateTime(value as Date);
      break;
    case VariantType.Guid:
      encoder.writeGuid(value as string);
      break;
    case VariantType.ByteString:
      encoder.writeByteString(value as Uint8Array);
      break;
    case VariantType.XmlElement:
      encoder.writeXmlElement(value as string);
      break;
    case VariantType.NodeId:
      NodeIdCodec.encodeBinary(encoder, value as NodeId);
      break;
    case VariantType.ExpandedNodeId:
      ExpandedNodeIdCodec.encodeBinary(encoder, value as unknown as ExpandedNodeId);
      break;
    case VariantType.StatusCode:
      StatusCodeCodec.encodeBinary(encoder, value as StatusCode);
      break;
    case VariantType.QualifiedName:
      QualifiedNameCodec.encodeBinary(encoder, value as unknown as QualifiedName);
      break;
    case VariantType.LocalizedText:
      LocalizedTextCodec.encodeBinary(encoder, value as unknown as LocalizedText);
      break;
    case VariantType.ExtensionObject:
      ExtensionObjectCodec.encodeBinary(encoder, value as unknown as ExtensionObject);
      break;
    case VariantType.DataValue:
      DataValueCodec.encodeBinary(encoder, value as unknown as DataValue);
      break;
    case VariantType.Variant:
      encodeBinary(encoder, value as unknown as Variant);
      break;
    case VariantType.DiagnosticInfo:
      DiagnosticInfoCodec.encodeBinary(encoder, value as unknown as DiagnosticInfo);
      break;
    default:
      throw new CodecError(`Unsupported Variant type: ${type}`);
  }
}

/**
 * Decode a Variant from binary format.
 * 
 * Binary decoding per OPC 10000-6 Section 5.2.2.16:
 * 1. Read EncodingMask byte
 * 2. Extract type ID (bits 0-5), array flag (bit 7), dimensions flag (bit 6)
 * 3. If array: read length, then decode each element
 * 4. If scalar: decode single value
 * 5. If dimensions: read count, then read each dimension
 * 
 * @param decoder - The binary decoder
 * @returns The decoded Variant
 */
export function decodeBinary(decoder: IDecoder): Variant {
  // Read encoding mask
  const mask = decoder.readByte();
  
  // Extract type ID (bits 0-5)
  const type = mask & VariantEncodingMask.TypeMask;
  
  // Validate type ID
  if (type > 25) {
    throw new CodecError(`Invalid Variant type ID: ${type}. Must be 0-25.`);
  }
  
  // Check flags
  const hasArray = (mask & VariantEncodingMask.Array) !== 0;
  const hasDimensions = (mask & VariantEncodingMask.ArrayDimensions) !== 0;

  let value: CodecVariantValue | CodecVariantValue[];
  
  // Decode value(s)
  if (hasArray) {
    // Array value
    const length = decoder.readInt32();
    if (length < 0) {
      throw new CodecError(`Invalid array length: ${length}`);
    }
    
    const array: CodecVariantValue[] = [];
    for (let i = 0; i < length; i++) {
      array.push(decodeVariantValue(decoder, type));
    }
    value = array;
  } else if (type === VariantType.Null) {
    // Null value
    value = null;
  } else {
    // Scalar value
    value = decodeVariantValue(decoder, type);
  }

  // Decode dimensions if present
  let dimensions: number[] | null = null;
  if (hasDimensions) {
    const dimCount = decoder.readInt32();
    if (dimCount < 0) {
      throw new CodecError(`Invalid dimensions count: ${dimCount}`);
    }
    
    dimensions = [];
    for (let i = 0; i < dimCount; i++) {
      dimensions.push(decoder.readInt32());
    }
  }

  return new Variant(type, value as TypesVariantValue | TypesVariantValue[], dimensions);
}

/**
 * Decode a single variant value based on its type.
 * 
 * @param decoder - The binary decoder
 * @param type - The variant type ID
 * @returns The decoded value
 */
function decodeVariantValue(decoder: IDecoder, type: VariantType): CodecVariantValue {
  switch (type) {
    case VariantType.Null:
      return null;
    case VariantType.Boolean:
      return decoder.readBoolean();
    case VariantType.SByte:
      return decoder.readSByte();
    case VariantType.Byte:
      return decoder.readByte();
    case VariantType.Int16:
      return decoder.readInt16();
    case VariantType.UInt16:
      return decoder.readUInt16();
    case VariantType.Int32:
      return decoder.readInt32();
    case VariantType.UInt32:
      return decoder.readUInt32();
    case VariantType.Int64:
      return decoder.readInt64();
    case VariantType.UInt64:
      return decoder.readUInt64();
    case VariantType.Float:
      return decoder.readFloat();
    case VariantType.Double:
      return decoder.readDouble();
    case VariantType.String:
      return decoder.readString();
    case VariantType.DateTime:
      return decoder.readDateTime();
    case VariantType.Guid:
      return decoder.readGuid();
    case VariantType.ByteString:
      return decoder.readByteString();
    case VariantType.XmlElement:
      return decoder.readXmlElement();
    case VariantType.NodeId:
      return NodeIdCodec.decodeBinary(decoder);
    case VariantType.ExpandedNodeId:
      return ExpandedNodeIdCodec.decodeBinary(decoder) as unknown as CodecVariantValue;
    case VariantType.StatusCode:
      return StatusCodeCodec.decodeBinary(decoder);
    case VariantType.QualifiedName:
      return QualifiedNameCodec.decodeBinary(decoder) as unknown as CodecVariantValue;
    case VariantType.LocalizedText:
      return LocalizedTextCodec.decodeBinary(decoder) as unknown as CodecVariantValue;
    case VariantType.ExtensionObject:
      return ExtensionObjectCodec.decodeBinary(decoder) as unknown as CodecVariantValue;
    case VariantType.DataValue:
      return DataValueCodec.decodeBinary(decoder) as unknown as CodecVariantValue;
    case VariantType.Variant:
      return decodeBinary(decoder);
    case VariantType.DiagnosticInfo:
      return DiagnosticInfoCodec.decodeBinary(decoder) as unknown as CodecVariantValue;
    default:
      throw new CodecError(`Unsupported Variant type: ${type}`);
  }
}

/**
 * Get the XML element name for a variant type.
 * 
 * @param type - The variant type ID
 * @returns The XML element name
 */
function getXmlElementName(type: VariantType): string {
  switch (type) {
    case VariantType.Null: return 'Null';
    case VariantType.Boolean: return 'Boolean';
    case VariantType.SByte: return 'SByte';
    case VariantType.Byte: return 'Byte';
    case VariantType.Int16: return 'Int16';
    case VariantType.UInt16: return 'UInt16';
    case VariantType.Int32: return 'Int32';
    case VariantType.UInt32: return 'UInt32';
    case VariantType.Int64: return 'Int64';
    case VariantType.UInt64: return 'UInt64';
    case VariantType.Float: return 'Float';
    case VariantType.Double: return 'Double';
    case VariantType.String: return 'String';
    case VariantType.DateTime: return 'DateTime';
    case VariantType.Guid: return 'Guid';
    case VariantType.ByteString: return 'ByteString';
    case VariantType.XmlElement: return 'XmlElement';
    case VariantType.NodeId: return 'NodeId';
    case VariantType.ExpandedNodeId: return 'ExpandedNodeId';
    case VariantType.StatusCode: return 'StatusCode';
    case VariantType.QualifiedName: return 'QualifiedName';
    case VariantType.LocalizedText: return 'LocalizedText';
    case VariantType.ExtensionObject: return 'ExtensionObject';
    case VariantType.DataValue: return 'DataValue';
    case VariantType.Variant: return 'Variant';
    case VariantType.DiagnosticInfo: return 'DiagnosticInfo';
    default:
      throw new CodecError(`Unknown Variant type: ${type}`);
  }
}

/**
 * Get the variant type from an XML element name.
 * 
 * @param elementName - The XML element name
 * @returns The variant type ID
 */
function getVariantTypeFromElementName(elementName: string): VariantType {
  // Handle ListOf prefix for arrays
  const name = elementName.startsWith('ListOf') ? elementName.substring(6) : elementName;
  
  switch (name) {
    case 'Null': return VariantType.Null;
    case 'Boolean': return VariantType.Boolean;
    case 'SByte': return VariantType.SByte;
    case 'Byte': return VariantType.Byte;
    case 'Int16': return VariantType.Int16;
    case 'UInt16': return VariantType.UInt16;
    case 'Int32': return VariantType.Int32;
    case 'UInt32': return VariantType.UInt32;
    case 'Int64': return VariantType.Int64;
    case 'UInt64': return VariantType.UInt64;
    case 'Float': return VariantType.Float;
    case 'Double': return VariantType.Double;
    case 'String': return VariantType.String;
    case 'DateTime': return VariantType.DateTime;
    case 'Guid': return VariantType.Guid;
    case 'ByteString': return VariantType.ByteString;
    case 'XmlElement': return VariantType.XmlElement;
    case 'NodeId': return VariantType.NodeId;
    case 'ExpandedNodeId': return VariantType.ExpandedNodeId;
    case 'StatusCode': return VariantType.StatusCode;
    case 'QualifiedName': return VariantType.QualifiedName;
    case 'LocalizedText': return VariantType.LocalizedText;
    case 'ExtensionObject': return VariantType.ExtensionObject;
    case 'DataValue': return VariantType.DataValue;
    case 'Variant': return VariantType.Variant;
    case 'DiagnosticInfo': return VariantType.DiagnosticInfo;
    default:
      throw new CodecError(`Unknown XML element name for Variant: ${elementName}`);
  }
}

/**
 * Encode a single variant value to XML based on its type.
 * 
 * @param encoder - The XML encoder
 * @param type - The variant type ID
 * @param value - The value to encode
 * @param elementName - The XML element name
 */
function encodeVariantValueXml(
  encoder: any,
  type: VariantType,
  value: CodecVariantValue,
  elementName: string
): void {
  encoder.startElement(elementName);
  
  switch (type) {
    case VariantType.Null:
      // Null is encoded as empty element
      break;
    case VariantType.Boolean:
      encoder.encodeBoolean(value as boolean);
      break;
    case VariantType.SByte:
      encoder.encodeSByte(value as number);
      break;
    case VariantType.Byte:
      encoder.encodeByte(value as number);
      break;
    case VariantType.Int16:
      encoder.encodeInt16(value as number);
      break;
    case VariantType.UInt16:
      encoder.encodeUInt16(value as number);
      break;
    case VariantType.Int32:
      encoder.encodeInt32(value as number);
      break;
    case VariantType.UInt32:
      encoder.encodeUInt32(value as number);
      break;
    case VariantType.Int64:
      encoder.encodeInt64(value as bigint);
      break;
    case VariantType.UInt64:
      encoder.encodeUInt64(value as bigint);
      break;
    case VariantType.Float:
      encoder.encodeFloat(value as number);
      break;
    case VariantType.Double:
      encoder.encodeDouble(value as number);
      break;
    case VariantType.String:
      encoder.encodeString(value as string);
      break;
    case VariantType.DateTime:
      encoder.encodeDateTime(value as Date);
      break;
    case VariantType.Guid:
      encoder.encodeGuid(value as string);
      break;
    case VariantType.ByteString:
      encoder.encodeByteString(value as Uint8Array);
      break;
    case VariantType.XmlElement:
      encoder.encodeXmlElement(value as string);
      break;
    case VariantType.NodeId:
      NodeIdCodec.encodeXml(encoder, value as NodeId);
      break;
    case VariantType.ExpandedNodeId:
      ExpandedNodeIdCodec.encodeXml(encoder, value as unknown as ExpandedNodeId);
      break;
    case VariantType.StatusCode:
      StatusCodeCodec.encodeXml(encoder, value as StatusCode);
      break;
    case VariantType.QualifiedName:
      QualifiedNameCodec.encodeXml(encoder, value as unknown as QualifiedName);
      break;
    case VariantType.LocalizedText:
      LocalizedTextCodec.encodeXml(encoder, value as unknown as LocalizedText);
      break;
    case VariantType.ExtensionObject:
      ExtensionObjectCodec.encodeXml(encoder, value as unknown as ExtensionObject);
      break;
    case VariantType.DataValue:
      DataValueCodec.encodeXml(encoder, value as unknown as DataValue);
      break;
    case VariantType.Variant:
      encodeXml(encoder, value as unknown as Variant);
      break;
    case VariantType.DiagnosticInfo:
      DiagnosticInfoCodec.encodeXml(encoder, value as unknown as DiagnosticInfo);
      break;
    default:
      throw new CodecError(`Unsupported Variant type for XML encoding: ${type}`);
  }
  
  encoder.endElement();
}

/**
 * Encode a Variant to XML format.
 * 
 * XML encoding uses type-specific element names:
 * - Scalar: <TypeName>value</TypeName> (e.g., <Int32>42</Int32>)
 * - Array: <ListOfTypeName><TypeName>v1</TypeName><TypeName>v2</TypeName>...</ListOfTypeName>
 * - Null: <Null/>
 * 
 * Note: ArrayDimensions are not encoded in XML format per OPC UA specification.
 * 
 * @param encoder - The XML encoder
 * @param value - The Variant to encode
 */
export function encodeXml(encoder: any, value: Variant): void {
  // Validate type ID
  if (value.variantType < 0 || value.variantType > 25) {
    throw new CodecError(`Invalid Variant type ID: ${value.variantType}. Must be 0-25.`);
  }

  const elementName = getXmlElementName(value.variantType);
  const isArrayValue = Array.isArray(value.value);

  if (isArrayValue) {
    // Array: use ListOf prefix
    const listElementName = `ListOf${elementName}`;
    encoder.startElement(listElementName);
    
    const array = value.value as CodecVariantValue[];
    for (const elem of array) {
      encodeVariantValueXml(encoder, value.variantType, elem, elementName);
    }
    
    encoder.endElement();
  } else {
    // Scalar value
    encodeVariantValueXml(encoder, value.variantType, value.value as CodecVariantValue, elementName);
  }
}

/**
 * Decode a single variant value from XML based on its type.
 * Assumes the decoder is already positioned at the value element.
 * 
 * @param decoder - The XML decoder
 * @param type - The variant type ID
 * @returns The decoded value
 */
function decodeVariantValueXml(decoder: any, type: VariantType): CodecVariantValue {
  switch (type) {
    case VariantType.Null:
      return null;
    case VariantType.Boolean:
      return decoder.decodeBoolean();
    case VariantType.SByte:
      return decoder.decodeSByte();
    case VariantType.Byte:
      return decoder.decodeByte();
    case VariantType.Int16:
      return decoder.decodeInt16();
    case VariantType.UInt16:
      return decoder.decodeUInt16();
    case VariantType.Int32:
      return decoder.decodeInt32();
    case VariantType.UInt32:
      return decoder.decodeUInt32();
    case VariantType.Int64:
      return decoder.decodeInt64();
    case VariantType.UInt64:
      return decoder.decodeUInt64();
    case VariantType.Float:
      return decoder.decodeFloat();
    case VariantType.Double:
      return decoder.decodeDouble();
    case VariantType.String:
      return decoder.decodeString();
    case VariantType.DateTime:
      return decoder.decodeDateTime();
    case VariantType.Guid:
      return decoder.decodeGuid();
    case VariantType.ByteString:
      return decoder.decodeByteString();
    case VariantType.XmlElement:
      return decoder.decodeXmlElement();
    case VariantType.NodeId:
      return NodeIdCodec.decodeXml(decoder);
    case VariantType.ExpandedNodeId:
      return ExpandedNodeIdCodec.decodeXml(decoder) as unknown as CodecVariantValue;
    case VariantType.StatusCode:
      return StatusCodeCodec.decodeXml(decoder);
    case VariantType.QualifiedName:
      return QualifiedNameCodec.decodeXml(decoder) as unknown as CodecVariantValue;
    case VariantType.LocalizedText:
      return LocalizedTextCodec.decodeXml(decoder) as unknown as CodecVariantValue;
    case VariantType.ExtensionObject:
      return ExtensionObjectCodec.decodeXml(decoder) as unknown as CodecVariantValue;
    case VariantType.DataValue:
      return DataValueCodec.decodeXml(decoder) as unknown as CodecVariantValue;
    case VariantType.Variant:
      return decodeXml(decoder);
    case VariantType.DiagnosticInfo:
      return DiagnosticInfoCodec.decodeXml(decoder) as unknown as CodecVariantValue;
    default:
      throw new CodecError(`Unsupported Variant type for XML decoding: ${type}`);
  }
}

/**
 * Decode a Variant from XML format.
 * 
 * XML decoding reads the element name to determine the type:
 * - Scalar: <TypeName>value</TypeName>
 * - Array: <ListOfTypeName><TypeName>v1</TypeName>...</ListOfTypeName>
 * - Null: <Null/> or <Null></Null>
 * 
 * The decoder should be positioned at the Variant's wrapper element,
 * which contains a single child element indicating the type.
 * 
 * Note: ArrayDimensions are not encoded in XML format per OPC UA specification.
 * 
 * @param decoder - The XML decoder
 * @returns The decoded Variant
 */
export function decodeXml(decoder: any): Variant {
  // Get the child element name to determine type
  // The current element is the Variant wrapper, child element indicates the type
  const elementName = decoder.getCurrentElementName();
  if (!elementName) {
    throw new CodecError('Cannot decode Variant: no child element found');
  }

  // Check if this is an array (ListOf prefix)
  const isArrayValue = elementName.startsWith('ListOf');
  const type = getVariantTypeFromElementName(elementName);

  let value: CodecVariantValue | CodecVariantValue[];

  if (isArrayValue) {
    // Array: navigate to ListOf element and read all child elements
    decoder.startElement(elementName);
    
    const childElementName = getXmlElementName(type);
    const children = decoder.getChildElements(childElementName);
    
    const array: CodecVariantValue[] = [];
    for (let i = 0; i < children.length; i++) {
      // Position decoder at each child element
      const savedCurrent = (decoder as any).currentElement;
      (decoder as any).currentElement = children[i];
      
      array.push(decodeVariantValueXml(decoder, type));
      
      (decoder as any).currentElement = savedCurrent;
    }
    
    decoder.endElement();
    value = array;
  } else {
    // Scalar: navigate to the type element and decode
    decoder.startElement(elementName);
    value = decodeVariantValueXml(decoder, type);
    decoder.endElement();
  }

  // XML format does not encode array dimensions
  return new Variant(type, value as TypesVariantValue | TypesVariantValue[], null);
}

/**
 * Encode a single variant value to JSON based on its type.
 * The encoder should already be positioned appropriately.
 * 
 * @param encoder - The JSON encoder
 * @param type - The variant type ID
 * @param value - The value to encode
 */
function encodeVariantValueJson(encoder: any, type: VariantType, value: CodecVariantValue): void {
  switch (type) {
    case VariantType.Null:
      encoder.setValue(null);
      break;
    case VariantType.Boolean:
      encoder.encodeBoolean(value as boolean);
      break;
    case VariantType.SByte:
      encoder.encodeSByte(value as number);
      break;
    case VariantType.Byte:
      encoder.encodeByte(value as number);
      break;
    case VariantType.Int16:
      encoder.encodeInt16(value as number);
      break;
    case VariantType.UInt16:
      encoder.encodeUInt16(value as number);
      break;
    case VariantType.Int32:
      encoder.encodeInt32(value as number);
      break;
    case VariantType.UInt32:
      encoder.encodeUInt32(value as number);
      break;
    case VariantType.Int64:
      encoder.encodeInt64(value as bigint);
      break;
    case VariantType.UInt64:
      encoder.encodeUInt64(value as bigint);
      break;
    case VariantType.Float:
      encoder.encodeFloat(value as number);
      break;
    case VariantType.Double:
      encoder.encodeDouble(value as number);
      break;
    case VariantType.String:
      encoder.encodeString(value as string);
      break;
    case VariantType.DateTime:
      encoder.encodeDateTime(value as Date);
      break;
    case VariantType.Guid:
      encoder.encodeGuid(value as string);
      break;
    case VariantType.ByteString:
      encoder.encodeByteString(value as Uint8Array);
      break;
    case VariantType.XmlElement:
      encoder.encodeXmlElement(value as string);
      break;
    case VariantType.NodeId:
      NodeIdCodec.encodeJson(encoder, value as NodeId);
      break;
    case VariantType.ExpandedNodeId:
      ExpandedNodeIdCodec.encodeJson(encoder, value as unknown as ExpandedNodeId);
      break;
    case VariantType.StatusCode:
      StatusCodeCodec.encodeJson(encoder, value as StatusCode);
      break;
    case VariantType.QualifiedName:
      QualifiedNameCodec.encodeJson(encoder, value as unknown as QualifiedName);
      break;
    case VariantType.LocalizedText:
      LocalizedTextCodec.encodeJson(encoder, value as unknown as LocalizedText);
      break;
    case VariantType.ExtensionObject:
      ExtensionObjectCodec.encodeJson(encoder, value as unknown as ExtensionObject);
      break;
    case VariantType.DataValue:
      DataValueCodec.encodeJson(encoder, value as unknown as DataValue);
      break;
    case VariantType.Variant:
      encodeJson(encoder, value as unknown as Variant);
      break;
    case VariantType.DiagnosticInfo:
      DiagnosticInfoCodec.encodeJson(encoder, value as unknown as DiagnosticInfo);
      break;
    default:
      throw new CodecError(`Unsupported Variant type for JSON encoding: ${type}`);
  }
}

/**
 * Encode a Variant to JSON format.
 * 
 * JSON encoding structure per OPC UA specification:
 * {
 *   "Type": <TypeId>,
 *   "Body": <Value>
 * }
 * 
 * Type field contains numeric type ID (0-25)
 * Body field contains the actual value
 * Arrays are encoded as JSON arrays in the Body field
 * 
 * Note: ArrayDimensions are encoded separately if present.
 * 
 * @param encoder - The JSON encoder
 * @param value - The Variant to encode
 */
export function encodeJson(encoder: any, value: Variant): void {
  // Validate type ID
  if (value.variantType < 0 || value.variantType > 25) {
    throw new CodecError(`Invalid Variant type ID: ${value.variantType}. Must be 0-25.`);
  }

  const isArrayValue = Array.isArray(value.value);

  // Start JSON object for Variant
  encoder.startObject();

  // Encode Type field
  const current = encoder.root;
  current['Type'] = value.variantType;

  // Encode Body field
  if (isArrayValue) {
    // Array: encode as JSON array
    const array = value.value as CodecVariantValue[];
    const bodyArray: any[] = [];
    
    for (const elem of array) {
      // Create temporary encoder for each element
      const tempEncoder = new (encoder.constructor)();
      encodeVariantValueJson(tempEncoder, value.variantType, elem);
      bodyArray.push(tempEncoder.getObject());
    }
    
    current['Body'] = bodyArray;
  } else {
    // Scalar: encode value directly
    const tempEncoder = new (encoder.constructor)();
    encodeVariantValueJson(tempEncoder, value.variantType, value.value as CodecVariantValue);
    current['Body'] = tempEncoder.getObject();
  }

  // Encode Dimensions field if present
  if (value.arrayDimensions !== null && value.arrayDimensions.length > 0) {
    current['Dimensions'] = value.arrayDimensions;
  }

  encoder.endObject();
}

/**
 * Decode a single variant value from JSON based on its type.
 * 
 * @param decoder - The JSON decoder positioned at the value
 * @param type - The variant type ID
 * @returns The decoded value
 */
function decodeVariantValueJson(decoder: any, type: VariantType): CodecVariantValue {
  switch (type) {
    case VariantType.Null:
      return null;
    case VariantType.Boolean:
      return decoder.decodeBoolean();
    case VariantType.SByte:
      return decoder.decodeSByte();
    case VariantType.Byte:
      return decoder.decodeByte();
    case VariantType.Int16:
      return decoder.decodeInt16();
    case VariantType.UInt16:
      return decoder.decodeUInt16();
    case VariantType.Int32:
      return decoder.decodeInt32();
    case VariantType.UInt32:
      return decoder.decodeUInt32();
    case VariantType.Int64:
      return decoder.decodeInt64();
    case VariantType.UInt64:
      return decoder.decodeUInt64();
    case VariantType.Float:
      return decoder.decodeFloat();
    case VariantType.Double:
      return decoder.decodeDouble();
    case VariantType.String:
      return decoder.decodeString();
    case VariantType.DateTime:
      return decoder.decodeDateTime();
    case VariantType.Guid:
      return decoder.decodeGuid();
    case VariantType.ByteString:
      return decoder.decodeByteString();
    case VariantType.XmlElement:
      return decoder.decodeXmlElement();
    case VariantType.NodeId:
      return NodeIdCodec.decodeJson(decoder);
    case VariantType.ExpandedNodeId:
      return ExpandedNodeIdCodec.decodeJson(decoder) as unknown as CodecVariantValue;
    case VariantType.StatusCode:
      return StatusCodeCodec.decodeJson(decoder);
    case VariantType.QualifiedName:
      return QualifiedNameCodec.decodeJson(decoder) as unknown as CodecVariantValue;
    case VariantType.LocalizedText:
      return LocalizedTextCodec.decodeJson(decoder) as unknown as CodecVariantValue;
    case VariantType.ExtensionObject:
      return ExtensionObjectCodec.decodeJson(decoder) as unknown as CodecVariantValue;
    case VariantType.DataValue:
      return DataValueCodec.decodeJson(decoder) as unknown as CodecVariantValue;
    case VariantType.Variant:
      return decodeJson(decoder);
    case VariantType.DiagnosticInfo:
      return DiagnosticInfoCodec.decodeJson(decoder) as unknown as CodecVariantValue;
    default:
      throw new CodecError(`Unsupported Variant type for JSON decoding: ${type}`);
  }
}

/**
 * Decode a Variant from JSON format.
 * 
 * JSON decoding expects structure:
 * {
 *   "Type": <TypeId>,
 *   "Body": <Value>,
 *   "Dimensions": [d1, d2, ...] // optional
 * }
 * 
 * Type field contains numeric type ID (0-25)
 * Body field contains the value (scalar or array)
 * Dimensions field is optional for multi-dimensional arrays
 * 
 * @param decoder - The JSON decoder
 * @returns The decoded Variant
 */
export function decodeJson(decoder: any): Variant {
  const obj = decoder.getValue();
  
  if (typeof obj !== 'object' || obj === null) {
    throw new CodecError('Cannot decode Variant: expected JSON object');
  }

  if (!('Type' in obj)) {
    throw new CodecError('Cannot decode Variant: missing Type field');
  }

  if (!('Body' in obj)) {
    throw new CodecError('Cannot decode Variant: missing Body field');
  }

  const type = obj.Type;
  
  // Validate type ID
  if (typeof type !== 'number' || type < 0 || type > 25) {
    throw new CodecError(`Invalid Variant type ID: ${type}. Must be 0-25.`);
  }

  let value: CodecVariantValue | CodecVariantValue[];
  const body = obj.Body;

  if (Array.isArray(body)) {
    // Array value
    const array: CodecVariantValue[] = [];
    for (const elem of body) {
      // Create temporary decoder for each element
      const tempDecoder = new (decoder.constructor)(JSON.stringify(elem));
      array.push(decodeVariantValueJson(tempDecoder, type));
    }
    value = array;
  } else {
    // Scalar value
    const tempDecoder = new (decoder.constructor)(JSON.stringify(body));
    value = decodeVariantValueJson(tempDecoder, type);
  }

  // Decode dimensions if present
  let dimensions: number[] | null = null;
  if ('Dimensions' in obj && Array.isArray(obj.Dimensions)) {
    dimensions = obj.Dimensions;
  }

  return new Variant(type, value as TypesVariantValue | TypesVariantValue[], dimensions);
}

/**
 * Register Variant codec with the facade.
 * 
 * @param facade - The codec facade
 */
export function registerVariant(facade: CodecFacade): void {
  facade.registerType('Variant', 'i=24', EncodingFormat.Binary, encodeBinary, decodeBinary);
  facade.registerType('Variant', 'i=24_xml', EncodingFormat.Xml, encodeXml, decodeXml);
  facade.registerType('Variant', 'i=24_json', EncodingFormat.Json, encodeJson, decodeJson);
}
