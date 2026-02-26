// /**
//  * OPC UA Variant type implementation (i=24).
//  * 
//  * A Variant is a union type that can hold any OPC UA builtin type with runtime
//  * type information. The type is determined at runtime through an encoding byte.
//  * 
//  * Binary Encoding (OPC 10000-6 Section 5.2.2.16, Table 25):
//  * - EncodingMask byte (bits 0-5: Type ID, bit 6: ArrayDimensions, bit 7: Array)
//  * - Value (type depends on Type ID)
//  * - ArrayLength (Int32, only if Array bit set)
//  * - Array elements (only if Array bit set)
//  * - ArrayDimensions (Int32[], only if ArrayDimensions bit set)
//  * 
//  * Type IDs (bits 0-5 of EncodingMask):
//  * - 0: Null
//  * - 1: Boolean
//  * - 2: SByte
//  * - 3: Byte
//  * - 4: Int16
//  * - 5: UInt16
//  * - 6: Int32
//  * - 7: UInt32
//  * - 8: Int64
//  * - 9: UInt64
//  * - 10: Float
//  * - 11: Double
//  * - 12: String
//  * - 13: DateTime
//  * - 14: Guid
//  * - 15: ByteString
//  * - 16: XmlElement
//  * - 17: NodeId
//  * - 18: ExpandedNodeId
//  * - 19: StatusCode
//  * - 20: QualifiedName
//  * - 21: LocalizedText
//  * - 22: ExtensionObject
//  * - 23: DataValue
//  * - 24: Variant
//  * - 25: DiagnosticInfo
//  * 
//  * @module codec/complex/variant
//  */

// import { DataValue } from "../../../types/dataValue";
// import { DiagnosticInfo } from "../../../types/diagnosticInfo";
// import { ExpandedNodeId } from "../../../types/expandedNodeid";
// import { ExtensionObject } from "../../../types/extensionObject";
// import { NodeId } from "../../../types/nodeId";
// import { QualifiedName } from "../../../types/qualifiedName";
// import { StatusCode } from "../../../types/statusCode";
// import { Variant, VariantType } from "../../../types/variant";
// import { LocalizedText } from "../../../types/localizedText";
// import { CodecError } from "../../codecError";
// import { IDecoder } from "../../interfaces/decoder";
// import { IWriter } from "../../interfaces/encoder";
// import { dataValueDecodeBinary, dataValueEncodeBinary } from "./dataValue";
// import { diagnosticInfoDecodeBinary, diagnosticInfoEncodeBinary } from "./diagnosticInfo";
// import { expandedNodeIdDecodeBinary, expandedNodeIdEncodeBinary } from "./expandedNodeId";
// import { extensionObjectDecodeBinary, extensionObjectEncodeBinary } from "./extensionObject";
// import { localizedTextDecodeBinary, localizedTextEncodeBinary } from "./localizedText";
// import { nodeIdEncodeBinary, nodeIdDecodeBinary } from "./nodeId";
// import { qualifiedNameDecodeBinary, qualifiedNameEncodeBinary } from "./qualifiedName";
// import { statusCodeDecodeBinary, statusCodeEncodeBinary } from "./statusCode";


// /** Union of all values a Variant can hold (mirrors VariantType 0-25). */
// export type VariantValue =
//   | null           // 0  Null
//   | boolean        // 1  Boolean
//   | number         // 2  SByte, 3 Byte, 4 Int16, 5 UInt16, 6 Int32, 7 UInt32, 10 Float, 11 Double
//   | bigint         // 8  Int64, 9 UInt64
//   | string         // 12 String, 14 Guid, 16 XmlElement
//   | Date           // 13 DateTime
//   | Uint8Array     // 15 ByteString
//   | NodeId         // 17 NodeId
//   | ExpandedNodeId // 18 ExpandedNodeId
//   | StatusCode     // 19 StatusCode
//   | QualifiedName  // 20 QualifiedName
//   | LocalizedText  // 21 LocalizedText
//   | ExtensionObject// 22 ExtensionObject
//   | DataValue      // 23 DataValue
//   | Variant        // 24 Variant (recursive)
//   | DiagnosticInfo;// 25 DiagnosticInfo

// /**
//  * NOTE: Variant class and VariantType enum are imported from types package.
//  * Properties: variantType, value, arrayDimensions
//  */

// /**
//  * Encoding mask bits for Variant.
//  */
// export enum VariantEncodingMask {
//   /** Bits 0-5: Type ID (0-25) */
//   TypeMask = 0x3F,
//   /** Bit 6: ArrayDimensions present */
//   ArrayDimensions = 0x40,
//   /** Bit 7: Value is an array */
//   Array = 0x80,
// }


