/**
 * @fileoverview Tests for NumericNodeId format (0x02)
 * @module tests/codec/optimization/nodeid-numeric
 * 
 * NumericNodeId is used when TwoByteNodeId or FourByteNodeId cannot be used:
 * - Namespace > 255, OR
 * - Identifier > 65535
 * - Total size: 7 bytes (EncodingByte + Namespace(UInt16) + Identifier(UInt32))
 * 
 * @see OPC 10000-6 Table 18 - NumericNodeId encoding
 * @see FR-012 - Compact encoding format selection
 */

import { describe, it, expect } from 'vitest';
import { BinaryEncoder } from '../../../src/codec/binary/encoder.js';
import { BinaryDecoder } from '../../../src/codec/binary/decoder.js';
import { encodeBinary, decodeBinary, numericNodeId } from '../../../src/codec/complex/nodeid.js';

describe('NodeId Optimization - NumericNodeId Format (0x02)', () => {
  it('should encode NodeId(ns=256, id=100) as NumericNodeId (7 bytes)', () => {
    const encoder = new BinaryEncoder();
    const nodeId = numericNodeId(256, 100);
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    expect(buffer.length).toBe(7);
    expect(buffer[0]).toBe(0x02); // NumericNodeId format
  });

  it('should encode NodeId(ns=1, id=65536) as NumericNodeId (7 bytes)', () => {
    const encoder = new BinaryEncoder();
    const nodeId = numericNodeId(1, 65536);
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    expect(buffer.length).toBe(7);
    expect(buffer[0]).toBe(0x02); // NumericNodeId format
  });

  it('should encode NodeId(ns=1000, id=1000000) as NumericNodeId', () => {
    const encoder = new BinaryEncoder();
    const nodeId = numericNodeId(1000, 1000000);
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    expect(buffer.length).toBe(7);
    expect(buffer[0]).toBe(0x02);
  });

  it('should encode large namespace and identifier', () => {
    const encoder = new BinaryEncoder();
    const nodeId = numericNodeId(30000, 4000000000);
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    expect(buffer.length).toBe(7);
    expect(buffer[0]).toBe(0x02);
  });

  it('should decode NumericNodeId correctly', () => {
    const encoder = new BinaryEncoder();
    const original = numericNodeId(500, 100000);
    
    encodeBinary(encoder, original);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    expect(decoded.namespace).toBe(500);
    expect(decoded.identifier).toBe(100000);
    expect(decoded.identifierType).toBe(original.identifierType);
  });

  it('should round-trip boundary values for NumericNodeId', () => {
    const testCases = [
      { ns: 256, id: 0 },          // Min namespace for Numeric
      { ns: 0, id: 65536 },        // Min identifier for Numeric (when ns allows FourByte)
      { ns: 65535, id: 4294967295 }, // Max values (UInt16 max ns, UInt32 max id)
      { ns: 1000, id: 1000000 },   // Mid-range values
    ];

    for (const { ns, id } of testCases) {
      const encoder = new BinaryEncoder();
      const original = numericNodeId(ns, id);
      
      encodeBinary(encoder, original);
      
      const buffer = encoder.getBuffer();
      expect(buffer.length).toBe(7);
      expect(buffer[0]).toBe(0x02);
      
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeBinary(decoder);
      
      expect(decoded.namespace).toBe(ns);
      expect(decoded.identifier).toBe(id);
    }
  });

  it('should handle maximum UInt32 identifier value', () => {
    const encoder = new BinaryEncoder();
    const maxUInt32 = 4294967295; // 2^32 - 1
    const nodeId = numericNodeId(300, maxUInt32);
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    expect(buffer.length).toBe(7);
    
    const decoder = new BinaryDecoder(buffer);
    const decoded = decodeBinary(decoder);
    
    expect(decoded.identifier).toBe(maxUInt32);
  });

  it('should handle maximum UInt16 namespace value', () => {
    const encoder = new BinaryEncoder();
    const maxUInt16 = 65535; // 2^16 - 1
    const nodeId = numericNodeId(maxUInt16, 100000);
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    expect(buffer.length).toBe(7);
    
    const decoder = new BinaryDecoder(buffer);
    const decoded = decodeBinary(decoder);
    
    expect(decoded.namespace).toBe(maxUInt16);
  });

  it('should correctly encode little-endian layout', () => {
    const encoder = new BinaryEncoder();
    const nodeId = numericNodeId(0x0201, 0x06050403); // Namespace: 513, Id: 101124099
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    expect(buffer[0]).toBe(0x02);   // Format
    // Namespace (UInt16 little-endian)
    expect(buffer[1]).toBe(0x01);   // Low byte of namespace
    expect(buffer[2]).toBe(0x02);   // High byte of namespace
    // Identifier (UInt32 little-endian)
    expect(buffer[3]).toBe(0x03);   // Byte 0 of identifier
    expect(buffer[4]).toBe(0x04);   // Byte 1 of identifier
    expect(buffer[5]).toBe(0x05);   // Byte 2 of identifier
    expect(buffer[6]).toBe(0x06);   // Byte 3 of identifier
  });

  it('should be used as fallback when compact formats cannot be applied', () => {
    // NumericNodeId is the "default" numeric format when optimization isn't possible
    
    const testCases = [
      { ns: 0, id: 65536, reason: 'identifier too large for FourByte' },
      { ns: 256, id: 10, reason: 'namespace too large for FourByte' },
      { ns: 1000, id: 100000, reason: 'both values exceed compact formats' },
    ];

    for (const { ns, id, reason } of testCases) {
      const encoder = new BinaryEncoder();
      const nodeId = numericNodeId(ns, id);
      
      encodeBinary(encoder, nodeId);
      
      const buffer = encoder.getBuffer();
      expect(buffer.length).toBe(7); // NumericNodeId is 7 bytes
      expect(buffer[0]).toBe(0x02);  // NumericNodeId format
    }
  });

  it('should verify format selection hierarchy', () => {
    // This test demonstrates the format selection logic:
    // TwoByte (2 bytes) if ns=0 AND id≤255
    // FourByte (4 bytes) if ns≤255 AND id≤65535
    // Numeric (7 bytes) otherwise
    
    const twoByte = numericNodeId(0, 42);
    const fourByte = numericNodeId(10, 1000);
    const numeric = numericNodeId(300, 1000);
    
    const enc1 = new BinaryEncoder();
    encodeBinary(enc1, twoByte);
    expect(enc1.getBuffer().length).toBe(2);
    
    const enc2 = new BinaryEncoder();
    encodeBinary(enc2, fourByte);
    expect(enc2.getBuffer().length).toBe(4);
    
    const enc3 = new BinaryEncoder();
    encodeBinary(enc3, numeric);
    expect(enc3.getBuffer().length).toBe(7);
  });
});
