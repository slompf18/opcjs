/**
 * @fileoverview Tests for FourByteNodeId format optimization (0x01)
 * @module tests/codec/optimization/nodeid-fourbyte
 * 
 * FourByteNodeId is the second most compact NodeId format:
 * - Namespace must be 0-255
 * - Identifier must be 0-65535
 * - Total size: 4 bytes (EncodingByte + Namespace + Identifier)
 * 
 * @see OPC 10000-6 Table 17 - FourByteNodeId encoding
 * @see FR-012 - Compact encoding format selection
 */

import { describe, it, expect } from 'vitest';
import { BinaryEncoder } from '../../../src/codec/binary/encoder.js';
import { BinaryDecoder } from '../../../src/codec/binary/decoder.js';
import { encodeBinary, decodeBinary, numericNodeId } from '../../../src/codec/complex/nodeid.js';

describe('NodeId Optimization - FourByteNodeId Format (0x01)', () => {
  it('should encode NodeId(ns=0, id=256) as FourByteNodeId (4 bytes)', () => {
    const encoder = new BinaryEncoder();
    const nodeId = numericNodeId(0, 256);
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    expect(buffer.length).toBe(4);
    expect(buffer[0]).toBe(0x01); // FourByteNodeId format
    expect(buffer[1]).toBe(0);    // Namespace = 0
    expect(buffer[2]).toBe(0x00); // Identifier low byte
    expect(buffer[3]).toBe(0x01); // Identifier high byte (256 = 0x0100)
  });

  it('should encode NodeId(ns=1, id=42) as FourByteNodeId (4 bytes)', () => {
    const encoder = new BinaryEncoder();
    const nodeId = numericNodeId(1, 42);
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    expect(buffer.length).toBe(4);
    expect(buffer[0]).toBe(0x01); // FourByteNodeId format
    expect(buffer[1]).toBe(1);    // Namespace = 1
    expect(buffer[2]).toBe(42);   // Identifier low byte
    expect(buffer[3]).toBe(0);    // Identifier high byte
  });

  it('should encode NodeId(ns=255, id=65535) as FourByteNodeId (4 bytes)', () => {
    const encoder = new BinaryEncoder();
    const nodeId = numericNodeId(255, 65535);
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    expect(buffer.length).toBe(4);
    expect(buffer[0]).toBe(0x01); // FourByteNodeId format
    expect(buffer[1]).toBe(255);  // Namespace = 255 (max for FourByte)
    expect(buffer[2]).toBe(0xFF); // Identifier low byte
    expect(buffer[3]).toBe(0xFF); // Identifier high byte (65535 = 0xFFFF)
  });

  it('should NOT use FourByteNodeId for NodeId(ns=256, id=100)', () => {
    const encoder = new BinaryEncoder();
    const nodeId = numericNodeId(256, 100);
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    expect(buffer.length).toBe(7); // Should use Numeric format
    expect(buffer[0]).toBe(0x02);  // NumericNodeId format
  });

  it('should NOT use FourByteNodeId for NodeId(ns=1, id=65536)', () => {
    const encoder = new BinaryEncoder();
    const nodeId = numericNodeId(1, 65536);
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    expect(buffer.length).toBe(7); // Should use Numeric format
    expect(buffer[0]).toBe(0x02);  // NumericNodeId format
  });

  it('should decode FourByteNodeId correctly', () => {
    const encoder = new BinaryEncoder();
    const original = numericNodeId(10, 5000);
    
    encodeBinary(encoder, original);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    expect(decoded.namespace).toBe(10);
    expect(decoded.identifier).toBe(5000);
    expect(decoded.identifierType).toBe(original.identifierType);
  });

  it('should round-trip boundary values for FourByteNodeId', () => {
    const testCases = [
      { ns: 0, id: 256 },      // Min id for FourByte (when ns=0)
      { ns: 1, id: 0 },        // Min id (ns > 0)
      { ns: 1, id: 255 },      // At TwoByte id boundary
      { ns: 1, id: 256 },      // Above TwoByte id boundary
      { ns: 255, id: 65535 },  // Max values for FourByte
      { ns: 100, id: 30000 },  // Mid-range values
    ];

    for (const { ns, id } of testCases) {
      const encoder = new BinaryEncoder();
      const original = numericNodeId(ns, id);
      
      encodeBinary(encoder, original);
      
      const buffer = encoder.getBuffer();
      expect(buffer.length).toBe(4); // Verify FourByteNodeId format used
      expect(buffer[0]).toBe(0x01);  // FourByteNodeId format
      
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeBinary(decoder);
      
      expect(decoded.namespace).toBe(ns);
      expect(decoded.identifier).toBe(id);
    }
  });

  it('should achieve significant size reduction vs NumericNodeId', () => {
    // FourByteNodeId: 4 bytes
    // NumericNodeId: 7 bytes
    // Size reduction: (7-4)/7 = 42.9%
    
    const encoder = new BinaryEncoder();
    const nodeId = numericNodeId(10, 5000);
    encodeBinary(encoder, nodeId);
    
    expect(encoder.getBuffer().length).toBe(4);
  });

  it('should handle namespace boundary at 255', () => {
    const encoder1 = new BinaryEncoder();
    const nodeId1 = numericNodeId(255, 100);
    encodeBinary(encoder1, nodeId1);
    
    expect(encoder1.getBuffer().length).toBe(4);
    expect(encoder1.getBuffer()[0]).toBe(0x01); // FourByte
    
    const encoder2 = new BinaryEncoder();
    const nodeId2 = numericNodeId(256, 100);
    encodeBinary(encoder2, nodeId2);
    
    expect(encoder2.getBuffer().length).toBe(7);
    expect(encoder2.getBuffer()[0]).toBe(0x02); // Numeric
  });

  it('should handle identifier boundary at 65535', () => {
    const encoder1 = new BinaryEncoder();
    const nodeId1 = numericNodeId(10, 65535);
    encodeBinary(encoder1, nodeId1);
    
    expect(encoder1.getBuffer().length).toBe(4);
    expect(encoder1.getBuffer()[0]).toBe(0x01); // FourByte
    
    const encoder2 = new BinaryEncoder();
    const nodeId2 = numericNodeId(10, 65536);
    encodeBinary(encoder2, nodeId2);
    
    expect(encoder2.getBuffer().length).toBe(7);
    expect(encoder2.getBuffer()[0]).toBe(0x02); // Numeric
  });

  it('should correctly encode little-endian UInt16 identifier', () => {
    const encoder = new BinaryEncoder();
    const nodeId = numericNodeId(1, 0x1234); // 4660 decimal
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    expect(buffer[0]).toBe(0x01);   // Format
    expect(buffer[1]).toBe(1);      // Namespace
    expect(buffer[2]).toBe(0x34);   // Low byte (little-endian)
    expect(buffer[3]).toBe(0x12);   // High byte
  });
});
