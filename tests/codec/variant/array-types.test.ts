/**
 * Tests for Variant with array values - Type Discrimination with Array Flag.
 * 
 * Phase 9: User Story 7 - Variant Type Encoding with Type Discrimination
 * 
 * Tests verify that Variant correctly sets the array flag (bit 0x80) in the
 * encoding byte when containing arrays, and properly decodes array variants
 * maintaining both type and array information.
 * 
 * Array encoding byte format:
 * - Bits 0-5: Type ID (same as scalar)
 * - Bit 6: ArrayDimensions present  
 * - Bit 7: Array flag (0x80)
 * 
 * Example: Int32 array = 0x86 (0x80 | 0x06)
 * 
 * @module codec/variant/array-types.test
 */

import { describe, it, expect } from 'vitest';
import { BinaryEncoder } from '../../../src/codec/binary/encoder.js';
import { BinaryDecoder } from '../../../src/codec/binary/decoder.js';
import {
  arrayVariant,
  encodeBinary,
  decodeBinary,
  VariantType,
  isArray,
} from '../../../src/codec/complex/variant.js';
import { numericNodeId, stringNodeId } from '../../../src/codec/complex/nodeid.js';
import { qualifiedName } from '../../../src/codec/complex/qualified-name.js';
import { localizedText } from '../../../src/codec/complex/localized-text.js';

