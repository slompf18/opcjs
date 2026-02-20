/**
 * Tests for Variant with primitive types - Type Discrimination validation.
 * 
 * Phase 9: User Story 7 - Variant Type Encoding with Type Discrimination
 * 
 * Tests verify that Variant correctly encodes type information (encoding byte for binary,
 * type indicators for XML/JSON) when containing primitive builtin types.
 * 
 * Primitive types tested:
 * - Boolean (0x01)
 * - SByte (0x02), Byte (0x03)
 * - Int16 (0x04), UInt16 (0x05)
 * - Int32 (0x06), UInt32 (0x07)
 * - Int64 (0x08), UInt64 (0x09)
 * - Float (0x10), Double (0x11)
 * - String (0x0C)
 * - DateTime (0x0D)
 * - Guid (0x0E)
 * - ByteString (0x0F)
 * - XmlElement (0x10)
 * 
 * @module codec/variant/primitive-types.test
 */

import { describe, it, expect } from 'vitest';
import { BinaryEncoder } from '../../../src/codec/binary/encoder.js';
import { BinaryDecoder } from '../../../src/codec/binary/decoder.js';
import {
  variant,
  encodeBinary,
  decodeBinary,
  VariantType,
} from '../../../src/codec/complex/variant.js';

describe('Variant Type Discrimination - Primitive Types', () => {
  describe('Boolean type (0x01)', () => {
    it('should encode variant with Boolean encoding byte 0x01', () => {
      const v = variant(VariantType.Boolean, true);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x01); // Type 1 = Boolean
      expect(buffer[1]).toBe(0x01); // true value
    });

    it('should decode Boolean variant and preserve type', () => {
      const v = variant(VariantType.Boolean, false);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(decoded.variantType).toBe(VariantType.Boolean);
      expect(decoded.value).toBe(false);
    });
  });

  describe('Byte types (0x02, 0x03)', () => {
    it('should encode variant with SByte encoding byte 0x02', () => {
      const v = variant(VariantType.SByte, -42);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x02); // Type 2 = SByte
    });

    it('should encode variant with Byte encoding byte 0x03', () => {
      const v = variant(VariantType.Byte, 200);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x03); // Type 3 = Byte
    });

    it('should decode SByte/Byte variants with correct type discrimination', () => {
      const sbyte = variant(VariantType.SByte, -10);
      const byte = variant(VariantType.Byte, 250);
      
      const enc1 = new BinaryEncoder();
      encodeBinary(enc1, sbyte);
      const decoded1 = decodeBinary(new BinaryDecoder(enc1.getBuffer()));
      expect(decoded1.variantType).toBe(VariantType.SByte);
      expect(decoded1.value).toBe(-10);
      
      const enc2 = new BinaryEncoder();
      encodeBinary(enc2, byte);
      const decoded2 = decodeBinary(new BinaryDecoder(enc2.getBuffer()));
      expect(decoded2.variantType).toBe(VariantType.Byte);
      expect(decoded2.value).toBe(250);
    });
  });

  describe('Int16 types (0x04, 0x05)', () => {
    it('should encode variant with Int16 encoding byte 0x04', () => {
      const v = variant(VariantType.Int16, -1000);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x04); // Type 4 = Int16
    });

    it('should encode variant with UInt16 encoding byte 0x05', () => {
      const v = variant(VariantType.UInt16, 50000);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x05); // Type 5 = UInt16
    });

    it('should decode Int16/UInt16 variants with correct type', () => {
      const int16 = variant(VariantType.Int16, -30000);
      const uint16 = variant(VariantType.UInt16, 60000);
      
      const enc1 = new BinaryEncoder();
      encodeBinary(enc1, int16);
      const decoded1 = decodeBinary(new BinaryDecoder(enc1.getBuffer()));
      expect(decoded1.variantType).toBe(VariantType.Int16);
      expect(decoded1.value).toBe(-30000);
      
      const enc2 = new BinaryEncoder();
      encodeBinary(enc2, uint16);
      const decoded2 = decodeBinary(new BinaryDecoder(enc2.getBuffer()));
      expect(decoded2.variantType).toBe(VariantType.UInt16);
      expect(decoded2.value).toBe(60000);
    });
  });

  describe('Int32 types (0x06, 0x07) - Primary test case from User Story 7', () => {
    it('should encode variant with Int32 encoding byte 0x06', () => {
      const v = variant(VariantType.Int32, 42);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x06); // Type 6 = Int32
      // Verify 4-byte Int32 value follows (little-endian: 42 = 0x0000002A)
      expect(buffer[1]).toBe(0x2A);
      expect(buffer[2]).toBe(0x00);
      expect(buffer[3]).toBe(0x00);
      expect(buffer[4]).toBe(0x00);
    });

    it('should decode Int32 variant and verify type is Int32 and value is 42', () => {
      const v = variant(VariantType.Int32, 42);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(decoded.variantType).toBe(VariantType.Int32);
      expect(decoded.value).toBe(42);
    });

    it('should encode variant with UInt32 encoding byte 0x07', () => {
      const v = variant(VariantType.UInt32, 4000000000);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x07); // Type 7 = UInt32
    });

    it('should discriminate between Int32 and UInt32 types', () => {
      const int32 = variant(VariantType.Int32, -2000000000);
      const uint32 = variant(VariantType.UInt32, 4000000000);
      
      const enc1 = new BinaryEncoder();
      encodeBinary(enc1, int32);
      const decoded1 = decodeBinary(new BinaryDecoder(enc1.getBuffer()));
      expect(decoded1.variantType).toBe(VariantType.Int32);
      expect(decoded1.value).toBe(-2000000000);
      
      const enc2 = new BinaryEncoder();
      encodeBinary(enc2, uint32);
      const decoded2 = decodeBinary(new BinaryDecoder(enc2.getBuffer()));
      expect(decoded2.variantType).toBe(VariantType.UInt32);
      expect(decoded2.value).toBe(4000000000);
    });
  });

  describe('Int64 types (0x08, 0x09)', () => {
    it('should encode variant with Int64 encoding byte 0x08', () => {
      const v = variant(VariantType.Int64, -9223372036854775000n);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x08); // Type 8 = Int64
    });

    it('should encode variant with UInt64 encoding byte 0x09', () => {
      const v = variant(VariantType.UInt64, 18446744073709551000n);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x09); // Type 9 = UInt64
    });

    it('should decode Int64/UInt64 variants with correct type', () => {
      const int64 = variant(VariantType.Int64, -1234567890123456n);
      const uint64 = variant(VariantType.UInt64, 9876543210987654n);
      
      const enc1 = new BinaryEncoder();
      encodeBinary(enc1, int64);
      const decoded1 = decodeBinary(new BinaryDecoder(enc1.getBuffer()));
      expect(decoded1.variantType).toBe(VariantType.Int64);
      expect(decoded1.value).toBe(-1234567890123456n);
      
      const enc2 = new BinaryEncoder();
      encodeBinary(enc2, uint64);
      const decoded2 = decodeBinary(new BinaryDecoder(enc2.getBuffer()));
      expect(decoded2.variantType).toBe(VariantType.UInt64);
      expect(decoded2.value).toBe(9876543210987654n);
    });
  });

  describe('Float types (0x0A, 0x0B)', () => {
    it('should encode variant with Float encoding byte 0x0A', () => {
      const v = variant(VariantType.Float, 3.14);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x0A); // Type 10 = Float
    });

    it('should encode variant with Double encoding byte 0x0B', () => {
      const v = variant(VariantType.Double, 2.718281828459045);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x0B); // Type 11 = Double
    });

    it('should decode Float/Double variants with correct type', () => {
      const float = variant(VariantType.Float, 1.5);
      const double = variant(VariantType.Double, 1.7976931348623157e+308);
      
      const enc1 = new BinaryEncoder();
      encodeBinary(enc1, float);
      const decoded1 = decodeBinary(new BinaryDecoder(enc1.getBuffer()));
      expect(decoded1.variantType).toBe(VariantType.Float);
      expect(decoded1.value).toBeCloseTo(1.5, 5);
      
      const enc2 = new BinaryEncoder();
      encodeBinary(enc2, double);
      const decoded2 = decodeBinary(new BinaryDecoder(enc2.getBuffer()));
      expect(decoded2.variantType).toBe(VariantType.Double);
      expect(decoded2.value).toBeCloseTo(1.7976931348623157e+308, 5);
    });
  });

  describe('String type (0x0C)', () => {
    it('should encode variant with String encoding byte 0x0C', () => {
      const v = variant(VariantType.String, 'test');
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x0C); // Type 12 = String
    });

    it('should decode String variant with correct type and value', () => {
      const v = variant(VariantType.String, 'Hello, OPC UA!');
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(decoded.variantType).toBe(VariantType.String);
      expect(decoded.value).toBe('Hello, OPC UA!');
    });

    it('should handle empty string', () => {
      const v = variant(VariantType.String, '');
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(decoded.variantType).toBe(VariantType.String);
      expect(decoded.value).toBe('');
    });
  });

  describe('DateTime type (0x0D)', () => {
    it('should encode variant with DateTime encoding byte 0x0D', () => {
      const date = new Date('2024-01-15T10:30:00.000Z');
      const v = variant(VariantType.DateTime, date);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x0D); // Type 13 = DateTime
    });

    it('should decode DateTime variant with correct type', () => {
      const date = new Date('2024-06-20T15:45:30.500Z');
      const v = variant(VariantType.DateTime, date);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(decoded.variantType).toBe(VariantType.DateTime);
      expect((decoded.value as Date).getTime()).toBe(date.getTime());
    });
  });

  describe('Guid type (0x0E)', () => {
    it('should encode variant with Guid encoding byte 0x0E', () => {
      const guid = '12345678-1234-1234-1234-123456789012';
      const v = variant(VariantType.Guid, guid);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x0E); // Type 14 = Guid
    });

    it('should decode Guid variant with correct type and value', () => {
      const guid = 'A0B1C2D3-E4F5-A6B7-C8D9-EAFBECFDEFEA';
      const v = variant(VariantType.Guid, guid);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(decoded.variantType).toBe(VariantType.Guid);
      // GUIDs are case-insensitive, compare uppercase
      expect((decoded.value as string).toUpperCase()).toBe(guid.toUpperCase());
    });
  });

  describe('ByteString type (0x0F)', () => {
    it('should encode variant with ByteString encoding byte 0x0F', () => {
      const bytes = new Uint8Array([0x01, 0x02, 0x03, 0x04]);
      const v = variant(VariantType.ByteString, bytes);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x0F); // Type 15 = ByteString
    });

    it('should decode ByteString variant with correct type and value', () => {
      const bytes = new Uint8Array([0xDE, 0xAD, 0xBE, 0xEF]);
      const v = variant(VariantType.ByteString, bytes);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(decoded.variantType).toBe(VariantType.ByteString);
      // Decoder returns Buffer which is Uint8Array-like, compare bytes
      const decodedBytes = new Uint8Array(decoded.value as Uint8Array);
      expect(Array.from(decodedBytes)).toEqual(Array.from(bytes));
    });
  });

  describe('XmlElement type (0x10)', () => {
    it('should encode variant with XmlElement encoding byte 0x10', () => {
      const xml = '<root><child>value</child></root>';
      const v = variant(VariantType.XmlElement, xml);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x10); // Type 16 = XmlElement
    });

    it('should decode XmlElement variant with correct type and value', () => {
      const xml = '<data><item id="1">test</item></data>';
      const v = variant(VariantType.XmlElement, xml);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(decoded.variantType).toBe(VariantType.XmlElement);
      expect(decoded.value).toBe(xml);
    });
  });

  describe('Type discrimination edge cases', () => {
    it('should correctly discriminate between all numeric types', () => {
      const types = [
        { type: VariantType.SByte, value: -42, expectedByte: 0x02 },
        { type: VariantType.Byte, value: 200, expectedByte: 0x03 },
        { type: VariantType.Int16, value: -1000, expectedByte: 0x04 },
        { type: VariantType.UInt16, value: 50000, expectedByte: 0x05 },
        { type: VariantType.Int32, value: -100000, expectedByte: 0x06 },
        { type: VariantType.UInt32, value: 3000000000, expectedByte: 0x07 },
        { type: VariantType.Int64, value: -9007199254740991n, expectedByte: 0x08 },
        { type: VariantType.UInt64, value: 9007199254740991n, expectedByte: 0x09 },
        { type: VariantType.Float, value: 1.5, expectedByte: 0x0A },
        { type: VariantType.Double, value: 2.5, expectedByte: 0x0B },
      ];

      types.forEach(({ type, value, expectedByte }) => {
        const v = variant(type, value);
        const encoder = new BinaryEncoder();
        encodeBinary(encoder, v);
        
        const buffer = encoder.getBuffer();
        expect(buffer[0]).toBe(expectedByte);
        
        const decoder = new BinaryDecoder(buffer);
        const decoded = decodeBinary(decoder);
        expect(decoded.variantType).toBe(type);
      });
    });

    it('should handle primitive types in rapid succession maintaining type info', () => {
      const variants = [
        variant(VariantType.Boolean, true),
        variant(VariantType.Int32, 100),
        variant(VariantType.String, 'test'),
        variant(VariantType.Double, 3.14),
      ];

      const encodedBuffers = variants.map(v => {
        const enc = new BinaryEncoder();
        encodeBinary(enc, v);
        return enc.getBuffer();
      });

      const decodedVariants = encodedBuffers.map(buf => 
        decodeBinary(new BinaryDecoder(buf))
      );

      expect(decodedVariants[0].variantType).toBe(VariantType.Boolean);
      expect(decodedVariants[1].variantType).toBe(VariantType.Int32);
      expect(decodedVariants[2].variantType).toBe(VariantType.String);
      expect(decodedVariants[3].variantType).toBe(VariantType.Double);
    });
  });
});
