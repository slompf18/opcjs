/**
 * @fileoverview Tests for ByteStringNodeId format (0x05)
 * @module tests/codec/optimization/nodeid-bytestring
 * 
 * ByteStringNodeId is used when the identifier is opaque binary data:
 * - Format: 0x05 + Namespace(UInt16) + Identifier(ByteString)
 * - ByteString encoded with Int32 length prefix + raw bytes
 * - Size varies based on byte array length
 * 
 * @see OPC 10000-6 Table 19 - ByteStringNodeId encoding
 * @see FR-013 - Support all six NodeId formats
 */

import { describe, it, expect } from 'vitest';
import { BinaryEncoder } from '../../../src/codec/binary/encoder.js';
import { BinaryDecoder } from '../../../src/codec/binary/decoder.js';
import { encodeBinary, decodeBinary, byteStringNodeId } from '../../../src/codec/complex/nodeid.js';

describe('NodeId Optimization - ByteStringNodeId Format (0x05)', () => {
  it('should encode ByteStringNodeId with short byte array', () => {
    const encoder = new BinaryEncoder();
    const bytes = new Uint8Array([0x01, 0x02, 0x03, 0x04]);
    const nodeId = byteStringNodeId(1, bytes);
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    expect(buffer[0]).toBe(0x05); // ByteStringNodeId format
    // Expected: 1 (format) + 2 (namespace) + 4 (length) + 4 (bytes) = 11 bytes
    expect(buffer.length).toBe(11);
  });

  it('should encode ByteStringNodeId in namespace 0', () => {
    const encoder = new BinaryEncoder();
    const bytes = new Uint8Array([0xFF, 0xAA]);
    const nodeId = byteStringNodeId(0, bytes);
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    expect(buffer[0]).toBe(0x05);
    expect(buffer[1]).toBe(0); // Namespace low byte
    expect(buffer[2]).toBe(0); // Namespace high byte
  });

  it('should decode ByteStringNodeId correctly', () => {
    const encoder = new BinaryEncoder();
    const originalBytes = new Uint8Array([0x10, 0x20, 0x30, 0x40, 0x50]);
    const original = byteStringNodeId(2, originalBytes);
    
    encodeBinary(encoder, original);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    expect(decoded.namespace).toBe(2);
    expect(decoded.identifier).toBeInstanceOf(Uint8Array);
    expect(Array.from(decoded.identifier as Uint8Array)).toEqual(Array.from(originalBytes));
    expect(decoded.identifierType).toBe(original.identifierType);
  });

  it('should handle empty byte array', () => {
    const encoder = new BinaryEncoder();
    const bytes = new Uint8Array([]);
    const nodeId = byteStringNodeId(1, bytes);
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    expect(buffer[0]).toBe(0x05);
    // Length should be 0 (Int32: 4 bytes of zeros)
    // Expected: 1 (format) + 2 (namespace) + 4 (length=0) = 7 bytes
    expect(buffer.length).toBe(7);
    
    const decoder = new BinaryDecoder(buffer);
    const decoded = decodeBinary(decoder);
    expect((decoded.identifier as Uint8Array).length).toBe(0);
  });

  it('should handle single-byte array', () => {
    const encoder = new BinaryEncoder();
    const bytes = new Uint8Array([0x42]);
    const nodeId = byteStringNodeId(1, bytes);
    
    encodeBinary(encoder, nodeId);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    expect(Array.from(decoded.identifier as Uint8Array)).toEqual([0x42]);
  });

  it('should handle large byte arrays', () => {
    const encoder = new BinaryEncoder();
    const bytes = new Uint8Array(1000);
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = i % 256;
    }
    const nodeId = byteStringNodeId(10, bytes);
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    // Expected: 1 (format) + 2 (namespace) + 4 (length) + 1000 (bytes) = 1007 bytes
    expect(buffer.length).toBe(1007);
    
    const decoder = new BinaryDecoder(buffer);
    const decoded = decodeBinary(decoder);
    
    expect((decoded.identifier as Uint8Array).length).toBe(1000);
    expect(Array.from(decoded.identifier as Uint8Array)).toEqual(Array.from(bytes));
  });

  it('should handle all byte values (0x00-0xFF)', () => {
    const encoder = new BinaryEncoder();
    const bytes = new Uint8Array(256);
    for (let i = 0; i < 256; i++) {
      bytes[i] = i;
    }
    const nodeId = byteStringNodeId(5, bytes);
    
    encodeBinary(encoder, nodeId);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    expect(Array.from(decoded.identifier as Uint8Array)).toEqual(Array.from(bytes));
  });

  it('should round-trip various byte arrays', () => {
    const testCases = [
      { ns: 0, bytes: new Uint8Array([0x00]) },
      { ns: 1, bytes: new Uint8Array([0xFF]) },
      { ns: 10, bytes: new Uint8Array([0x01, 0x02, 0x03]) },
      { ns: 100, bytes: new Uint8Array([0xDE, 0xAD, 0xBE, 0xEF]) },
      { ns: 65535, bytes: new Uint8Array([0xCA, 0xFE, 0xBA, 0xBE]) },
    ];

    for (const { ns, bytes } of testCases) {
      const encoder = new BinaryEncoder();
      const original = byteStringNodeId(ns, bytes);
      
      encodeBinary(encoder, original);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x05); // Verify ByteStringNodeId format
      
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeBinary(decoder);
      
      expect(decoded.namespace).toBe(ns);
      expect(Array.from(decoded.identifier as Uint8Array)).toEqual(Array.from(bytes));
    }
  });

  it('should encode namespace as UInt16', () => {
    const encoder = new BinaryEncoder();
    const bytes = new Uint8Array([0x12, 0x34]);
    const nodeId = byteStringNodeId(30000, bytes);
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    expect(buffer[0]).toBe(0x05);
    // 30000 = 0x7530 in hex (little-endian: 0x30, 0x75)
    expect(buffer[1]).toBe(0x30);
    expect(buffer[2]).toBe(0x75);
  });

  it('should handle maximum namespace value', () => {
    const encoder = new BinaryEncoder();
    const bytes = new Uint8Array([0xAB, 0xCD]);
    const maxUInt16 = 65535;
    const nodeId = byteStringNodeId(maxUInt16, bytes);
    
    encodeBinary(encoder, nodeId);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    expect(decoded.namespace).toBe(maxUInt16);
  });

  it('should encode length prefix as Int32', () => {
    const encoder = new BinaryEncoder();
    const bytes = new Uint8Array([0x01, 0x02, 0x03]);
    const nodeId = byteStringNodeId(1, bytes);
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    // Length is at bytes 3-6 (after format byte and namespace UInt16)
    const length = buffer.readInt32LE(3);
    expect(length).toBe(3);
  });

  it('should calculate correct size for variable-length byte arrays', () => {
    const testSizes = [0, 1, 10, 100, 1000];
    
    for (const size of testSizes) {
      const encoder = new BinaryEncoder();
      const bytes = new Uint8Array(size);
      const nodeId = byteStringNodeId(1, bytes);
      
      encodeBinary(encoder, nodeId);
      
      const buffer = encoder.getBuffer();
      // Expected size: 1 (format) + 2 (namespace) + 4 (length) + size (bytes)
      const expectedSize = 1 + 2 + 4 + size;
      expect(buffer.length).toBe(expectedSize);
    }
  });

  it('should preserve binary data integrity', () => {
    // Test with binary data that might contain string terminators, etc.
    const encoder = new BinaryEncoder();
    const bytes = new Uint8Array([0x00, 0x00, 0xFF, 0xFF, 0x00, 0x01, 0x02, 0x00]);
    const nodeId = byteStringNodeId(1, bytes);
    
    encodeBinary(encoder, nodeId);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    const decodedBytes = Array.from(decoded.identifier as Uint8Array);
    expect(decodedBytes).toEqual([0x00, 0x00, 0xFF, 0xFF, 0x00, 0x01, 0x02, 0x00]);
  });

  it('should use ByteStringNodeId for opaque identifiers', () => {
    // ByteStringNodeId is useful for:
    // - Binary certificates
    // - Cryptographic keys
    // - Opaque vendor-specific identifiers
    // - Binary hash values
    
    const encoder = new BinaryEncoder();
    // Simulating a SHA-256 hash (32 bytes)
    const hash = new Uint8Array(32);
    for (let i = 0; i < 32; i++) {
      hash[i] = Math.floor(Math.random() * 256);
    }
    const nodeId = byteStringNodeId(100, hash);
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    expect(buffer[0]).toBe(0x05);
    // Expected: 1 + 2 + 4 + 32 = 39 bytes
    expect(buffer.length).toBe(39);
    
    const decoder = new BinaryDecoder(buffer);
    const decoded = decodeBinary(decoder);
    expect((decoded.identifier as Uint8Array).length).toBe(32);
  });

  it('should handle Buffer type as input', () => {
    const encoder = new BinaryEncoder();
    const buffer = Buffer.from([0x10, 0x20, 0x30]);
    const nodeId = byteStringNodeId(1, buffer);
    
    encodeBinary(encoder, nodeId);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    expect(Array.from(decoded.identifier as Uint8Array)).toEqual([0x10, 0x20, 0x30]);
  });
});
