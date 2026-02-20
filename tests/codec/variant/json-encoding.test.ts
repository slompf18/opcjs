/**
 * Tests for Variant JSON encoding/decoding (US7).
 * 
 * Validates:
 * - Type and Body field structure
 * - Numeric type IDs (0-25)
 * - Array encoding in Body field
 * - Null variant encoding
 * - Round-trip encoding/decoding for all types
 * - JSON format compliance per OPC UA specification
 * 
 * Tasks: T435-T436 (Phase 9: Variant Type Discrimination)
 */

import { describe, it, expect } from 'vitest';
import { JsonEncoder } from '../../../src/codec/json/encoder.js';
import { JsonDecoder } from '../../../src/codec/json/decoder.js';
import * as VariantCodec from '../../../src/codec/complex/variant.js';
import { Variant, VariantType } from '../../../src/types/src/index.js';

describe('Variant JSON Encoding', () => {
  describe('Primitive Types', () => {
    it('should encode Boolean variant to JSON with Type and Body', () => {
      const encoder = new JsonEncoder();
      const variant = VariantCodec.variant(VariantType.Boolean, true);
      
      VariantCodec.encodeJson(encoder, variant);
      
      const json = encoder.getJson();
      const obj = JSON.parse(json);
      
      expect(obj).toHaveProperty('Type');
      expect(obj).toHaveProperty('Body');
      expect(obj.Type).toBe(VariantType.Boolean); // Type ID 1
      expect(obj.Body).toBe(true);
    });

    it('should encode Int32 variant to JSON', () => {
      const encoder = new JsonEncoder();
      const variant = VariantCodec.variant(VariantType.Int32, 42);
      
      VariantCodec.encodeJson(encoder, variant);
      
      const json = encoder.getJson();
      const obj = JSON.parse(json);
      
      expect(obj.Type).toBe(VariantType.Int32); // Type ID 6
      expect(obj.Body).toBe(42);
    });

    it('should encode negative Int32 variant to JSON', () => {
      const encoder = new JsonEncoder();
      const variant = VariantCodec.variant(VariantType.Int32, -100);
      
      VariantCodec.encodeJson(encoder, variant);
      
      const json = encoder.getJson();
      const obj = JSON.parse(json);
      
      expect(obj.Type).toBe(VariantType.Int32);
      expect(obj.Body).toBe(-100);
    });

    it('should encode UInt32 variant to JSON', () => {
      const encoder = new JsonEncoder();
      const variant = VariantCodec.variant(VariantType.UInt32, 4294967295);
      
      VariantCodec.encodeJson(encoder, variant);
      
      const json = encoder.getJson();
      const obj = JSON.parse(json);
      
      expect(obj.Type).toBe(VariantType.UInt32); // Type ID 7
      expect(obj.Body).toBe(4294967295);
    });

    it('should encode Int64 variant to JSON as string', () => {
      const encoder = new JsonEncoder();
      const variant = VariantCodec.variant(VariantType.Int64, 9223372036854775807n);
      
      VariantCodec.encodeJson(encoder, variant);
      
      const json = encoder.getJson();
      const obj = JSON.parse(json);
      
      expect(obj.Type).toBe(VariantType.Int64); // Type ID 8
      expect(obj.Body).toBe('9223372036854775807');
    });

    it('should encode Float variant to JSON', () => {
      const encoder = new JsonEncoder();
      const variant = VariantCodec.variant(VariantType.Float, 3.14159);
      
      VariantCodec.encodeJson(encoder, variant);
      
      const json = encoder.getJson();
      const obj = JSON.parse(json);
      
      expect(obj.Type).toBe(VariantType.Float); // Type ID 10
      expect(obj.Body).toBeCloseTo(3.14159, 5);
    });

    it('should encode Double variant to JSON', () => {
      const encoder = new JsonEncoder();
      const variant = VariantCodec.variant(VariantType.Double, 2.718281828459045);
      
      VariantCodec.encodeJson(encoder, variant);
      
      const json = encoder.getJson();
      const obj = JSON.parse(json);
      
      expect(obj.Type).toBe(VariantType.Double); // Type ID 11
      expect(obj.Body).toBeCloseTo(2.718281828459045, 10);
    });

    it('should encode String variant to JSON', () => {
      const encoder = new JsonEncoder();
      const variant = VariantCodec.variant(VariantType.String, 'Hello OPC UA');
      
      VariantCodec.encodeJson(encoder, variant);
      
      const json = encoder.getJson();
      const obj = JSON.parse(json);
      
      expect(obj.Type).toBe(VariantType.String); // Type ID 12
      expect(obj.Body).toBe('Hello OPC UA');
    });

    it('should encode Byte variant to JSON', () => {
      const encoder = new JsonEncoder();
      const variant = VariantCodec.variant(VariantType.Byte, 255);
      
      VariantCodec.encodeJson(encoder, variant);
      
      const json = encoder.getJson();
      const obj = JSON.parse(json);
      
      expect(obj.Type).toBe(VariantType.Byte); // Type ID 3
      expect(obj.Body).toBe(255);
    });

    it('should encode SByte variant to JSON', () => {
      const encoder = new JsonEncoder();
      const variant = VariantCodec.variant(VariantType.SByte, -128);
      
      VariantCodec.encodeJson(encoder, variant);
      
      const json = encoder.getJson();
      const obj = JSON.parse(json);
      
      expect(obj.Type).toBe(VariantType.SByte); // Type ID 2
      expect(obj.Body).toBe(-128);
    });
  });

  describe('Null Variant', () => {
    it('should encode null variant to JSON', () => {
      const encoder = new JsonEncoder();
      const variant = VariantCodec.nullVariant();
      
      VariantCodec.encodeJson(encoder, variant);
      
      const json = encoder.getJson();
      const obj = JSON.parse(json);
      
      expect(obj.Type).toBe(VariantType.Null); // Type ID 0
      expect(obj.Body).toBeNull();
    });
  });

  describe('Array Types', () => {
    it('should encode Int32 array variant to JSON', () => {
      const encoder = new JsonEncoder();
      const variant = VariantCodec.arrayVariant(VariantType.Int32, [10, 20, 30]);
      
      VariantCodec.encodeJson(encoder, variant);
      
      const json = encoder.getJson();
      const obj = JSON.parse(json);
      
      expect(obj.Type).toBe(VariantType.Int32);
      expect(Array.isArray(obj.Body)).toBe(true);
      expect(obj.Body).toEqual([10, 20, 30]);
    });

    it('should encode Boolean array variant to JSON', () => {
      const encoder = new JsonEncoder();
      const variant = VariantCodec.arrayVariant(VariantType.Boolean, [true, false, true]);
      
      VariantCodec.encodeJson(encoder, variant);
      
      const json = encoder.getJson();
      const obj = JSON.parse(json);
      
      expect(obj.Type).toBe(VariantType.Boolean);
      expect(Array.isArray(obj.Body)).toBe(true);
      expect(obj.Body).toEqual([true, false, true]);
    });

    it('should encode String array variant to JSON', () => {
      const encoder = new JsonEncoder();
      const variant = VariantCodec.arrayVariant(VariantType.String, ['alpha', 'beta', 'gamma']);
      
      VariantCodec.encodeJson(encoder, variant);
      
      const json = encoder.getJson();
      const obj = JSON.parse(json);
      
      expect(obj.Type).toBe(VariantType.String);
      expect(Array.isArray(obj.Body)).toBe(true);
      expect(obj.Body).toEqual(['alpha', 'beta', 'gamma']);
    });

    it('should encode empty array variant to JSON', () => {
      const encoder = new JsonEncoder();
      const variant = VariantCodec.arrayVariant(VariantType.Int32, []);
      
      VariantCodec.encodeJson(encoder, variant);
      
      const json = encoder.getJson();
      const obj = JSON.parse(json);
      
      expect(obj.Type).toBe(VariantType.Int32);
      expect(Array.isArray(obj.Body)).toBe(true);
      expect(obj.Body).toEqual([]);
    });

    it('should encode large Int32 array variant to JSON', () => {
      const encoder = new JsonEncoder();
      const largeArray = Array.from({ length: 100 }, (_, i) => i);
      const variant = VariantCodec.arrayVariant(VariantType.Int32, largeArray);
      
      VariantCodec.encodeJson(encoder, variant);
      
      const json = encoder.getJson();
      const obj = JSON.parse(json);
      
      expect(obj.Type).toBe(VariantType.Int32);
      expect(Array.isArray(obj.Body)).toBe(true);
      expect(obj.Body.length).toBe(100);
      expect(obj.Body).toEqual(largeArray);
    });
  });

  describe('Array Dimensions', () => {
    it('should encode multi-dimensional array with Dimensions field', () => {
      const encoder = new JsonEncoder();
      const variant = VariantCodec.arrayVariant(VariantType.Int32, [1, 2, 3, 4, 5, 6], [2, 3]);
      
      VariantCodec.encodeJson(encoder, variant);
      
      const json = encoder.getJson();
      const obj = JSON.parse(json);
      
      expect(obj.Type).toBe(VariantType.Int32);
      expect(obj.Body).toEqual([1, 2, 3, 4, 5, 6]);
      expect(obj.Dimensions).toEqual([2, 3]);
    });
  });
});

