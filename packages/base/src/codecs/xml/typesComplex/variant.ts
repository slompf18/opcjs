

// /**
//  * Encode a single variant value to XML based on its type.
//  * 
//  * @param encoder - The XML encoder
//  * @param type - The variant type ID
//  * @param value - The value to encode
//  * @param elementName - The XML element name
//  */
// function encodeVariantValueXml(
//   encoder: any,
//   type: VariantType,
//   value: VariantValue,
//   elementName: string
// ): void {
//   encoder.startElement(elementName);
  
//   switch (type) {
//     case VariantType.Null:
//       // Null is encoded as empty element
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
//       NodeIdCodec.encodeXml(encoder, value as NodeId);
//       break;
//     case VariantType.ExpandedNodeId:
//       ExpandedNodeIdCodec.encodeXml(encoder, value as unknown as ExpandedNodeId);
//       break;
//     case VariantType.StatusCode:
//       StatusCodeCodec.encodeXml(encoder, value as StatusCode);
//       break;
//     case VariantType.QualifiedName:
//       QualifiedNameCodec.encodeXml(encoder, value as unknown as QualifiedName);
//       break;
//     case VariantType.LocalizedText:
//       LocalizedTextCodec.encodeXml(encoder, value as unknown as LocalizedText);
//       break;
//     case VariantType.ExtensionObject:
//       ExtensionObjectCodec.encodeXml(encoder, value as unknown as ExtensionObject);
//       break;
//     case VariantType.DataValue:
//       DataValueCodec.encodeXml(encoder, value as unknown as DataValue);
//       break;
//     case VariantType.Variant:
//       encodeXml(encoder, value as unknown as Variant);
//       break;
//     case VariantType.DiagnosticInfo:
//       DiagnosticInfoCodec.encodeXml(encoder, value as unknown as DiagnosticInfo);
//       break;
//     default:
//       throw new CodecError(`Unsupported Variant type for XML encoding: ${type}`);
//   }
  
//   encoder.endElement();
// }

// /**
//  * Encode a Variant to XML format.
//  * 
//  * XML encoding uses type-specific element names:
//  * - Scalar: <TypeName>value</TypeName> (e.g., <Int32>42</Int32>)
//  * - Array: <ListOfTypeName><TypeName>v1</TypeName><TypeName>v2</TypeName>...</ListOfTypeName>
//  * - Null: <Null/>
//  * 
//  * Note: ArrayDimensions are not encoded in XML format per OPC UA specification.
//  * 
//  * @param encoder - The XML encoder
//  * @param value - The Variant to encode
//  */
// export function encodeXml(encoder: any, value: Variant): void {
//   // Validate type ID
//   if (value.variantType < 0 || value.variantType > 25) {
//     throw new CodecError(`Invalid Variant type ID: ${value.variantType}. Must be 0-25.`);
//   }

//   const elementName = getXmlElementName(value.variantType);
//   const isArrayValue = Array.isArray(value.value);

//   if (isArrayValue) {
//     // Array: use ListOf prefix
//     const listElementName = `ListOf${elementName}`;
//     encoder.startElement(listElementName);
    
//     const array = value.value as VariantValue[];
//     for (const elem of array) {
//       encodeVariantValueXml(encoder, value.variantType, elem, elementName);
//     }
    
//     encoder.endElement();
//   } else {
//     // Scalar value
//     encodeVariantValueXml(encoder, value.variantType, value.value as VariantValue, elementName);
//   }
// }

// /**
//  * Decode a single variant value from XML based on its type.
//  * Assumes the decoder is already positioned at the value element.
//  * 
//  * @param decoder - The XML decoder
//  * @param type - The variant type ID
//  * @returns The decoded value
//  */
// function decodeVariantValueXml(decoder: any, type: VariantType): VariantValue {
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
//       return NodeIdCodec.decodeXml(decoder);
//     case VariantType.ExpandedNodeId:
//       return ExpandedNodeIdCodec.decodeXml(decoder) as unknown as VariantValue;
//     case VariantType.StatusCode:
//       return StatusCodeCodec.decodeXml(decoder);
//     case VariantType.QualifiedName:
//       return QualifiedNameCodec.decodeXml(decoder) as unknown as VariantValue;
//     case VariantType.LocalizedText:
//       return LocalizedTextCodec.decodeXml(decoder) as unknown as VariantValue;
//     case VariantType.ExtensionObject:
//       return ExtensionObjectCodec.decodeXml(decoder) as unknown as VariantValue;
//     case VariantType.DataValue:
//       return DataValueCodec.decodeXml(decoder) as unknown as VariantValue;
//     case VariantType.Variant:
//       return decodeXml(decoder);
//     case VariantType.DiagnosticInfo:
//       return DiagnosticInfoCodec.decodeXml(decoder) as unknown as VariantValue;
//     default:
//       throw new CodecError(`Unsupported Variant type for XML decoding: ${type}`);
//   }
// }

// /**
//  * Decode a Variant from XML format.
//  * 
//  * XML decoding reads the element name to determine the type:
//  * - Scalar: <TypeName>value</TypeName>
//  * - Array: <ListOfTypeName><TypeName>v1</TypeName>...</ListOfTypeName>
//  * - Null: <Null/> or <Null></Null>
//  * 
//  * The decoder should be positioned at the Variant's wrapper element,
//  * which contains a single child element indicating the type.
//  * 
//  * Note: ArrayDimensions are not encoded in XML format per OPC UA specification.
//  * 
//  * @param decoder - The XML decoder
//  * @returns The decoded Variant
//  */
// export function decodeXml(decoder: any): Variant {
//   // Get the child element name to determine type
//   // The current element is the Variant wrapper, child element indicates the type
//   const elementName = decoder.getCurrentElementName();
//   if (!elementName) {
//     throw new CodecError('Cannot decode Variant: no child element found');
//   }

//   // Check if this is an array (ListOf prefix)
//   const isArrayValue = elementName.startsWith('ListOf');
//   const type = getVariantTypeFromElementName(elementName);

//   let value: VariantValue | VariantValue[];

//   if (isArrayValue) {
//     // Array: navigate to ListOf element and read all child elements
//     decoder.startElement(elementName);
    
//     const childElementName = getXmlElementName(type);
//     const children = decoder.getChildElements(childElementName);
    
//     const array: VariantValue[] = [];
//     for (let i = 0; i < children.length; i++) {
//       // Position decoder at each child element
//       const savedCurrent = (decoder as any).currentElement;
//       (decoder as any).currentElement = children[i];
      
//       array.push(decodeVariantValueXml(decoder, type));
      
//       (decoder as any).currentElement = savedCurrent;
//     }
    
//     decoder.endElement();
//     value = array;
//   } else {
//     // Scalar: navigate to the type element and decode
//     decoder.startElement(elementName);
//     value = decodeVariantValueXml(decoder, type);
//     decoder.endElement();
//   }

//   // XML format does not encode array dimensions
//   return new Variant(type, value as TypesVariantValue | TypesVariantValue[], null);
// }