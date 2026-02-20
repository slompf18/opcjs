/**
 * @fileoverview Tests for TwoByteNodeId format optimization (0x00)
 * @module tests/codec/optimization/nodeid-twobyte
 * 
 * TwoByteNodeId is the most compact NodeId format:
 * - Namespace must be 0
 * - Identifier must be 0-255
 * - Total size: 2 bytes (EncodingByte + Identifier)
 * 
 * @see OPC 10000-6 Table 16 - TwoByteNodeId encoding
 * @see FR-012 - Compact encoding format selection
 */

import { describe, it, expect } from 'vitest';
import { BinaryEncoder } from '../../../src/codec/binary/encoder.js';
import { BinaryDecoder } from '../../../src/codec/binary/decoder.js';
import { encodeBinary, decodeBinary, numericNodeId } from '../../../src/codec/complex/nodeid.js';

describe('NodeId Optimization - TwoByteNodeId Format (0x00)', () => {
  it('should encode NodeId(ns=0, id=0) as TwoByteNodeId (2 bytes)', () => {
    const encoder = new BinaryEncoder();
    const nodeId = numericNodeId(0, 0);
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    expect(buffer.length).toBe(2);
    expect(buffer[0]).toBe(0x00); // TwoByteNodeId format
    expect(buffer[1]).toBe(0);    // Identifier = 0
  });

  it('should encode NodeId(ns=0, id=42) as TwoByteNodeId (2 bytes)', () => {
    const encoder = new BinaryEncoder();
    const nodeId = numericNodeId(0, 42);
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    expect(buffer.length).toBe(2);
    expect(buffer[0]).toBe(0x00); // TwoByteNodeId format
    expect(buffer[1]).toBe(42);   // Identifier = 42
  });

  it('should encode NodeId(ns=0, id=255) as TwoByteNodeId (2 bytes)', () => {
    const encoder = new BinaryEncoder();
    const nodeId = numericNodeId(0, 255);
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    expect(buffer.length).toBe(2);
    expect(buffer[0]).toBe(0x00); // TwoByteNodeId format
    expect(buffer[1]).toBe(255);  // Identifier = 255 (max for TwoByte)
  });

  it('should NOT use TwoByteNodeId for NodeId(ns=0, id=256)', () => {
    const encoder = new BinaryEncoder();
    const nodeId = numericNodeId(0, 256);
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    expect(buffer.length).toBeGreaterThan(2); // Should use FourByte or Numeric
    expect(buffer[0]).not.toBe(0x00);         // NOT TwoByteNodeId
  });

  it('should NOT use TwoByteNodeId for NodeId(ns=1, id=42)', () => {
    const encoder = new BinaryEncoder();
    const nodeId = numericNodeId(1, 42);
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    expect(buffer.length).toBeGreaterThan(2); // Should use FourByte
    expect(buffer[0]).not.toBe(0x00);         // NOT TwoByteNodeId
  });

  it('should decode TwoByteNodeId correctly', () => {
    const encoder = new BinaryEncoder();
    const original = numericNodeId(0, 100);
    
    encodeBinary(encoder, original);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    expect(decoded.namespace).toBe(0);
    expect(decoded.identifier).toBe(100);
    expect(decoded.identifierType).toBe(original.identifierType);
  });

  it('should round-trip all valid TwoByteNodeId values (0-255)', () => {
    for (let id = 0; id <= 255; id++) {
      const encoder = new BinaryEncoder();
      const original = numericNodeId(0, id);
      
      encodeBinary(encoder, original);
      
      const buffer = encoder.getBuffer();
      expect(buffer.length).toBe(2); // Verify TwoByteNodeId format used
      
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeBinary(decoder);
      
      expect(decoded.namespace).toBe(0);
      expect(decoded.identifier).toBe(id);
    }
  });

  it('should achieve maximum size reduction for namespace=0, small identifiers', () => {
    // TwoByteNodeId: 2 bytes
    // NumericNodeId: 7 bytes (1 byte format + 2 bytes ns + 4 bytes id)
    // Size reduction: (7-2)/7 = 71.4%
    
    const encoder1 = new BinaryEncoder();
    const nodeId = numericNodeId(0, 42);
    encodeBinary(encoder1, nodeId);
    
    expect(encoder1.getBuffer().length).toBe(2);
    
    // Verify we're not using the larger Numeric format
    const buffer = encoder1.getBuffer();
    expect(buffer[0]).toBe(0x00); // TwoByteNodeId format
  });

  it('should handle boundary condition at id=255', () => {
    const encoder = new BinaryEncoder();
    const nodeId = numericNodeId(0, 255);
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    expect(buffer.length).toBe(2);
    expect(buffer[0]).toBe(0x00);
    expect(buffer[1]).toBe(255);
    
    const decoder = new BinaryDecoder(buffer);
    const decoded = decodeBinary(decoder);
    expect(decoded.identifier).toBe(255);
  });

  it('should handle boundary condition at id=256 (switches to FourByte)', () => {
    const encoder = new BinaryEncoder();
    const nodeId = numericNodeId(0, 256);
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    expect(buffer.length).toBe(4); // FourByteNodeId: 4 bytes
    expect(buffer[0]).toBe(0x01);  // FourByteNodeId format
  });
});