// /**
//  * Encode a Variant to binary format.
//  * 
//  * Binary encoding per OPC 10000-6 Section 5.2.2.16:
//  * 1. EncodingMask byte (bits 0-5: type, bit 6: dimensions, bit 7: array)
//  * 2. If not array: encode single value
//  * 3. If array: encode Int32 length, then encode each element
//  * 4. If dimensions present: encode Int32 count, then encode each dimension (Int32)
//  * 
//  * @param encoder - The binary encoder
//  * @param value - The Variant to encode
//  */
// export function variantEncodeBinary(encoder: IWriter, value: Variant): void {
//   // Validate type ID
//   if (value.variantType < 0 || value.variantType > 25) {
//     throw new CodecError(`Invalid Variant type ID: ${value.variantType}. Must be 0-25.`);
//   }

//   // Calculate encoding mask
//   let mask = value.variantType & VariantEncodingMask.TypeMask;
  
//   const isArrayValue = Array.isArray(value.value);
//   if (isArrayValue) {
//     mask |= VariantEncodingMask.Array;
//   }
  
//   if (value.arrayDimensions !== null && value.arrayDimensions.length > 0) {
//     mask |= VariantEncodingMask.ArrayDimensions;
//   }

//   // Write encoding mask
//   encoder.writeByte(mask);

//   // Encode value(s)
//   if (isArrayValue) {
//     // Array value
//     const array = value.value as VariantValue[];
//     encoder.writeInt32(array.length);
    
//     for (const elem of array) {
//       variantEncodeBinaryVariantValue(encoder, value.variantType, elem);
//     }
//   } else if (value.variantType !== VariantType.Null) {
//     // Scalar value (not null)
//     variantEncodeBinaryVariantValue(encoder, value.variantType, value.value as VariantValue);
//   }

//   // Encode dimensions if present
//   if (value.arrayDimensions !== null && value.arrayDimensions.length > 0) {
//     encoder.writeInt32(value.arrayDimensions.length);
//     for (const dim of value.arrayDimensions) {
//       encoder.writeInt32(dim);
//     }
//   }
// }

// /**
//  * Encode a single variant value based on its type.
//  * 
//  * @param encoder - The binary encoder
//  * @param type - The variant type ID
//  * @param value - The value to encode
//  */
// function variantEncodeBinaryVariantValue(encoder: IWriter, type: VariantType, value: VariantValue): void {
//   switch (type) {
//     case VariantType.Null:
//       // Null has no value
//       break;
//     case VariantType.Boolean:
//       encoder.writeBoolean(value as boolean);
//       break;
//     case VariantType.SByte:
//       encoder.writeSByte(value as number);
//       break;
//     case VariantType.Byte:
//       encoder.writeByte(value as number);
//       break;
//     case VariantType.Int16:
//       encoder.writeInt16(value as number);
//       break;
//     case VariantType.UInt16:
//       encoder.writeUInt16(value as number);
//       break;
//     case VariantType.Int32:
//       encoder.writeInt32(value as number);
//       break;
//     case VariantType.UInt32:
//       encoder.writeUInt32(value as number);
//       break;
//     case VariantType.Int64:
//       encoder.writeInt64(value as bigint);
//       break;
//     case VariantType.UInt64:
//       encoder.writeUInt64(value as bigint);
//       break;
//     case VariantType.Float:
//       encoder.writeFloat(value as number);
//       break;
//     case VariantType.Double:
//       encoder.writeDouble(value as number);
//       break;
//     case VariantType.String:
//       encoder.writeString(value as string);
//       break;
//     case VariantType.DateTime:
//       encoder.writeDateTime(value as Date);
//       break;
//     case VariantType.Guid:
//       encoder.writeGuid(value as string);
//       break;
//     case VariantType.ByteString:
//       encoder.writeByteString(value as Uint8Array);
//       break;
//     case VariantType.XmlElement:
//       encoder.writeXmlElement(value as string);
//       break;
//     case VariantType.NodeId:
//       nodeIdEncodeBinary(encoder, value as NodeId);
//       break;
//     case VariantType.ExpandedNodeId:
//       expandedNodeIdEncodeBinary(encoder, value as unknown as ExpandedNodeId);
//       break;
//     case VariantType.StatusCode:
//       statusCodeEncodeBinary(encoder, value as StatusCode);
//       break;
//     case VariantType.QualifiedName:
//       qualifiedNameEncodeBinary(encoder, value as unknown as QualifiedName);
//       break;
//     case VariantType.LocalizedText:
//       localizedTextEncodeBinary(encoder, value as unknown as LocalizedText);
//       break;
//     case VariantType.ExtensionObject:
//       extensionObjectEncodeBinary(encoder, value as unknown as ExtensionObject);
//       break;
//     case VariantType.DataValue:
//       dataValueEncodeBinary(encoder, value as unknown as DataValue);
//       break;
//     case VariantType.Variant:
//       variantEncodeBinary(encoder, value as unknown as Variant);
//       break;
//     case VariantType.DiagnosticInfo:
//       diagnosticInfoEncodeBinary(encoder, value as unknown as DiagnosticInfo);
//       break;
//     default:
//       throw new CodecError(`Unsupported Variant type: ${type}`);
//   }
// }