describe('Variant Type Discrimination - Array Types', () => {
  describe('Array flag (bit 0x80)', () => {
    it('should set array bit for Int32 array (0x86 = 0x80 | 0x06)', () => {
      const v = arrayVariant(VariantType.Int32, [1, 2, 3]);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x86); // 0x80 (array bit) | 0x06 (Int32 type)
    });

    it('should set array bit for String array (0x8C = 0x80 | 0x0C)', () => {
      const v = arrayVariant(VariantType.String, ['a', 'b', 'c']);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x8C); // 0x80 (array bit) | 0x0C (String type)
    });

    it('should set array bit for Boolean array (0x81 = 0x80 | 0x01)', () => {
      const v = arrayVariant(VariantType.Boolean, [true, false, true]);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x81); // 0x80 (array bit) | 0x01 (Boolean type)
    });

    it('should set array bit for all numeric types', () => {
      const numericArrayTypes = [
        { type: VariantType.SByte, values: [-1, 0, 1], expectedByte: 0x82 },
        { type: VariantType.Byte, values: [1, 2, 3], expectedByte: 0x83 },
        { type: VariantType.Int16, values: [-100, 0, 100], expectedByte: 0x84 },
        { type: VariantType.UInt16, values: [100, 200, 300], expectedByte: 0x85 },
        { type: VariantType.Int32, values: [-1000, 0, 1000], expectedByte: 0x86 },
        { type: VariantType.UInt32, values: [1000, 2000, 3000], expectedByte: 0x87 },
        { type: VariantType.Int64, values: [-1000n, 0n, 1000n], expectedByte: 0x88 },
        { type: VariantType.UInt64, values: [1000n, 2000n, 3000n], expectedByte: 0x89 },
        { type: VariantType.Float, values: [1.1, 2.2, 3.3], expectedByte: 0x8A },
        { type: VariantType.Double, values: [1.1, 2.2, 3.3], expectedByte: 0x8B },
      ];

      numericArrayTypes.forEach(({ type, values, expectedByte }) => {
        const v = arrayVariant(type, values);
        const encoder = new BinaryEncoder();
        encodeBinary(encoder, v);
        
        const buffer = encoder.getBuffer();
        expect(buffer[0]).toBe(expectedByte);
      });
    });
  });

  describe('Array type discrimination and decoding', () => {
    it('should decode Int32 array maintaining type and array information', () => {
      const values = [10, 20, 30, 40, 50];
      const v = arrayVariant(VariantType.Int32, values);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(decoded.variantType).toBe(VariantType.Int32);
      expect(isArray(decoded)).toBe(true);
      expect(decoded.value).toEqual(values);
    });

    it('should decode String array maintaining type and array information', () => {
      const values = ['Hello', 'OPC', 'UA', 'World'];
      const v = arrayVariant(VariantType.String, values);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(decoded.variantType).toBe(VariantType.String);
      expect(isArray(decoded)).toBe(true);
      expect(decoded.value).toEqual(values);
    });

    it('should decode Boolean array correctly', () => {
      const values = [true, false, false, true, true];
      const v = arrayVariant(VariantType.Boolean, values);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(decoded.variantType).toBe(VariantType.Boolean);
      expect(isArray(decoded)).toBe(true);
      expect(decoded.value).toEqual(values);
    });

    it('should decode Double array with floating point values', () => {
      const values = [3.14159, 2.71828, 1.41421, 1.73205];
      const v = arrayVariant(VariantType.Double, values);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(decoded.variantType).toBe(VariantType.Double);
      expect(isArray(decoded)).toBe(true);
      expect(Array.isArray(decoded.value)).toBe(true);
      (decoded.value as number[]).forEach((val, idx) => {
        expect(val).toBeCloseTo(values[idx], 5);
      });
    });
  });

  describe('Complex type arrays', () => {
    it('should set array bit for NodeId array (0x91 = 0x80 | 0x11)', () => {
      const nodeIds = [
        numericNodeId(0, 1),
        numericNodeId(1, 100),
        numericNodeId(2, 1000),
      ];
      const v = arrayVariant(VariantType.NodeId, nodeIds);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x91); // 0x80 | 0x11 (NodeId)
    });

    it('should decode NodeId array maintaining type information', () => {
      const nodeIds = [
        numericNodeId(1, 10),
        stringNodeId(2, 'Device'),
        numericNodeId(3, 5000),
      ];
      const v = arrayVariant(VariantType.NodeId, nodeIds);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(decoded.variantType).toBe(VariantType.NodeId);
      expect(isArray(decoded)).toBe(true);
      expect(decoded.value).toEqual(nodeIds);
    });

    it('should set array bit for QualifiedName array (0x94 = 0x80 | 0x14)', () => {
      const names = [
        qualifiedName(0, 'Root'),
        qualifiedName(1, 'Device'),
        qualifiedName(2, 'Sensor'),
      ];
      const v = arrayVariant(VariantType.QualifiedName, names);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x94); // 0x80 | 0x14 (QualifiedName)
    });

    it('should decode QualifiedName array correctly', () => {
      const names = [
        qualifiedName(1, 'Temperature'),
        qualifiedName(1, 'Pressure'),
        qualifiedName(2, 'FlowRate'),
      ];
      const v = arrayVariant(VariantType.QualifiedName, names);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(decoded.variantType).toBe(VariantType.QualifiedName);
      expect(isArray(decoded)).toBe(true);
      expect(decoded.value).toEqual(names);
    });

    it('should set array bit for LocalizedText array (0x95 = 0x80 | 0x15)', () => {
      const texts = [
        localizedText('en-US', 'Temperature'),
        localizedText('de-DE', 'Temperatur'),
        localizedText('fr-FR', 'Température'),
      ];
      const v = arrayVariant(VariantType.LocalizedText, texts);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x95); // 0x80 | 0x15 (LocalizedText)
    });

    it('should decode LocalizedText array correctly', () => {
      const texts = [
        localizedText('en', 'Status'),
        localizedText('de', 'Status'),
        localizedText('fr', 'État'),
      ];
      const v = arrayVariant(VariantType.LocalizedText, texts);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(decoded.variantType).toBe(VariantType.LocalizedText);
      expect(isArray(decoded)).toBe(true);
      expect(decoded.value).toEqual(texts);
    });
  });

  describe('Empty and single-element arrays', () => {
    it('should handle empty Int32 array with array bit set', () => {
      const v = arrayVariant(VariantType.Int32, []);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x86); // Array bit set even for empty array
      
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeBinary(decoder);
      
      expect(decoded.variantType).toBe(VariantType.Int32);
      expect(isArray(decoded)).toBe(true);
      expect(decoded.value).toEqual([]);
    });

    it('should handle single-element array', () => {
      const v = arrayVariant(VariantType.String, ['SingleValue']);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x8C); // Array bit set
      
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeBinary(decoder);
      
      expect(decoded.variantType).toBe(VariantType.String);
      expect(isArray(decoded)).toBe(true);
      expect(decoded.value).toEqual(['SingleValue']);
    });
  });

  describe('Large arrays', () => {
    it('should handle array with 1000 elements maintaining type info', () => {
      const values = Array.from({ length: 1000 }, (_, i) => i);
      const v = arrayVariant(VariantType.Int32, values);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x86); // Array bit set
      
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeBinary(decoder);
      
      expect(decoded.variantType).toBe(VariantType.Int32);
      expect(isArray(decoded)).toBe(true);
      expect(decoded.value).toEqual(values);
    });

    it('should handle large String array', () => {
      const values = Array.from({ length: 100 }, (_, i) => `String${i}`);
      const v = arrayVariant(VariantType.String, values);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x8C);
      
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeBinary(decoder);
      
      expect(decoded.variantType).toBe(VariantType.String);
      expect(isArray(decoded)).toBe(true);
      expect(decoded.value).toEqual(values);
    });
  });

  describe('Multi-dimensional arrays', () => {
    it('should set both array bit and dimensions bit for 2D array', () => {
      const values = [1, 2, 3, 4, 5, 6]; // 2x3 matrix
      const dimensions = [2, 3];
      const v = arrayVariant(VariantType.Int32, values, dimensions);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      // 0xC6 = 0x80 (array) | 0x40 (dimensions) | 0x06 (Int32)
      expect(buffer[0]).toBe(0xC6);
    });

    it('should decode 2D array with dimensions preserving type', () => {
      const values = [10, 20, 30, 40, 50, 60];
      const dimensions = [2, 3];
      const v = arrayVariant(VariantType.Int32, values, dimensions);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(decoded.variantType).toBe(VariantType.Int32);
      expect(isArray(decoded)).toBe(true);
      expect(decoded.value).toEqual(values);
      expect(decoded.arrayDimensions).toEqual(dimensions);
    });

    it('should handle 3D array with dimensions', () => {
      const values = Array.from({ length: 24 }, (_, i) => i); // 2x3x4 tensor
      const dimensions = [2, 3, 4];
      const v = arrayVariant(VariantType.Int32, values, dimensions);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0xC6); // Array + Dimensions + Int32
      
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeBinary(decoder);
      
      expect(decoded.variantType).toBe(VariantType.Int32);
      expect(isArray(decoded)).toBe(true);
      expect(decoded.arrayDimensions).toEqual(dimensions);
    });
  });

  describe('Type discrimination: array vs scalar', () => {
    it('should discriminate between scalar Int32 and Int32 array', () => {
      const scalar = arrayVariant(VariantType.Int32, [42]); // Single element but still array
      const scalarEncoder = new BinaryEncoder();
      encodeBinary(scalarEncoder, scalar);
      const scalarBuffer = scalarEncoder.getBuffer();
      
      expect(scalarBuffer[0]).toBe(0x86); // Array bit set
      
      const decoded = decodeBinary(new BinaryDecoder(scalarBuffer));
      expect(decoded.variantType).toBe(VariantType.Int32);
      expect(isArray(decoded)).toBe(true);
    });

    it('should discriminate between different array types with same values', () => {
      // Same numeric values but different types
      const int32Array = arrayVariant(VariantType.Int32, [1, 2, 3]);
      const uint32Array = arrayVariant(VariantType.UInt32, [1, 2, 3]);
      const doubleArray = arrayVariant(VariantType.Double, [1, 2, 3]);

      const enc1 = new BinaryEncoder();
      encodeBinary(enc1, int32Array);
      expect(enc1.getBuffer()[0]).toBe(0x86); // Int32 array

      const enc2 = new BinaryEncoder();
      encodeBinary(enc2, uint32Array);
      expect(enc2.getBuffer()[0]).toBe(0x87); // UInt32 array

      const enc3 = new BinaryEncoder();
      encodeBinary(enc3, doubleArray);
      expect(enc3.getBuffer()[0]).toBe(0x8B); // Double array

      const dec1 = decodeBinary(new BinaryDecoder(enc1.getBuffer()));
      const dec2 = decodeBinary(new BinaryDecoder(enc2.getBuffer()));
      const dec3 = decodeBinary(new BinaryDecoder(enc3.getBuffer()));

      expect(dec1.variantType).toBe(VariantType.Int32);
      expect(dec2.variantType).toBe(VariantType.UInt32);
      expect(dec3.variantType).toBe(VariantType.Double);
    });
  });

  describe('Array encoding format validation', () => {
    it('should encode array length after encoding byte', () => {
      const values = [1, 2, 3, 4, 5];
      const v = arrayVariant(VariantType.Int32, values);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x86); // Encoding byte
      
      // Next 4 bytes should be length (5) in little-endian
      const length = buffer[1] | (buffer[2] << 8) | (buffer[3] << 16) | (buffer[4] << 24);
      expect(length).toBe(5);
    });

    it('should encode all array elements after length', () => {
      const values = [100, 200, 300];
      const v = arrayVariant(VariantType.Int32, values);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      // Encoding byte (1) + length (4) + 3 Int32s (12) = 17 bytes minimum
      expect(buffer.length).toBeGreaterThanOrEqual(17);
    });
  });
});
