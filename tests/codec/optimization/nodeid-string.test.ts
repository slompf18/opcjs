/**
 * @fileoverview Tests for StringNodeId format (0x03)
 * @module tests/codec/optimization/nodeid-string
 * 
 * StringNodeId is used when the identifier is a string:
 * - Format: 0x03 + Namespace(UInt16) + Identifier(String)
 * - String is encoded with Int32 length prefix + UTF-8 bytes
 * - Size varies based on string length
 * 
 * @see OPC 10000-6 Table 19 - StringNodeId encoding
 * @see FR-013 - Support all six NodeId formats
 */

import { describe, it, expect } from 'vitest';
import { BinaryEncoder } from '../../../src/codec/binary/encoder.js';
import { BinaryDecoder } from '../../../src/codec/binary/decoder.js';
import { encodeBinary, decodeBinary, stringNodeId } from '../../../src/codec/complex/nodeid.js';

describe('NodeId Optimization - StringNodeId Format (0x03)', () => {
  it('should encode StringNodeId with short string', () => {
    const encoder = new BinaryEncoder();
    const nodeId = stringNodeId(1, 'Temperature');
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    expect(buffer[0]).toBe(0x03); // StringNodeId format
    // Namespace (UInt16): bytes 1-2
    expect(buffer[1]).toBe(1);
    expect(buffer[2]).toBe(0);
    // String length (Int32): bytes 3-6
    expect(buffer[3]).toBe(11); // 'Temperature' is 11 bytes
    // String data starts at byte 7
  });

  it('should encode StringNodeId in namespace 0', () => {
    const encoder = new BinaryEncoder();
    const nodeId = stringNodeId(0, 'Server');
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    expect(buffer[0]).toBe(0x03); // StringNodeId format
    expect(buffer[1]).toBe(0);    // Namespace = 0
    expect(buffer[2]).toBe(0);
  });

  it('should decode StringNodeId correctly', () => {
    const encoder = new BinaryEncoder();
    const original = stringNodeId(2, 'MyCustomNode');
    
    encodeBinary(encoder, original);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    expect(decoded.namespace).toBe(2);
    expect(decoded.identifier).toBe('MyCustomNode');
    expect(decoded.identifierType).toBe(original.identifierType);
  });

  it('should handle empty string identifier', () => {
    const encoder = new BinaryEncoder();
    const nodeId = stringNodeId(1, '');
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    expect(buffer[0]).toBe(0x03);
    // String length should be 0
    expect(buffer[3]).toBe(0);
    expect(buffer[4]).toBe(0);
    expect(buffer[5]).toBe(0);
    expect(buffer[6]).toBe(0);
    
    const decoder = new BinaryDecoder(buffer);
    const decoded = decodeBinary(decoder);
    expect(decoded.identifier).toBe('');
  });

  it('should handle long string identifiers', () => {
    const encoder = new BinaryEncoder();
    const longString = 'A'.repeat(1000);
    const nodeId = stringNodeId(10, longString);
    
    encodeBinary(encoder, nodeId);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    expect(decoded.namespace).toBe(10);
    expect(decoded.identifier).toBe(longString);
  });

  it('should handle Unicode characters in string identifier', () => {
    const encoder = new BinaryEncoder();
    const nodeId = stringNodeId(5, '温度センサー'); // Temperature sensor in Japanese
    
    encodeBinary(encoder, nodeId);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    expect(decoded.namespace).toBe(5);
    expect(decoded.identifier).toBe('温度センサー');
  });

  it('should handle special characters in string identifier', () => {
    const encoder = new BinaryEncoder();
    const nodeId = stringNodeId(3, 'Node/With.Special-Chars_123');
    
    encodeBinary(encoder, nodeId);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    expect(decoded.identifier).toBe('Node/With.Special-Chars_123');
  });

  it('should round-trip various string identifiers', () => {
    const testCases = [
      { ns: 0, id: 'Objects' },
      { ns: 1, id: 'Device.Temperature' },
      { ns: 100, id: 'urn:example:sensor:12345' },
      { ns: 5, id: 'Node with spaces' },
      { ns: 10, id: '123-456-789' },
    ];

    for (const { ns, id } of testCases) {
      const encoder = new BinaryEncoder();
      const original = stringNodeId(ns, id);
      
      encodeBinary(encoder, original);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x03); // Verify StringNodeId format
      
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeBinary(decoder);
      
      expect(decoded.namespace).toBe(ns);
      expect(decoded.identifier).toBe(id);
    }
  });

  it('should encode namespace as UInt16', () => {
    const encoder = new BinaryEncoder();
    const nodeId = stringNodeId(30000, 'Test');
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    expect(buffer[0]).toBe(0x03);
    // 30000 = 0x7530 in hex (little-endian: 0x30, 0x75)
    expect(buffer[1]).toBe(0x30);
    expect(buffer[2]).toBe(0x75);
  });

  it('should handle maximum namespace value for StringNodeId', () => {
    const encoder = new BinaryEncoder();
    const maxUInt16 = 65535;
    const nodeId = stringNodeId(maxUInt16, 'MaxNs');
    
    encodeBinary(encoder, nodeId);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    expect(decoded.namespace).toBe(maxUInt16);
    expect(decoded.identifier).toBe('MaxNs');
  });

  it('should encode UTF-8 correctly', () => {
    const encoder = new BinaryEncoder();
    const nodeId = stringNodeId(1, 'café'); // Contains UTF-8 character
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    expect(buffer[0]).toBe(0x03);
    
    // 'café' in UTF-8 is 5 bytes: c(0x63) a(0x61) f(0x66) é(0xC3,0xA9)
    const stringLength = buffer.readInt32LE(3);
    expect(stringLength).toBe(5);
    
    const decoder = new BinaryDecoder(buffer);
    const decoded = decodeBinary(decoder);
    expect(decoded.identifier).toBe('café');
  });

  it('should calculate correct size for variable-length string', () => {
    const testStrings = ['a', 'abc', 'test string', 'X'.repeat(100)];
    
    for (const str of testStrings) {
      const encoder = new BinaryEncoder();
      const nodeId = stringNodeId(1, str);
      
      encodeBinary(encoder, nodeId);
      
      const buffer = encoder.getBuffer();
      // Expected size: 1 (format) + 2 (namespace) + 4 (string length) + str.length (UTF-8 bytes)
      const expectedSize = 1 + 2 + 4 + Buffer.byteLength(str, 'utf-8');
      expect(buffer.length).toBe(expectedSize);
    }
  });
});
