
// /**
//  * Encode a single variant value to JSON based on its type.
//  * The encoder should already be positioned appropriately.
//  * 
//  * @param encoder - The JSON encoder
//  * @param type - The variant type ID
//  * @param value - The value to encode
//  */
// function encodeVariantValueJson(encoder: any, type: VariantType, value: VariantValue): void {
//   switch (type) {
//     case VariantType.Null:
//       encoder.setValue(null);
//       break;
//     case VariantType.Boolean:
//       encoder.encodeBoolean(value as boolean);
//       break;
//     case VariantType.SByte:
//       encoder.encodeSByte(value as number);
//       break;
//     case VariantType.Byte:
//       encoder.encodeByte(value as number);
//       break;
//     case VariantType.Int16:
//       encoder.encodeInt16(value as number);
//       break;
//     case VariantType.UInt16:
//       encoder.encodeUInt16(value as number);
//       break;
//     case VariantType.Int32:
//       encoder.encodeInt32(value as number);
//       break;
//     case VariantType.UInt32:
//       encoder.encodeUInt32(value as number);
//       break;
//     case VariantType.Int64:
//       encoder.encodeInt64(value as bigint);
//       break;
//     case VariantType.UInt64:
//       encoder.encodeUInt64(value as bigint);
//       break;
//     case VariantType.Float:
//       encoder.encodeFloat(value as number);
//       break;
//     case VariantType.Double:
//       encoder.encodeDouble(value as number);
//       break;
//     case VariantType.String:
//       encoder.encodeString(value as string);
//       break;
//     case VariantType.DateTime:
//       encoder.encodeDateTime(value as Date);
//       break;
//     case VariantType.Guid:
//       encoder.encodeGuid(value as string);
//       break;
//     case VariantType.ByteString:
//       encoder.encodeByteString(value as Uint8Array);
//       break;
//     case VariantType.XmlElement:
//       encoder.encodeXmlElement(value as string);
//       break;
//     case VariantType.NodeId:
//       NodeIdCodec.encodeJson(encoder, value as NodeId);
//       break;
//     case VariantType.ExpandedNodeId:
//       ExpandedNodeIdCodec.encodeJson(encoder, value as unknown as ExpandedNodeId);
//       break;
//     case VariantType.StatusCode:
//       StatusCodeCodec.encodeJson(encoder, value as StatusCode);
//       break;
//     case VariantType.QualifiedName:
//       QualifiedNameCodec.encodeJson(encoder, value as unknown as QualifiedName);
//       break;
//     case VariantType.LocalizedText:
//       LocalizedTextCodec.encodeJson(encoder, value as unknown as LocalizedText);
//       break;
//     case VariantType.ExtensionObject:
//       ExtensionObjectCodec.encodeJson(encoder, value as unknown as ExtensionObject);
//       break;
//     case VariantType.DataValue:
//       DataValueCodec.encodeJson(encoder, value as unknown as DataValue);
//       break;
//     case VariantType.Variant:
//       encodeJson(encoder, value as unknown as Variant);
//       break;
//     case VariantType.DiagnosticInfo:
//       DiagnosticInfoCodec.encodeJson(encoder, value as unknown as DiagnosticInfo);
//       break;
//     default:
//       throw new CodecError(`Unsupported Variant type for JSON encoding: ${type}`);
//   }
// }

// /**
//  * Encode a Variant to JSON format.
//  * 
//  * JSON encoding structure per OPC UA specification:
//  * {
//  *   "Type": <TypeId>,
//  *   "Body": <Value>
//  * }
//  * 
//  * Type field contains numeric type ID (0-25)
//  * Body field contains the actual value
//  * Arrays are encoded as JSON arrays in the Body field
//  * 
//  * Note: ArrayDimensions are encoded separately if present.
//  * 
//  * @param encoder - The JSON encoder
//  * @param value - The Variant to encode
//  */
// export function encodeJson(encoder: any, value: Variant): void {
//   // Validate type ID
//   if (value.variantType < 0 || value.variantType > 25) {
//     throw new CodecError(`Invalid Variant type ID: ${value.variantType}. Must be 0-25.`);
//   }

//   const isArrayValue = Array.isArray(value.value);

//   // Start JSON object for Variant
//   encoder.startObject();

//   // Encode Type field
//   const current = encoder.root;
//   current['Type'] = value.variantType;

//   // Encode Body field
//   if (isArrayValue) {
//     // Array: encode as JSON array
//     const array = value.value as VariantValue[];
//     const bodyArray: any[] = [];
    
//     for (const elem of array) {
//       // Create temporary encoder for each element
//       const tempEncoder = new (encoder.constructor)();
//       encodeVariantValueJson(tempEncoder, value.variantType, elem);
//       bodyArray.push(tempEncoder.getObject());
//     }
    
//     current['Body'] = bodyArray;
//   } else {
//     // Scalar: encode value directly
//     const tempEncoder = new (encoder.constructor)();
//     encodeVariantValueJson(tempEncoder, value.variantType, value.value as VariantValue);
//     current['Body'] = tempEncoder.getObject();
//   }

