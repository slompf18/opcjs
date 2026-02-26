// /**
//  * @fileoverview NodeId type definition and encoder/decoder
//  * @module codec/complex/nodeid
//  * 
//  * NodeId is a universal identifier for nodes in the OPC UA address space.
//  * Binary encoding uses 6 different formats for optimal size.
//  * 
//  * @see OPC 10000-6 Section 5.2.2.9 - NodeId
//  * @see OPC 10000-6 Tables 16-19 - NodeId encoding formats
//  * @see FR-012 - Compact encoding format selection
//  * @see FR-013 - Support all six NodeId formats
//  */

// // Encode/decode logic has been inlined into BinaryEncoder.writeNodeId and BinaryDecoder.readNodeId.
// // See src/codec/binary/codecs/encoder.ts and decoder.ts.

// /**
//  * Binary encoding format bytes for NodeId per OPC 10000-6 Table 16
//  */
// enum NodeIdEncodingByte {
//   TwoByte = 0x00,      // namespace=0, identifier≤255
//   FourByte = 0x01,     // namespace≤255, identifier≤65535
//   Numeric = 0x02,      // any namespace, identifier is UInt32
//   String = 0x03,       // string identifier
//   Guid = 0x04,         // GUID identifier
//   ByteString = 0x05    // opaque identifier
// }

// /**
//  * Select most compact binary encoding format for a NodeId per FR-012.
//  * 
//  * Rules:
//  * - TwoByteNodeId (0x00): namespace=0 AND identifier≤255
//  * - FourByteNodeId (0x01): namespace≤255 AND identifier≤65535
//  * - NumericNodeId (0x02): numeric identifier (any namespace/value)
//  * - StringNodeId (0x03): string identifier
//  * - GuidNodeId (0x04): GUID identifier
//  * - ByteStringNodeId (0x05): opaque identifier
//  * 
//  * @see FR-012 - Compact encoding selection algorithm
//  */
// function selectEncodingFormat(nodeId: NodeId): NodeIdEncodingByte {
//   if (nodeId.identifierType === NodeIdType.Numeric) {
//     const id = nodeId.identifier as number;
//     const ns = nodeId.namespace;
    
//     // TwoByteNodeId: namespace=0 AND identifier≤255
//     if (ns === 0 && id >= 0 && id <= 255) {
//       return NodeIdEncodingByte.TwoByte;
//     }
    
//     // FourByteNodeId: namespace≤255 AND identifier≤65535
//     if (ns >= 0 && ns <= 255 && id >= 0 && id <= 65535) {
//       return NodeIdEncodingByte.FourByte;
//     }
    
//     // NumericNodeId: any namespace, UInt32 identifier
//     return NodeIdEncodingByte.Numeric;
//   }
  
//   if (nodeId.identifierType === NodeIdType.String) {
//     return NodeIdEncodingByte.String;
//   }
  
//   if (nodeId.identifierType === NodeIdType.Guid) {
//     return NodeIdEncodingByte.Guid;
//   }
  
//   if (nodeId.identifierType === NodeIdType.ByteString) {
//     return NodeIdEncodingByte.ByteString;
//   }
  
//   throw new CodecError(`Invalid NodeId identifier type: ${nodeId.identifierType}`);
// }

// /**
//  * Encode a NodeId in Binary format.
//  * Selects the most compact encoding format per FR-012.
//  * 
//  * @param encoder The binary encoder
//  * @param value The NodeId to encode
//  * 
//  * @see OPC 10000-6 Tables 16-19 - NodeId encoding formats
//  * @see FR-012 - Compact encoding format selection
//  */
// export function nodeIdEncodeBinary(encoder: IWriter, value: NodeId): void {
//   const format = selectEncodingFormat(value);
  
//   switch (format) {
//     case NodeIdEncodingByte.TwoByte:
//       // Table 16: EncodingByte (0x00) + Identifier (Byte)
//       encoder.writeByte(NodeIdEncodingByte.TwoByte);
//       encoder.writeByte(value.identifier as number);
//       break;
      
//     case NodeIdEncodingByte.FourByte:
//       // Table 17: EncodingByte (0x01) + Namespace (Byte) + Identifier (UInt16)
//       encoder.writeByte(NodeIdEncodingByte.FourByte);
//       encoder.writeByte(value.namespace);
//       encoder.writeUInt16(value.identifier as number);
//       break;
      
//     case NodeIdEncodingByte.Numeric:
//       // Table 18: EncodingByte (0x02) + Namespace (UInt16) + Identifier (UInt32)
//       encoder.writeByte(NodeIdEncodingByte.Numeric);
//       encoder.writeUInt16(value.namespace);
//       encoder.writeUInt32(value.identifier as number);
//       break;
      