describe('Variant JSON Decoding', () => {
  describe('Primitive Types Round-Trip', () => {
    it('should decode Boolean variant from JSON', () => {
      const json = '{"Type":1,"Body":true}';
      const decoder = new JsonDecoder(json);
      
      const variant = VariantCodec.decodeJson(decoder);
      
      expect(variant.variantType).toBe(VariantType.Boolean);
      expect(variant.value).toBe(true);
    });

    it('should decode Int32 variant from JSON', () => {
      const json = '{"Type":6,"Body":42}';
      const decoder = new JsonDecoder(json);
      
      const variant = VariantCodec.decodeJson(decoder);
      
      expect(variant.variantType).toBe(VariantType.Int32);
      expect(variant.value).toBe(42);
    });

    it('should decode negative Int32 variant from JSON', () => {
      const json = '{"Type":6,"Body":-100}';
      const decoder = new JsonDecoder(json);
      
      const variant = VariantCodec.decodeJson(decoder);
      
      expect(variant.variantType).toBe(VariantType.Int32);
      expect(variant.value).toBe(-100);
    });

    it('should decode UInt32 variant from JSON', () => {
      const json = '{"Type":7,"Body":4294967295}';
      const decoder = new JsonDecoder(json);
      
      const variant = VariantCodec.decodeJson(decoder);
      
      expect(variant.variantType).toBe(VariantType.UInt32);
      expect(variant.value).toBe(4294967295);
    });

    it('should decode Int64 variant from JSON', () => {
      const json = '{"Type":8,"Body":"9223372036854775807"}';
      const decoder = new JsonDecoder(json);
      
      const variant = VariantCodec.decodeJson(decoder);
      
      expect(variant.variantType).toBe(VariantType.Int64);
      expect(variant.value).toBe(9223372036854775807n);
    });

    it('should decode Float variant from JSON', () => {
      const json = '{"Type":10,"Body":3.14159}';
      const decoder = new JsonDecoder(json);
      
      const variant = VariantCodec.decodeJson(decoder);
      
      expect(variant.variantType).toBe(VariantType.Float);
      expect(variant.value).toBeCloseTo(3.14159, 5);
    });

    it('should decode Double variant from JSON', () => {
      const json = '{"Type":11,"Body":2.718281828459045}';
      const decoder = new JsonDecoder(json);
      
      const variant = VariantCodec.decodeJson(decoder);
      
      expect(variant.variantType).toBe(VariantType.Double);
      expect(variant.value).toBeCloseTo(2.718281828459045, 10);
    });

    it('should decode String variant from JSON', () => {
      const json = '{"Type":12,"Body":"Hello OPC UA"}';
      const decoder = new JsonDecoder(json);
      
      const variant = VariantCodec.decodeJson(decoder);
      
      expect(variant.variantType).toBe(VariantType.String);
      expect(variant.value).toBe('Hello OPC UA');
    });

    it('should decode Byte variant from JSON', () => {
      const json = '{"Type":3,"Body":255}';
      const decoder = new JsonDecoder(json);
      
      const variant = VariantCodec.decodeJson(decoder);
      
      expect(variant.variantType).toBe(VariantType.Byte);
      expect(variant.value).toBe(255);
    });

    it('should decode SByte variant from JSON', () => {
      const json = '{"Type":2,"Body":-128}';
      const decoder = new JsonDecoder(json);
      
      const variant = VariantCodec.decodeJson(decoder);
      
      expect(variant.variantType).toBe(VariantType.SByte);
      expect(variant.value).toBe(-128);
    });
  });

  describe('Null Variant', () => {
    it('should decode null variant from JSON', () => {
      const json = '{"Type":0,"Body":null}';
      const decoder = new JsonDecoder(json);
      
      const variant = VariantCodec.decodeJson(decoder);
      
      expect(variant.variantType).toBe(VariantType.Null);
      expect(variant.value).toBeNull();
    });
  });

  describe('Array Round-Trip', () => {
    it('should decode Int32 array variant from JSON', () => {
      const json = '{"Type":6,"Body":[10,20,30]}';
      const decoder = new JsonDecoder(json);
      
      const variant = VariantCodec.decodeJson(decoder);
      
      expect(variant.variantType).toBe(VariantType.Int32);
      expect(Array.isArray(variant.value)).toBe(true);
      expect(variant.value).toEqual([10, 20, 30]);
    });

    it('should decode Boolean array variant from JSON', () => {
      const json = '{"Type":1,"Body":[true,false,true]}';
      const decoder = new JsonDecoder(json);
      
      const variant = VariantCodec.decodeJson(decoder);
      
      expect(variant.variantType).toBe(VariantType.Boolean);
      expect(Array.isArray(variant.value)).toBe(true);
      expect(variant.value).toEqual([true, false, true]);
    });

    it('should decode String array variant from JSON', () => {
      const json = '{"Type":12,"Body":["alpha","beta","gamma"]}';
      const decoder = new JsonDecoder(json);
      
      const variant = VariantCodec.decodeJson(decoder);
      
      expect(variant.variantType).toBe(VariantType.String);
      expect(Array.isArray(variant.value)).toBe(true);
      expect(variant.value).toEqual(['alpha', 'beta', 'gamma']);
    });

    it('should decode empty array variant from JSON', () => {
      const json = '{"Type":6,"Body":[]}';
      const decoder = new JsonDecoder(json);
      
      const variant = VariantCodec.decodeJson(decoder);
      
      expect(variant.variantType).toBe(VariantType.Int32);
      expect(Array.isArray(variant.value)).toBe(true);
      expect(variant.value).toEqual([]);
    });

    it('should decode single element array from JSON', () => {
      const json = '{"Type":6,"Body":[42]}';
      const decoder = new JsonDecoder(json);
      
      const variant = VariantCodec.decodeJson(decoder);
      
      expect(variant.variantType).toBe(VariantType.Int32);
      expect(Array.isArray(variant.value)).toBe(true);
      expect(variant.value).toEqual([42]);
    });
  });

  describe('Array Dimensions', () => {
    it('should decode multi-dimensional array with Dimensions field', () => {
      const json = '{"Type":6,"Body":[1,2,3,4,5,6],"Dimensions":[2,3]}';
      const decoder = new JsonDecoder(json);
      
      const variant = VariantCodec.decodeJson(decoder);
      
      expect(variant.variantType).toBe(VariantType.Int32);
      expect(variant.value).toEqual([1, 2, 3, 4, 5, 6]);
      expect(variant.arrayDimensions).toEqual([2, 3]);
    });
  });

  describe('Full Round-Trip', () => {
    it('should round-trip Boolean variant through JSON', () => {
      const encoder = new JsonEncoder();
      const original = VariantCodec.variant(VariantType.Boolean, false);
      
      VariantCodec.encodeJson(encoder, original);
      
      const json = encoder.getJson();
      const decoder = new JsonDecoder(json);
      const decoded = VariantCodec.decodeJson(decoder);
      
      expect(decoded.variantType).toBe(original.variantType);
      expect(decoded.value).toBe(original.value);
    });

    it('should round-trip Int32 variant through JSON', () => {
      const encoder = new JsonEncoder();
      const original = VariantCodec.variant(VariantType.Int32, -12345);
      
      VariantCodec.encodeJson(encoder, original);
      
      const json = encoder.getJson();
      const decoder = new JsonDecoder(json);
      const decoded = VariantCodec.decodeJson(decoder);
      
      expect(decoded.variantType).toBe(original.variantType);
      expect(decoded.value).toBe(original.value);
    });

    it('should round-trip String variant through JSON', () => {
      const encoder = new JsonEncoder();
      const original = VariantCodec.variant(VariantType.String, 'Test JSON Encoding');
      
      VariantCodec.encodeJson(encoder, original);
      
      const json = encoder.getJson();
      const decoder = new JsonDecoder(json);
      const decoded = VariantCodec.decodeJson(decoder);
      
      expect(decoded.variantType).toBe(original.variantType);
      expect(decoded.value).toBe(original.value);
    });

    it('should round-trip Int32 array variant through JSON', () => {
      const encoder = new JsonEncoder();
      const original = VariantCodec.arrayVariant(VariantType.Int32, [100, 200, 300, 400]);
      
      VariantCodec.encodeJson(encoder, original);
      
      const json = encoder.getJson();
      const decoder = new JsonDecoder(json);
      const decoded = VariantCodec.decodeJson(decoder);
      
      expect(decoded.variantType).toBe(original.variantType);
      expect(decoded.value).toEqual(original.value);
    });

    it('should round-trip null variant through JSON', () => {
      const encoder = new JsonEncoder();
      const original = VariantCodec.nullVariant();
      
      VariantCodec.encodeJson(encoder, original);
      
      const json = encoder.getJson();
      const decoder = new JsonDecoder(json);
      const decoded = VariantCodec.decodeJson(decoder);
      
      expect(decoded.variantType).toBe(original.variantType);
      expect(decoded.value).toBeNull();
    });

    it('should round-trip multi-dimensional array through JSON', () => {
      const encoder = new JsonEncoder();
      const original = VariantCodec.arrayVariant(VariantType.Int32, [1, 2, 3, 4, 5, 6], [2, 3]);
      
      VariantCodec.encodeJson(encoder, original);
      
      const json = encoder.getJson();
      const decoder = new JsonDecoder(json);
      const decoded = VariantCodec.decodeJson(decoder);
      
      expect(decoded.variantType).toBe(original.variantType);
      expect(decoded.value).toEqual(original.value);
      expect(decoded.arrayDimensions).toEqual(original.arrayDimensions);
    });
  });

  describe('Error Handling', () => {
    it('should throw error for missing Type field', () => {
      const json = '{"Body":42}';
      const decoder = new JsonDecoder(json);
      
      expect(() => VariantCodec.decodeJson(decoder)).toThrow('missing Type field');
    });

    it('should throw error for missing Body field', () => {
      const json = '{"Type":6}';
      const decoder = new JsonDecoder(json);
      
      expect(() => VariantCodec.decodeJson(decoder)).toThrow('missing Body field');
    });

    it('should throw error for invalid type ID', () => {
      const json = '{"Type":99,"Body":42}';
      const decoder = new JsonDecoder(json);
      
      expect(() => VariantCodec.decodeJson(decoder)).toThrow('Invalid Variant type ID');
    });

    it('should throw error for non-object JSON', () => {
      const json = '42';
      const decoder = new JsonDecoder(json);
      
      expect(() => VariantCodec.decodeJson(decoder)).toThrow('expected JSON object');
    });
  });
});
