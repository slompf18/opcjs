/**
 * @fileoverview Tests for NodeId encoding/decoding
 * @module tests/codec/complex/nodeid
 */

import { describe, it, expect } from 'vitest';
import { BinaryEncoder } from '../../../src/codec/binary/encoder.js';
import { BinaryDecoder } from '../../../src/codec/binary/decoder.js';
import { CodecFacade } from '../../../src/codec/facade.js';
import {
  NodeId,
  NodeIdType,
  encodeBinary,
  decodeBinary,
  registerNodeId,
  numericNodeId,
  stringNodeId,
  guidNodeId,
  byteStringNodeId,
} from '../../../src/codec/complex/nodeid.js';

describe('NodeId - Binary Encoding', () => {
  
  describe('TwoByteNodeId Format (0x00)', () => {
    it('should encode/decode TwoByteNodeId when namespace=0 and identifier≤255', () => {
      const encoder = new BinaryEncoder();
      const nodeId = numericNodeId(0, 42);
      
      encodeBinary(encoder, nodeId);
      
      const buffer = encoder.getBuffer();
      // Verify format: EncodingByte (0x00) + Identifier (Byte)
      expect(buffer[0]).toBe(0x00); // TwoByteNodeId format
      expect(buffer[1]).toBe(42);   // Identifier
      expect(buffer.length).toBe(2);
      
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeBinary(decoder);
      
      expect(decoded.namespace).toBe(0);
      expect(decoded.identifierType).toBe(NodeIdType.Numeric);
      expect(decoded.identifier).toBe(42);
    });
    
    it('should encode identifier 0 (null NodeId)', () => {
      const encoder = new BinaryEncoder();
      const nodeId = numericNodeId(0, 0);
      
      encodeBinary(encoder, nodeId);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x00);
      expect(buffer[1]).toBe(0);
    });
    
    it('should encode identifier 255 (max TwoByteNodeId)', () => {
      const encoder = new BinaryEncoder();
      const nodeId = numericNodeId(0, 255);
      
      encodeBinary(encoder, nodeId);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x00);
      expect(buffer[1]).toBe(255);
    });
  });
  
  describe('FourByteNodeId Format (0x01)', () => {
    it('should encode/decode FourByteNodeId when namespace≤255 and identifier≤65535', () => {
      const encoder = new BinaryEncoder();
      const nodeId = numericNodeId(2, 1234);
      
      encodeBinary(encoder, nodeId);
      
      const buffer = encoder.getBuffer();
      // Verify format: EncodingByte (0x01) + Namespace (Byte) + Identifier (UInt16)
      expect(buffer[0]).toBe(0x01);       // FourByteNodeId format
      expect(buffer[1]).toBe(2);          // Namespace
      expect(buffer.readUInt16LE(2)).toBe(1234); // Identifier (little-endian)
      expect(buffer.length).toBe(4);
      
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeBinary(decoder);
      
      expect(decoded.namespace).toBe(2);
      expect(decoded.identifierType).toBe(NodeIdType.Numeric);
      expect(decoded.identifier).toBe(1234);
    });
    
    it('should use FourByteNodeId for identifier 256 (exceeds TwoByteNodeId max)', () => {
      const encoder = new BinaryEncoder();
      const nodeId = numericNodeId(0, 256);
      
      encodeBinary(encoder, nodeId);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x01); // FourByteNodeId, not TwoByte
    });
    
    it('should encode namespace 255 (max for FourByteNodeId)', () => {
      const encoder = new BinaryEncoder();
      const nodeId = numericNodeId(255, 1000);
      
      encodeBinary(encoder, nodeId);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x01);
      expect(buffer[1]).toBe(255);
    });
    
    it('should encode identifier 65535 (max for FourByteNodeId)', () => {
      const encoder = new BinaryEncoder();
      const nodeId = numericNodeId(100, 65535);
      
      encodeBinary(encoder, nodeId);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x01);
      expect(buffer.readUInt16LE(2)).toBe(65535);
    });
  });
  
  describe('NumericNodeId Format (0x02)', () => {
    it('should encode/decode NumericNodeId for large identifiers', () => {
      const encoder = new BinaryEncoder();
      const nodeId = numericNodeId(500, 123456);
      
      encodeBinary(encoder, nodeId);
      
      const buffer = encoder.getBuffer();
      // Verify format: EncodingByte (0x02) + Namespace (UInt16) + Identifier (UInt32)
      expect(buffer[0]).toBe(0x02);              // NumericNodeId format
      expect(buffer.readUInt16LE(1)).toBe(500);  // Namespace (little-endian)
      expect(buffer.readUInt32LE(3)).toBe(123456); // Identifier (little-endian)
      expect(buffer.length).toBe(7);
      
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeBinary(decoder);
      
      expect(decoded.namespace).toBe(500);
      expect(decoded.identifierType).toBe(NodeIdType.Numeric);
      expect(decoded.identifier).toBe(123456);
    });
    
    it('should use NumericNodeId when namespace > 255', () => {
      const encoder = new BinaryEncoder();
      const nodeId = numericNodeId(256, 100);
      
      encodeBinary(encoder, nodeId);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x02); // NumericNodeId, not FourByte
      expect(buffer.readUInt16LE(1)).toBe(256);
    });
    
    it('should use NumericNodeId when identifier > 65535', () => {
      const encoder = new BinaryEncoder();
      const nodeId = numericNodeId(0, 65536);
      
      encodeBinary(encoder, nodeId);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x02); // NumericNodeId, not FourByte or TwoByte
      expect(buffer.readUInt32LE(3)).toBe(65536);
    });
    
    it('should encode UInt32.MaxValue identifier', () => {
      const encoder = new BinaryEncoder();
      const nodeId = numericNodeId(1000, 4294967295);
      
      encodeBinary(encoder, nodeId);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x02);
      expect(buffer.readUInt32LE(3)).toBe(4294967295);
      
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeBinary(decoder);
      expect(decoded.identifier).toBe(4294967295);
    });
  });
  
  describe('StringNodeId Format (0x03)', () => {
    it('should encode/decode StringNodeId', () => {
      const encoder = new BinaryEncoder();
      const nodeId = stringNodeId(2, 'MyCustomNode');
      
      encodeBinary(encoder, nodeId);
      
      const buffer = encoder.getBuffer();
      // Verify format: EncodingByte (0x03) + Namespace (UInt16) + Identifier (String)
      expect(buffer[0]).toBe(0x03);              // StringNodeId format
      expect(buffer.readUInt16LE(1)).toBe(2);    // Namespace
      expect(buffer.readInt32LE(3)).toBe(12);    // String length
      expect(buffer.toString('utf8', 7, 19)).toBe('MyCustomNode');
      
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeBinary(decoder);
      
      expect(decoded.namespace).toBe(2);
      expect(decoded.identifierType).toBe(NodeIdType.String);
      expect(decoded.identifier).toBe('MyCustomNode');
    });
    
    it('should encode empty string identifier', () => {
      const encoder = new BinaryEncoder();
      const nodeId = stringNodeId(0, '');
      
      encodeBinary(encoder, nodeId);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x03);
      expect(buffer.readInt32LE(3)).toBe(0); // Empty string length
      
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeBinary(decoder);
      expect(decoded.identifier).toBe('');
    });
    
    it('should encode UTF-8 string identifier', () => {
      const encoder = new BinaryEncoder();
      const nodeId = stringNodeId(1, 'Temperature°C');
      
      encodeBinary(encoder, nodeId);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      expect(decoded.identifier).toBe('Temperature°C');
    });
  });
  
  describe('GuidNodeId Format (0x04)', () => {
    it('should encode/decode GuidNodeId', () => {
      const encoder = new BinaryEncoder();
      const guid = '550e8400-e29b-41d4-a716-446655440000';
      const nodeId = guidNodeId(3, guid);
      
      encodeBinary(encoder, nodeId);
      
      const buffer = encoder.getBuffer();
      // Verify format: EncodingByte (0x04) + Namespace (UInt16) + Identifier (Guid, 16 bytes)
      expect(buffer[0]).toBe(0x04);              // GuidNodeId format
      expect(buffer.readUInt16LE(1)).toBe(3);    // Namespace
      expect(buffer.length).toBe(19); // 1 + 2 + 16
      
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeBinary(decoder);
      
      expect(decoded.namespace).toBe(3);
      expect(decoded.identifierType).toBe(NodeIdType.Guid);
      expect(decoded.identifier).toBe(guid);
    });
    
    it('should encode null GUID (all zeros)', () => {
      const encoder = new BinaryEncoder();
      const guid = '00000000-0000-0000-0000-000000000000';
      const nodeId = guidNodeId(0, guid);
      
      encodeBinary(encoder, nodeId);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      expect(decoded.identifier).toBe(guid);
    });
  });
  
  describe('ByteStringNodeId Format (0x05)', () => {
    it('should encode/decode ByteStringNodeId', () => {
      const encoder = new BinaryEncoder();
      const bytes = Buffer.from([0x01, 0x02, 0x03, 0x04, 0xff, 0xfe]);
      const nodeId = byteStringNodeId(5, bytes);
      
      encodeBinary(encoder, nodeId);
      
      const buffer = encoder.getBuffer();
      // Verify format: EncodingByte (0x05) + Namespace (UInt16) + Identifier (ByteString)
      expect(buffer[0]).toBe(0x05);              // ByteStringNodeId format
      expect(buffer.readUInt16LE(1)).toBe(5);    // Namespace
      expect(buffer.readInt32LE(3)).toBe(6);     // ByteString length
      
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeBinary(decoder);
      
      expect(decoded.namespace).toBe(5);
      expect(decoded.identifierType).toBe(NodeIdType.ByteString);
      // Decoder returns Uint8Array for types package compatibility
      expect(decoded.identifier).toEqual(new Uint8Array([0x01, 0x02, 0x03, 0x04, 0xff, 0xfe]));
    });
    
    it('should encode empty ByteString identifier', () => {
      const encoder = new BinaryEncoder();
      const bytes = Buffer.from([]);
      const nodeId = byteStringNodeId(0, bytes);
      
      encodeBinary(encoder, nodeId);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      expect((decoded.identifier as Buffer).length).toBe(0);
    });
  });
  
  describe('Facade Integration', () => {
    it('should encode/decode NodeId via facade', () => {
      const facade = new CodecFacade();
      registerNodeId(facade);
      
      const nodeId = numericNodeId(2, 1234);
      const buffer = facade.encode(nodeId, 'i=17');
      const decoded = facade.decode<any>(buffer, 'i=17'); // Returns types package NodeId
      
      // Types package NodeId uses 'namespace' not 'namespaceIndex'
      expect(decoded.namespace).toBe(2);
      expect(decoded.identifierType).toBe(NodeIdType.Numeric);
      expect(decoded.identifier).toBe(1234);
    });
    
    it('should round-trip all NodeId formats via facade', () => {
      const facade = new CodecFacade();
      registerNodeId(facade);
      
      // Note: Facade returns types package NodeId (with 'namespace' property)
      // but codec NodeId has 'namespaceIndex' property, so we can't use toEqual directly
      
      // TwoByteNodeId
      const nodeId1 = numericNodeId(0, 42);
      const decoded1 = facade.decode<any>(facade.encode(nodeId1, 'i=17'), 'i=17');
      expect(decoded1.namespace).toBe(0);
      expect(decoded1.identifier).toBe(42);
      
      // FourByteNodeId
      const nodeId2 = numericNodeId(2, 1234);
      const decoded2 = facade.decode<any>(facade.encode(nodeId2, 'i=17'), 'i=17');
      expect(decoded2.namespace).toBe(2);
      expect(decoded2.identifier).toBe(1234);
      
      // NumericNodeId
      const nodeId3 = numericNodeId(500, 123456);
      const decoded3 = facade.decode<any>(facade.encode(nodeId3, 'i=17'), 'i=17');
      expect(decoded3.namespace).toBe(500);
      expect(decoded3.identifier).toBe(123456);
      
      // StringNodeId
      const nodeId4 = stringNodeId(1, 'MyNode');
      const decoded4 = facade.decode<any>(facade.encode(nodeId4, 'i=17'), 'i=17');
      expect(decoded4.namespace).toBe(1);
      expect(decoded4.identifier).toBe('MyNode');
      
      // GuidNodeId
      const nodeId5 = guidNodeId(3, '550e8400-e29b-41d4-a716-446655440000');
      const decoded5 = facade.decode<any>(facade.encode(nodeId5, 'i=17'), 'i=17');
      expect(decoded5.namespace).toBe(3);
      expect(decoded5.identifier).toBe('550e8400-e29b-41d4-a716-446655440000');
      
      // ByteStringNodeId - codec created with Buffer, types package will have Uint8Array
      const nodeId6 = byteStringNodeId(5, Buffer.from([0x01, 0x02, 0x03]));
      const decoded6 = facade.decode<any>(facade.encode(nodeId6, 'i=17'), 'i=17');
      expect(decoded6.namespace).toBe(5);
      expect(decoded6.identifier).toEqual(new Uint8Array([0x01, 0x02, 0x03]));
    });
  });
  
  describe('Error Handling', () => {
    it('should reject invalid encoding byte', () => {
      const buffer = Buffer.from([0xFF, 0x01, 0x02]); // Invalid encoding byte
      const decoder = new BinaryDecoder(buffer);
      
      expect(() => decodeBinary(decoder)).toThrow('Invalid NodeId encoding byte');
    });
    
    it('should reject null String identifier', () => {
      const encoder = new BinaryEncoder();
      encoder.writeByte(0x03);      // StringNodeId format
      encoder.writeUInt16(1);       // Namespace
      encoder.writeInt32(-1);       // Null string (length = -1)
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      expect(() => decodeBinary(decoder)).toThrow('NodeId String identifier cannot be null');
    });
    
    it('should reject null ByteString identifier', () => {
      const encoder = new BinaryEncoder();
      encoder.writeByte(0x05);      // ByteStringNodeId format
      encoder.writeUInt16(1);       // Namespace
      encoder.writeInt32(-1);       // Null ByteString (length = -1)
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      expect(() => decodeBinary(decoder)).toThrow('NodeId ByteString identifier cannot be null');
    });
  });
  
  describe('Format Selection (FR-012)', () => {
    it('should select TwoByteNodeId for namespace=0 and identifier≤255', () => {
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, numericNodeId(0, 255));
      expect(encoder.getBuffer()[0]).toBe(0x00);
    });
    
    it('should select FourByteNodeId for namespace≤255 and identifier≤65535', () => {
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, numericNodeId(255, 65535));
      expect(encoder.getBuffer()[0]).toBe(0x01);
    });
    
    it('should select NumericNodeId when namespace > 255', () => {
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, numericNodeId(256, 100));
      expect(encoder.getBuffer()[0]).toBe(0x02);
    });
    
    it('should select NumericNodeId when identifier > 65535', () => {
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, numericNodeId(100, 65536));
      expect(encoder.getBuffer()[0]).toBe(0x02);
    });
  });
});