//     case NodeIdEncodingByte.String:
//       // Table 19: EncodingByte (0x03) + Namespace (UInt16) + Identifier (String)
//       encoder.writeByte(NodeIdEncodingByte.String);
//       encoder.writeUInt16(value.namespace);
//       encoder.writeString(value.identifier as string);
//       break;
      
//     case NodeIdEncodingByte.Guid:
//       // Table 19: EncodingByte (0x04) + Namespace (UInt16) + Identifier (Guid)
//       encoder.writeByte(NodeIdEncodingByte.Guid);
//       encoder.writeUInt16(value.namespace);
//       encoder.writeGuid(value.identifier as string);
//       break;
      
//     case NodeIdEncodingByte.ByteString:
//       // Table 19: EncodingByte (0x05) + Namespace (UInt16) + Identifier (ByteString)
//       encoder.writeByte(NodeIdEncodingByte.ByteString);
//       encoder.writeUInt16(value.namespace);
//       // Convert Uint8Array to Buffer if needed for encoder
//       const identifier = value.identifier;
//       const buffer = identifier instanceof Uint8Array && !(identifier instanceof Buffer)
//         ? Buffer.from(identifier)
//         : identifier as Buffer;
//       encoder.writeByteString(buffer);
//       break;
      
//     default:
//       throw new CodecError(`Unsupported NodeId encoding format: ${format}`);
//   }
// }

// /**
//  * Decode a NodeId from Binary format.
//  * Handles all six encoding formats per FR-013.
//  * 
//  * @param decoder The binary decoder
//  * @param maskBits Optional bits to mask off (used by ExpandedNodeId)
//  * @returns The decoded NodeId
//  * 
//  * @see OPC 10000-6 Tables 16-19 - NodeId encoding formats
//  * @see FR-013 - Support all six NodeId formats
//  */
// export function nodeIdDecodeBinary(decoder: IDecoder, maskBits: number = 0): NodeId {
//   let encodingByte = decoder.readByte();
  
//   // Mask off specified bits (used by ExpandedNodeId to mask bits 6-7)
//   if (maskBits !== 0) {
//     encodingByte = encodingByte & ~maskBits;
//   }
  
//   switch (encodingByte) {
//     case NodeIdEncodingByte.TwoByte: {
//       // Table 16: EncodingByte (0x00) + Identifier (Byte)
//       const identifier = decoder.readByte();
//       return new NodeId(0, identifier);
//     }
    
//     case NodeIdEncodingByte.FourByte: {
//       // Table 17: EncodingByte (0x01) + Namespace (Byte) + Identifier (UInt16)
//       const namespace = decoder.readByte();
//       const identifier = decoder.readUInt16();
//       return new NodeId(namespace, identifier);
//     }
    
//     case NodeIdEncodingByte.Numeric: {
//       // Table 18: EncodingByte (0x02) + Namespace (UInt16) + Identifier (UInt32)
//       const namespace = decoder.readUInt16();
//       const identifier = decoder.readUInt32();
//       return new NodeId(namespace, identifier);
//     }
    
//     case NodeIdEncodingByte.String: {
//       // Table 19: EncodingByte (0x03) + Namespace (UInt16) + Identifier (String)
//       const namespace = decoder.readUInt16();
//       const identifier = decoder.readString();
//       if (identifier === null) {
//         throw new CodecError('NodeId String identifier cannot be null');
//       }
//       return new NodeId(namespace, identifier);
//     }
    
//     case NodeIdEncodingByte.Guid: {
//       // Table 19: EncodingByte (0x04) + Namespace (UInt16) + Identifier (Guid)
//       const namespace = decoder.readUInt16();
//       const identifier = decoder.readGuid();
//       return new NodeId(namespace, identifier);
//     }
    
//     case NodeIdEncodingByte.ByteString: {
//       // Table 19: EncodingByte (0x05) + Namespace (UInt16) + Identifier (ByteString)
//       const namespace = decoder.readUInt16();
//       const identifier = decoder.readByteString();
//       if (identifier === null) {
//         throw new CodecError('NodeId ByteString identifier cannot be null');
//       }
//       // Convert Buffer to Uint8Array for types package
//       const uint8Array = identifier instanceof Buffer ? new Uint8Array(identifier) : identifier;
//       return new NodeId(namespace, uint8Array);
//     }
    
//     default:
//       throw new CodecError(
//         `Invalid NodeId encoding byte: 0x${encodingByte.toString(16).padStart(2, '0')}`,
//         { format: 'Binary', suggestedAction: 'Check encoded data for corruption' }
//       );
//   }
// }