// /**
//  * Decode a Variant from binary format.
//  * 
//  * Binary decoding per OPC 10000-6 Section 5.2.2.16:
//  * 1. Read EncodingMask byte
//  * 2. Extract type ID (bits 0-5), array flag (bit 7), dimensions flag (bit 6)
//  * 3. If array: read length, then decode each element
//  * 4. If scalar: decode single value
//  * 5. If dimensions: read count, then read each dimension
//  * 
//  * @param decoder - The binary decoder
//  * @returns The decoded Variant
//  */
// export function variantDecodeBinary(decoder: IDecoder): Variant {
//   // Read encoding mask
//   const mask = decoder.readByte();
  
//   // Extract type ID (bits 0-5)
//   const type = mask & VariantEncodingMask.TypeMask;
  
//   // Validate type ID
//   if (type > 25) {
//     throw new CodecError(`Invalid Variant type ID: ${type}. Must be 0-25.`);
//   }
  
//   // Check flags
//   const hasArray = (mask & VariantEncodingMask.Array) !== 0;
//   const hasDimensions = (mask & VariantEncodingMask.ArrayDimensions) !== 0;

//   let value: VariantValue | VariantValue[];
  
//   // Decode value(s)
//   if (hasArray) {
//     // Array value
//     const length = decoder.readInt32();
//     if (length < 0) {
//       throw new CodecError(`Invalid array length: ${length}`);
//     }
    
//     const array: VariantValue[] = [];
//     for (let i = 0; i < length; i++) {
//       array.push(variantDecodeBinaryVariantValue(decoder, type));
//     }
//     value = array;
//   } else if (type === VariantType.Null) {
//     // Null value
//     value = null;
//   } else {
//     // Scalar value
//     value = variantDecodeBinaryVariantValue(decoder, type);
//   }

//   // Decode dimensions if present
//   let dimensions: number[] | null = null;
//   if (hasDimensions) {
//     const dimCount = decoder.readInt32();
//     if (dimCount < 0) {
//       throw new CodecError(`Invalid dimensions count: ${dimCount}`);
//     }
    
//     dimensions = [];
//     for (let i = 0; i < dimCount; i++) {
//       dimensions.push(decoder.readInt32());
//     }
//   }

//   return new Variant(type, value, dimensions);
// }

// /**
//  * Decode a single variant value based on its type.
//  * 
//  * @param decoder - The binary decoder
//  * @param type - The variant type ID
//  * @returns The decoded value
//  */
// function variantDecodeBinaryVariantValue(decoder: IDecoder, type: VariantType): VariantValue {
//   switch (type) {
//     case VariantType.Null:
//       return null;
//     case VariantType.Boolean:
//       return decoder.readBoolean();
//     case VariantType.SByte:
//       return decoder.readSByte();
//     case VariantType.Byte:
//       return decoder.readByte();
//     case VariantType.Int16:
//       return decoder.readInt16();
//     case VariantType.UInt16:
//       return decoder.readUInt16();
//     case VariantType.Int32:
//       return decoder.readInt32();
//     case VariantType.UInt32:
//       return decoder.readUInt32();
//     case VariantType.Int64:
//       return decoder.readInt64();
//     case VariantType.UInt64:
//       return decoder.readUInt64();
//     case VariantType.Float:
//       return decoder.readFloat();
//     case VariantType.Double:
//       return decoder.readDouble();
//     case VariantType.String:
//       return decoder.readString();
//     case VariantType.DateTime:
//       return decoder.readDateTime();
//     case VariantType.Guid:
//       return decoder.readGuid();
//     case VariantType.ByteString:
//       return decoder.readByteString();
//     case VariantType.XmlElement:
//       return decoder.readXmlElement();
//     case VariantType.NodeId:
//       return nodeIdDecodeBinary(decoder);
//     case VariantType.ExpandedNodeId:
//       return expandedNodeIdDecodeBinary(decoder) as unknown as VariantValue;
//     case VariantType.StatusCode:
//       return statusCodeDecodeBinary(decoder);
//     case VariantType.QualifiedName:
//       return qualifiedNameDecodeBinary(decoder) as unknown as VariantValue;
//     case VariantType.LocalizedText:
//       return localizedTextDecodeBinary(decoder) as unknown as VariantValue;
//     case VariantType.ExtensionObject:
//       return extensionObjectDecodeBinary(decoder) as unknown as VariantValue;
//     case VariantType.DataValue:
//       return dataValueDecodeBinary(decoder) as unknown as VariantValue;
//     case VariantType.Variant:
//       return variantDecodeBinary(decoder) as unknown as VariantValue;
//     case VariantType.DiagnosticInfo:
//       return diagnosticInfoDecodeBinary(decoder) as unknown as VariantValue;
//     default:
//       throw new CodecError(`Unsupported Variant type: ${type}`);
//   }
// }

