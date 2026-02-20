/**
 * Tests for Variant with null value - Type Discrimination for Null Type.
 * 
 * Phase 9: User Story 7 - Variant Type Encoding with Type Discrimination
 * 
 * Tests verify that Variant correctly handles null values with type ID 0x00
 * and distinguishes between null Variant, empty arrays, and null values within
 * complex types.
 * 
 * Null type encoding:
 * - Encoding byte: 0x00 (VariantType.Null)
 * - No value bytes follow
 * - Total size: 1 byte
 * 
 * @module codec/variant/null-variant.test
 */

import { describe, it, expect } from 'vitest';
import { BinaryEncoder } from '../../../src/codec/binary/encoder.js';
import { BinaryDecoder } from '../../../src/codec/binary/decoder.js';
import {
  variant,
  nullVariant,
  arrayVariant,
  encodeBinary,
  decodeBinary,
  VariantType,
  isNull,
  isArray,
} from '../../../src/codec/complex/variant.js';

describe('Variant Type Discrimination - Null Value', () => {
  describe('Null variant encoding', () => {
    it('should encode null variant with encoding byte 0x00', () => {
      const v = nullVariant();
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer.length).toBe(1); // Only encoding byte, no value
      expect(buffer[0]).toBe(0x00); // Type 0 = Null
    });

    it('should encode explicit null type with encoding byte 0x00', () => {
      const v = variant(VariantType.Null, null);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x00);
      expect(buffer.length).toBe(1);
    });

    it('should produce minimal encoding for null (1 byte)', () => {
      const v = nullVariant();
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer.length).toBe(1); // Most compact Variant encoding
    });
  });

  describe('Null variant decoding', () => {
    it('should decode null variant and verify type is Null', () => {
      const v = nullVariant();
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(decoded.variantType).toBe(VariantType.Null);
      expect(decoded.value).toBe(null);
      expect(decoded.arrayDimensions).toBe(null);
    });

    it('should identify null variant using isNull helper', () => {
      const v = nullVariant();
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(isNull(decoded)).toBe(true);
      expect(isArray(decoded)).toBe(false);
    });

    it('should decode manual null encoding byte 0x00', () => {
      const buffer = Buffer.from([0x00]); // Just the null encoding byte
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeBinary(decoder);
      
      expect(decoded.variantType).toBe(VariantType.Null);
      expect(decoded.value).toBe(null);
      expect(isNull(decoded)).toBe(true);
    });
  });

  describe('Null vs empty value discrimination', () => {
    it('should discriminate between null variant and empty string variant', () => {
      const nullVar = nullVariant();
      const emptyStringVar = variant(VariantType.String, '');

      const enc1 = new BinaryEncoder();
      encodeBinary(enc1, nullVar);
      const buf1 = enc1.getBuffer();
      expect(buf1[0]).toBe(0x00); // Null

      const enc2 = new BinaryEncoder();
      encodeBinary(enc2, emptyStringVar);
      const buf2 = enc2.getBuffer();
      expect(buf2[0]).toBe(0x0C); // String

      const dec1 = decodeBinary(new BinaryDecoder(buf1));
      const dec2 = decodeBinary(new BinaryDecoder(buf2));

      expect(dec1.variantType).toBe(VariantType.Null);
      expect(dec1.value).toBe(null);
      
      expect(dec2.variantType).toBe(VariantType.String);
      expect(dec2.value).toBe('');
    });

    it('should discriminate between null variant and empty array', () => {
      const nullVar = nullVariant();
      const emptyArray = arrayVariant(VariantType.Int32, []);

      const enc1 = new BinaryEncoder();
      encodeBinary(enc1, nullVar);
      const buf1 = enc1.getBuffer();
      expect(buf1[0]).toBe(0x00); // Null

      const enc2 = new BinaryEncoder();
      encodeBinary(enc2, emptyArray);
      const buf2 = enc2.getBuffer();
      expect(buf2[0]).toBe(0x86); // Int32 array (0x80 | 0x06)

      const dec1 = decodeBinary(new BinaryDecoder(buf1));
      const dec2 = decodeBinary(new BinaryDecoder(buf2));

      expect(isNull(dec1)).toBe(true);
      expect(isArray(dec1)).toBe(false);
      
      expect(isNull(dec2)).toBe(false);
      expect(isArray(dec2)).toBe(true);
      expect(dec2.value).toEqual([]);
    });

    it('should discriminate between null variant and zero value', () => {
      const nullVar = nullVariant();
      const zeroVar = variant(VariantType.Int32, 0);

      const enc1 = new BinaryEncoder();
      encodeBinary(enc1, nullVar);
      const buf1 = enc1.getBuffer();
      expect(buf1[0]).toBe(0x00);

      const enc2 = new BinaryEncoder();
      encodeBinary(enc2, zeroVar);
      const buf2 = enc2.getBuffer();
      expect(buf2[0]).toBe(0x06); // Int32

      const dec1 = decodeBinary(new BinaryDecoder(buf1));
      const dec2 = decodeBinary(new BinaryDecoder(buf2));

      expect(dec1.variantType).toBe(VariantType.Null);
      expect(dec1.value).toBe(null);
      
      expect(dec2.variantType).toBe(VariantType.Int32);
      expect(dec2.value).toBe(0);
    });

    it('should discriminate between null variant and false Boolean', () => {
      const nullVar = nullVariant();
      const falseVar = variant(VariantType.Boolean, false);

      const enc1 = new BinaryEncoder();
      encodeBinary(enc1, nullVar);
      const buf1 = enc1.getBuffer();
      expect(buf1[0]).toBe(0x00); // Null

      const enc2 = new BinaryEncoder();
      encodeBinary(enc2, falseVar);
      const buf2 = enc2.getBuffer();
      expect(buf2[0]).toBe(0x01); // Boolean

      const dec1 = decodeBinary(new BinaryDecoder(buf1));
      const dec2 = decodeBinary(new BinaryDecoder(buf2));

      expect(dec1.variantType).toBe(VariantType.Null);
      expect(dec1.value).toBe(null);
      
      expect(dec2.variantType).toBe(VariantType.Boolean);
      expect(dec2.value).toBe(false);
    });
  });

  describe('Null variant in sequences', () => {
    it('should maintain null type when encoded among other variants', () => {
      const variants = [
        variant(VariantType.Int32, 42),
        nullVariant(),
        variant(VariantType.String, 'test'),
        nullVariant(),
        variant(VariantType.Double, 3.14),
      ];

      const encodedBuffers = variants.map(v => {
        const enc = new BinaryEncoder();
        encodeBinary(enc, v);
        return enc.getBuffer();
      });

      // Verify encoding bytes
      expect(encodedBuffers[0][0]).toBe(0x06); // Int32
      expect(encodedBuffers[1][0]).toBe(0x00); // Null
      expect(encodedBuffers[2][0]).toBe(0x0C); // String
      expect(encodedBuffers[3][0]).toBe(0x00); // Null
      expect(encodedBuffers[4][0]).toBe(0x0B); // Double

      // Verify decoding
      const decodedVariants = encodedBuffers.map(buf => 
        decodeBinary(new BinaryDecoder(buf))
      );

      expect(decodedVariants[0].variantType).toBe(VariantType.Int32);
      expect(isNull(decodedVariants[1])).toBe(true);
      expect(decodedVariants[2].variantType).toBe(VariantType.String);
      expect(isNull(decodedVariants[3])).toBe(true);
      expect(decodedVariants[4].variantType).toBe(VariantType.Double);
    });

    it('should handle multiple consecutive null variants', () => {
      const nulls = [
        nullVariant(),
        nullVariant(),
        nullVariant(),
      ];

      nulls.forEach(v => {
        const encoder = new BinaryEncoder();
        encodeBinary(encoder, v);
        const buffer = encoder.getBuffer();
        
        expect(buffer.length).toBe(1);
        expect(buffer[0]).toBe(0x00);
        
        const decoded = decodeBinary(new BinaryDecoder(buffer));
        expect(isNull(decoded)).toBe(true);
      });
    });
  });

  describe('Null variant round-trip', () => {
    it('should round-trip null variant preserving type', () => {
      const original = nullVariant();
      
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, original);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(decoded.variantType).toBe(original.variantType);
      expect(decoded.value).toBe(original.value);
      expect(decoded.arrayDimensions).toBe(original.arrayDimensions);
    });

    it('should round-trip multiple null variants', () => {
      for (let i = 0; i < 100; i++) {
        const v = nullVariant();
        const encoder = new BinaryEncoder();
        encodeBinary(encoder, v);
        
        const decoder = new BinaryDecoder(encoder.getBuffer());
        const decoded = decodeBinary(decoder);
        
        expect(isNull(decoded)).toBe(true);
      }
    });
  });

  describe('Null variant size efficiency', () => {
    it('should be smallest possible Variant encoding', () => {
      const nullVar = nullVariant();
      const boolVar = variant(VariantType.Boolean, false);
      const byteVar = variant(VariantType.Byte, 0);

      const enc1 = new BinaryEncoder();
      encodeBinary(enc1, nullVar);
      const buf1 = enc1.getBuffer();

      const enc2 = new BinaryEncoder();
      encodeBinary(enc2, boolVar);
      const buf2 = enc2.getBuffer();

      const enc3 = new BinaryEncoder();
      encodeBinary(enc3, byteVar);
      const buf3 = enc3.getBuffer();

      expect(buf1.length).toBe(1); // Null: 1 byte
      expect(buf2.length).toBeGreaterThan(1); // Boolean: 2 bytes
      expect(buf3.length).toBeGreaterThan(1); // Byte: 2 bytes
    });

    it('should compare size with other minimal encodings', () => {
      const variants = [
        nullVariant(),
        variant(VariantType.Boolean, true),
        variant(VariantType.Byte, 1),
        arrayVariant(VariantType.Int32, []),
      ];

      const sizes = variants.map(v => {
        const enc = new BinaryEncoder();
        encodeBinary(enc, v);
        return enc.getBuffer().length;
      });

      expect(sizes[0]).toBe(1); // Null is smallest
      expect(sizes[0]).toBeLessThan(sizes[1]);
      expect(sizes[0]).toBeLessThan(sizes[2]);
      expect(sizes[0]).toBeLessThan(sizes[3]);
    });
  });

  describe('Null variant validation', () => {
    it('should accept null value only for Null type', () => {
      const v = variant(VariantType.Null, null);
      expect(v.variantType).toBe(VariantType.Null);
      expect(v.value).toBe(null);
    });

    it('should encode and decode null maintaining exact state', () => {
      const original = nullVariant();
      
      expect(original.variantType).toBe(VariantType.Null);
      expect(original.value).toBe(null);
      expect(original.arrayDimensions).toBe(null);
      
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, original);
      
      const decoded = decodeBinary(new BinaryDecoder(encoder.getBuffer()));
      
      expect(decoded.variantType).toBe(VariantType.Null);
      expect(decoded.value).toBe(null);
      expect(decoded.arrayDimensions).toBe(null);
    });
  });

  describe('Null type ID validation', () => {
    it('should use type ID 0 for null variants', () => {
      expect(VariantType.Null).toBe(0);
      
      const v = nullVariant();
      expect(v.variantType).toBe(0);
      
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      const buffer = encoder.getBuffer();
      
      // Encoding byte should be 0 (type ID 0, no array bit, no dimensions bit)
      expect(buffer[0] & 0x3F).toBe(0); // Mask off flags, check type ID
    });

    it('should decode type ID 0 as Null type', () => {
      const buffer = Buffer.from([0x00]);
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeBinary(decoder);
      
      expect(decoded.variantType).toBe(0);
      expect(decoded.variantType).toBe(VariantType.Null);
    });
  });
});