//   // Encode Dimensions field if present
//   if (value.arrayDimensions !== null && value.arrayDimensions.length > 0) {
//     current['Dimensions'] = value.arrayDimensions;
//   }

//   encoder.endObject();
// }

// /**
//  * Decode a single variant value from JSON based on its type.
//  * 
//  * @param decoder - The JSON decoder positioned at the value
//  * @param type - The variant type ID
//  * @returns The decoded value
//  */
// function decodeVariantValueJson(decoder: any, type: VariantType): VariantValue {
//   switch (type) {
//     case VariantType.Null:
//       return null;
//     case VariantType.Boolean:
//       return decoder.decodeBoolean();
//     case VariantType.SByte:
//       return decoder.decodeSByte();
//     case VariantType.Byte:
//       return decoder.decodeByte();
//     case VariantType.Int16:
//       return decoder.decodeInt16();
//     case VariantType.UInt16:
//       return decoder.decodeUInt16();
//     case VariantType.Int32:
//       return decoder.decodeInt32();
//     case VariantType.UInt32:
//       return decoder.decodeUInt32();
//     case VariantType.Int64:
//       return decoder.decodeInt64();
//     case VariantType.UInt64:
//       return decoder.decodeUInt64();
//     case VariantType.Float:
//       return decoder.decodeFloat();
//     case VariantType.Double:
//       return decoder.decodeDouble();
//     case VariantType.String:
//       return decoder.decodeString();
//     case VariantType.DateTime:
//       return decoder.decodeDateTime();
//     case VariantType.Guid:
//       return decoder.decodeGuid();
//     case VariantType.ByteString:
//       return decoder.decodeByteString();
//     case VariantType.XmlElement:
//       return decoder.decodeXmlElement();
//     case VariantType.NodeId:
//       return NodeIdCodec.decodeJson(decoder);
//     case VariantType.ExpandedNodeId:
//       return ExpandedNodeIdCodec.decodeJson(decoder) as unknown as VariantValue;
//     case VariantType.StatusCode:
//       return StatusCodeCodec.decodeJson(decoder);
//     case VariantType.QualifiedName:
//       return QualifiedNameCodec.decodeJson(decoder) as unknown as VariantValue;
//     case VariantType.LocalizedText:
//       return LocalizedTextCodec.decodeJson(decoder) as unknown as VariantValue;
//     case VariantType.ExtensionObject:
//       return ExtensionObjectCodec.decodeJson(decoder) as unknown as VariantValue;
//     case VariantType.DataValue:
//       return DataValueCodec.decodeJson(decoder) as unknown as VariantValue;
//     case VariantType.Variant:
//       return decodeJson(decoder);
//     case VariantType.DiagnosticInfo:
//       return DiagnosticInfoCodec.decodeJson(decoder) as unknown as VariantValue;
//     default:
//       throw new CodecError(`Unsupported Variant type for JSON decoding: ${type}`);
//   }
// }

// /**
//  * Decode a Variant from JSON format.
//  * 
//  * JSON decoding expects structure:
//  * {
//  *   "Type": <TypeId>,
//  *   "Body": <Value>,
//  *   "Dimensions": [d1, d2, ...] // optional
//  * }
//  * 
//  * Type field contains numeric type ID (0-25)
//  * Body field contains the value (scalar or array)
//  * Dimensions field is optional for multi-dimensional arrays
//  * 
//  * @param decoder - The JSON decoder
//  * @returns The decoded Variant
//  */
// export function decodeJson(decoder: any): Variant {
//   const obj = decoder.getValue();
  
//   if (typeof obj !== 'object' || obj === null) {
//     throw new CodecError('Cannot decode Variant: expected JSON object');
//   }

//   if (!('Type' in obj)) {
//     throw new CodecError('Cannot decode Variant: missing Type field');
//   }

//   if (!('Body' in obj)) {
//     throw new CodecError('Cannot decode Variant: missing Body field');
//   }

//   const type = obj.Type;
  
//   // Validate type ID
//   if (typeof type !== 'number' || type < 0 || type > 25) {
//     throw new CodecError(`Invalid Variant type ID: ${type}. Must be 0-25.`);
//   }

//   let value: VariantValue | VariantValue[];
//   const body = obj.Body;

//   if (Array.isArray(body)) {
//     // Array value
//     const array: VariantValue[] = [];
//     for (const elem of body) {
//       // Create temporary decoder for each element
//       const tempDecoder = new (decoder.constructor)(JSON.stringify(elem));
//       array.push(decodeVariantValueJson(tempDecoder, type));
//     }
//     value = array;
//   } else {
//     // Scalar value
//     const tempDecoder = new (decoder.constructor)(JSON.stringify(body));
//     value = decodeVariantValueJson(tempDecoder, type);
//   }

//   // Decode dimensions if present
//   let dimensions: number[] | null = null;
//   if ('Dimensions' in obj && Array.isArray(obj.Dimensions)) {
//     dimensions = obj.Dimensions;
//   }

//   return new Variant(type, value as TypesVariantValue | TypesVariantValue[], dimensions);
// }