// /**
//  * Get the XML element name for a variant type.
//  * 
//  * @param type - The variant type ID
//  * @returns The XML element name
//  */
// function getXmlElementName(type: VariantType): string {
//   switch (type) {
//     case VariantType.Null: return 'Null';
//     case VariantType.Boolean: return 'Boolean';
//     case VariantType.SByte: return 'SByte';
//     case VariantType.Byte: return 'Byte';
//     case VariantType.Int16: return 'Int16';
//     case VariantType.UInt16: return 'UInt16';
//     case VariantType.Int32: return 'Int32';
//     case VariantType.UInt32: return 'UInt32';
//     case VariantType.Int64: return 'Int64';
//     case VariantType.UInt64: return 'UInt64';
//     case VariantType.Float: return 'Float';
//     case VariantType.Double: return 'Double';
//     case VariantType.String: return 'String';
//     case VariantType.DateTime: return 'DateTime';
//     case VariantType.Guid: return 'Guid';
//     case VariantType.ByteString: return 'ByteString';
//     case VariantType.XmlElement: return 'XmlElement';
//     case VariantType.NodeId: return 'NodeId';
//     case VariantType.ExpandedNodeId: return 'ExpandedNodeId';
//     case VariantType.StatusCode: return 'StatusCode';
//     case VariantType.QualifiedName: return 'QualifiedName';
//     case VariantType.LocalizedText: return 'LocalizedText';
//     case VariantType.ExtensionObject: return 'ExtensionObject';
//     case VariantType.DataValue: return 'DataValue';
//     case VariantType.Variant: return 'Variant';
//     case VariantType.DiagnosticInfo: return 'DiagnosticInfo';
//     default:
//       throw new CodecError(`Unknown Variant type: ${type}`);
//   }
// }

// /**
//  * Get the variant type from an XML element name.
//  * 
//  * @param elementName - The XML element name
//  * @returns The variant type ID
//  */
// function getVariantTypeFromElementName(elementName: string): VariantType {
//   // Handle ListOf prefix for arrays
//   const name = elementName.startsWith('ListOf') ? elementName.substring(6) : elementName;
  
//   switch (name) {
//     case 'Null': return VariantType.Null;
//     case 'Boolean': return VariantType.Boolean;
//     case 'SByte': return VariantType.SByte;
//     case 'Byte': return VariantType.Byte;
//     case 'Int16': return VariantType.Int16;
//     case 'UInt16': return VariantType.UInt16;
//     case 'Int32': return VariantType.Int32;
//     case 'UInt32': return VariantType.UInt32;
//     case 'Int64': return VariantType.Int64;
//     case 'UInt64': return VariantType.UInt64;
//     case 'Float': return VariantType.Float;
//     case 'Double': return VariantType.Double;
//     case 'String': return VariantType.String;
//     case 'DateTime': return VariantType.DateTime;
//     case 'Guid': return VariantType.Guid;
//     case 'ByteString': return VariantType.ByteString;
//     case 'XmlElement': return VariantType.XmlElement;
//     case 'NodeId': return VariantType.NodeId;
//     case 'ExpandedNodeId': return VariantType.ExpandedNodeId;
//     case 'StatusCode': return VariantType.StatusCode;
//     case 'QualifiedName': return VariantType.QualifiedName;
//     case 'LocalizedText': return VariantType.LocalizedText;
//     case 'ExtensionObject': return VariantType.ExtensionObject;
//     case 'DataValue': return VariantType.DataValue;
//     case 'Variant': return VariantType.Variant;
//     case 'DiagnosticInfo': return VariantType.DiagnosticInfo;
//     default:
//       throw new CodecError(`Unknown XML element name for Variant: ${elementName}`);
//   }
// }