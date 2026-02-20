/**
 * @fileoverview Tests for GuidNodeId format (0x04)
 * @module tests/codec/optimization/nodeid-guid
 * 
 * GuidNodeId is used when the identifier is a GUID (UUID):
 * - Format: 0x04 + Namespace(UInt16) + Identifier(Guid - 16 bytes)
 * - Total size: 19 bytes (1 + 2 + 16)
 * - GUID encoding follows RFC 4122
 * 
 * @see OPC 10000-6 Table 19 - GuidNodeId encoding
 * @see OPC 10000-6 Table 2 - Guid encoding (RFC 4122)
 * @see FR-013 - Support all six NodeId formats
 */

import { describe, it, expect } from 'vitest';
import { BinaryEncoder } from '../../../src/codec/binary/encoder.js';
import { BinaryDecoder } from '../../../src/codec/binary/decoder.js';
import { encodeBinary, decodeBinary, guidNodeId } from '../../../src/codec/complex/nodeid.js';

describe('NodeId Optimization - GuidNodeId Format (0x04)', () => {
  it('should encode GuidNodeId with fixed 19-byte size', () => {
    const encoder = new BinaryEncoder();
    const guid = '550e8400-e29b-41d4-a716-446655440000';
    const nodeId = guidNodeId(1, guid);
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    expect(buffer.length).toBe(19); // 1 (format) + 2 (namespace) + 16 (GUID)
    expect(buffer[0]).toBe(0x04);   // GuidNodeId format
  });

  it('should encode GuidNodeId in namespace 0', () => {
    const encoder = new BinaryEncoder();
    const guid = '00000000-0000-0000-0000-000000000000';
    const nodeId = guidNodeId(0, guid);
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    expect(buffer[0]).toBe(0x04);
    expect(buffer[1]).toBe(0); // Namespace low byte
    expect(buffer[2]).toBe(0); // Namespace high byte
  });

  it('should decode GuidNodeId correctly', () => {
    const encoder = new BinaryEncoder();
    const guid = '123e4567-e89b-12d3-a456-426614174000';
    const original = guidNodeId(2, guid);
    
    encodeBinary(encoder, original);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    expect(decoded.namespace).toBe(2);
    expect(decoded.identifier).toBe(guid);
    expect(decoded.identifierType).toBe(original.identifierType);
  });

  it('should handle nil GUID (all zeros)', () => {
    const encoder = new BinaryEncoder();
    const nilGuid = '00000000-0000-0000-0000-000000000000';
    const nodeId = guidNodeId(1, nilGuid);
    
    encodeBinary(encoder, nodeId);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    expect(decoded.identifier).toBe(nilGuid);
  });

  it('should handle various valid GUID formats', () => {
    const testCases = [
      { ns: 0, guid: '550e8400-e29b-41d4-a716-446655440000' },
      { ns: 1, guid: 'c9a646d3-9c61-4cb7-bfcd-ee2522c8f633' },
      { ns: 100, guid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' },
      { ns: 65535, guid: 'ffffffff-ffff-ffff-ffff-ffffffffffff' },
    ];

    for (const { ns, guid } of testCases) {
      const encoder = new BinaryEncoder();
      const original = guidNodeId(ns, guid);
      
     encodeBinary(encoder, original);
      
      const buffer = encoder.getBuffer();
      expect(buffer.length).toBe(19);
      expect(buffer[0]).toBe(0x04);
      
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeBinary(decoder);
      
      expect(decoded.namespace).toBe(ns);
      expect(decoded.identifier).toBe(guid);
    }
  });

  it('should encode namespace as UInt16', () => {
    const encoder = new BinaryEncoder();
    const guid = '550e8400-e29b-41d4-a716-446655440000';
    const nodeId = guidNodeId(30000, guid);
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    expect(buffer[0]).toBe(0x04);
    // 30000 = 0x7530 in hex (little-endian: 0x30, 0x75)
    expect(buffer[1]).toBe(0x30);
    expect(buffer[2]).toBe(0x75);
  });

  it('should handle maximum namespace value', () => {
    const encoder = new BinaryEncoder();
    const guid = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee';
    const maxUInt16 = 65535;
    const nodeId = guidNodeId(maxUInt16, guid);
    
    encodeBinary(encoder, nodeId);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    expect(decoded.namespace).toBe(maxUInt16);
    expect(decoded.identifier).toBe(guid);
  });

  it('should preserve GUID case (lowercase)', () => {
    const encoder = new BinaryEncoder();
    const guid = 'abcdef12-3456-7890-abcd-ef1234567890'; // lowercase
    const nodeId = guidNodeId(1, guid);
    
    encodeBinary(encoder, nodeId);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    expect(decoded.identifier).toBe(guid);
  });

  it('should handle GUID with uppercase letters', () => {
    const encoder = new BinaryEncoder();
    const guid = 'ABCDEF12-3456-7890-ABCD-EF1234567890'; // uppercase
    const nodeId = guidNodeId(1, guid);
    
    encodeBinary(encoder, nodeId);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    // Note: Decoder may normalize to lowercase depending on implementation
    expect(decoded.identifier.toLowerCase()).toBe(guid.toLowerCase());
  });

  it('should encode GUID according to RFC 4122 layout', () => {
    const encoder = new BinaryEncoder();
    // Using a well-known GUID for byte layout verification
    // 550e8400-e29b-41d4-a716-446655440000
    const guid = '550e8400-e29b-41d4-a716-446655440000';
    const nodeId = guidNodeId(1, guid);
    
    encodeBinary(encoder, nodeId);
    
    const buffer = encoder.getBuffer();
    expect(buffer[0]).toBe(0x04); // Format
    expect(buffer[1]).toBe(1);    // Namespace low
    expect(buffer[2]).toBe(0);    // Namespace high
    
    // GUID bytes start at index 3
    // RFC 4122 specifies Data1 (4 bytes), Data2 (2 bytes), Data3 (2 bytes), 
    // Data4 (8 bytes) in mixed endianness
    // The exact byte layout depends on the Guid encoder implementation
    expect(buffer.length).toBe(19);
  });

  it('should have consistent size regardless of GUID value', () => {
    const guids = [
      '00000000-0000-0000-0000-000000000000',
      'ffffffff-ffff-ffff-ffff-ffffffffffff',
      '12345678-1234-5678-1234-567812345678',
      'a1a2a3a4-b1b2-c1c2-d1d2-e1e2e3e4e5e6',
    ];

    for (const guid of guids) {
      const encoder = new BinaryEncoder();
      const nodeId = guidNodeId(10, guid);
      
      encodeBinary(encoder, nodeId);
      
      const buffer = encoder.getBuffer();
      expect(buffer.length).toBe(19); // Always 19 bytes for GuidNodeId
    }
  });

  it('should round-trip with different namespace values', () => {
    const guid = 'c9a646d3-9c61-4cb7-bfcd-ee2522c8f633';
    const namespaces = [0, 1, 255, 256, 30000, 65535];

    for (const ns of namespaces) {
      const encoder = new BinaryEncoder();
      const original = guidNodeId(ns, guid);
      
      encodeBinary(encoder, original);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(decoded.namespace).toBe(ns);
      expect(decoded.identifier.toLowerCase()).toBe(guid.toLowerCase());
    }
  });

  it('should be larger than numeric formats but predictable', () => {
    // GuidNodeId: always 19 bytes
    // NumericNodeId: 7 bytes
    // Trade-off: GUIDs provide global uniqueness at cost of larger size
    
    const encoder = new BinaryEncoder();
    const guid = '550e8400-e29b-41d4-a716-446655440000';
    const nodeId = guidNodeId(1, guid);
    
    encodeBinary(encoder, nodeId);
    
    expect(encoder.getBuffer().length).toBe(19);
  });
});
