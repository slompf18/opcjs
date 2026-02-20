/**
 * JSON Codec Tests
 * 
 * Tests for JSON encoding and decoding of OPC UA builtin types.
 * Validates compliance with OPC 10000-6 Section 5.4.
 */

import { describe, it, expect } from 'vitest';
import { JsonEncoder, JsonDecoder } from '../../../src/codec/json';

describe('JSON Encoder/Decoder', () => {
  describe('Boolean', () => {
    it('should encode true to JSON', () => {
      const encoder = new JsonEncoder();
      encoder.encodeBoolean(true);
      expect(encoder.getJson()).toBe('true');
    });

    it('should encode false to JSON', () => {
      const encoder = new JsonEncoder();
      encoder.encodeBoolean(false);
      expect(encoder.getJson()).toBe('false');
    });

    it('should decode true from JSON', () => {
      const decoder = new JsonDecoder('true');
      const value = decoder.decodeBoolean();
      expect(value).toBe(true);
    });

    it('should decode false from JSON', () => {
      const decoder = new JsonDecoder('false');
      const value = decoder.decodeBoolean();
      expect(value).toBe(false);
    });

    it('should round-trip Boolean values', () => {
      const encoder = new JsonEncoder();
      encoder.encodeBoolean(true);
      
      const decoder = new JsonDecoder(encoder.getJson());
      const value = decoder.decodeBoolean();
      expect(value).toBe(true);
    });
  });

  describe('Byte', () => {
    it('should encode max Byte to JSON', () => {
      const encoder = new JsonEncoder();
      encoder.encodeByte(255);
      expect(encoder.getJson()).toBe('255');
    });

    it('should decode Byte from JSON', () => {
      const decoder = new JsonDecoder('123');
      const value = decoder.decodeByte();
      expect(value).toBe(123);
    });

    it('should round-trip Byte values', () => {
      const encoder = new JsonEncoder();
      encoder.encodeByte(42);
      
      const decoder = new JsonDecoder(encoder.getJson());
      const value = decoder.decodeByte();
      expect(value).toBe(42);
    });

    it('should throw on out-of-range Byte encode', () => {
      const encoder = new JsonEncoder();
      expect(() => encoder.encodeByte(256)).toThrow('out of range');
    });

    it('should throw on out-of-range Byte decode', () => {
      const decoder = new JsonDecoder('256');
      expect(() => decoder.decodeByte()).toThrow('out of range');
    });
  });

  describe('SByte', () => {
    it('should encode min SByte to JSON', () => {
      const encoder = new JsonEncoder();
      encoder.encodeSByte(-128);
      expect(encoder.getJson()).toBe('-128');
    });

    it('should decode negative SByte from JSON', () => {
      const decoder = new JsonDecoder('-50');
      const value = decoder.decodeSByte();
      expect(value).toBe(-50);
    });

    it('should round-trip SByte values', () => {
      const encoder = new JsonEncoder();
      encoder.encodeSByte(-42);
      
      const decoder = new JsonDecoder(encoder.getJson());
      const value = decoder.decodeSByte();
      expect(value).toBe(-42);
    });
  });

  describe('Int16', () => {
    it('should encode min Int16 to JSON', () => {
      const encoder = new JsonEncoder();
      encoder.encodeInt16(-32768);
      expect(encoder.getJson()).toBe('-32768');
    });

    it('should decode Int16 from JSON', () => {
      const decoder = new JsonDecoder('12345');
      const value = decoder.decodeInt16();
      expect(value).toBe(12345);
    });

    it('should round-trip Int16 values', () => {
      const encoder = new JsonEncoder();
      encoder.encodeInt16(-12345);
      
      const decoder = new JsonDecoder(encoder.getJson());
      const value = decoder.decodeInt16();
      expect(value).toBe(-12345);
    });
  });

  describe('UInt16', () => {
    it('should encode max UInt16 to JSON', () => {
      const encoder = new JsonEncoder();
      encoder.encodeUInt16(65535);
      expect(encoder.getJson()).toBe('65535');
    });

    it('should decode UInt16 from JSON', () => {
      const decoder = new JsonDecoder('40000');
      const value = decoder.decodeUInt16();
      expect(value).toBe(40000);
    });

    it('should round-trip UInt16 values', () => {
      const encoder = new JsonEncoder();
      encoder.encodeUInt16(12345);
      
      const decoder = new JsonDecoder(encoder.getJson());
      const value = decoder.decodeUInt16();
      expect(value).toBe(12345);
    });
  });

  describe('Int32', () => {
    it('should encode positive Int32 to JSON', () => {
      const encoder = new JsonEncoder();
      encoder.encodeInt32(42);
      expect(encoder.getJson()).toBe('42');
    });

    it('should encode negative Int32 to JSON', () => {
      const encoder = new JsonEncoder();
      encoder.encodeInt32(-42);
      expect(encoder.getJson()).toBe('-42');
    });

    it('should decode Int32 from JSON', () => {
      const decoder = new JsonDecoder('1234567');
      const value = decoder.decodeInt32();
      expect(value).toBe(1234567);
    });

    it('should round-trip Int32 values', () => {
      const encoder = new JsonEncoder();
      encoder.encodeInt32(-9876543);
      
      const decoder = new JsonDecoder(encoder.getJson());
      const value = decoder.decodeInt32();
      expect(value).toBe(-9876543);
    });
  });

  describe('UInt32', () => {
    it('should encode max UInt32 to JSON', () => {
      const encoder = new JsonEncoder();
      encoder.encodeUInt32(4294967295);
      expect(encoder.getJson()).toBe('4294967295');
    });

    it('should decode UInt32 from JSON', () => {
      const decoder = new JsonDecoder('3000000000');
      const value = decoder.decodeUInt32();
      expect(value).toBe(3000000000);
    });

    it('should round-trip UInt32 values', () => {
      const encoder = new JsonEncoder();
      encoder.encodeUInt32(2147483648);
      
      const decoder = new JsonDecoder(encoder.getJson());
      const value = decoder.decodeUInt32();
      expect(value).toBe(2147483648);
    });
  });

  describe('Int64', () => {
    it('should encode min Int64 to JSON string', () => {
      const encoder = new JsonEncoder();
      encoder.encodeInt64(-9223372036854775808n);
      expect(encoder.getJson()).toBe('"-9223372036854775808"');
    });

    it('should decode max Int64 from JSON string', () => {
      const decoder = new JsonDecoder('"9223372036854775807"');
      const value = decoder.decodeInt64();
      expect(value).toBe(9223372036854775807n);
    });

    it('should round-trip Int64 values', () => {
      const encoder = new JsonEncoder();
      const testValue = 1234567890123456789n;
      encoder.encodeInt64(testValue);
      
      const decoder = new JsonDecoder(encoder.getJson());
      const value = decoder.decodeInt64();
      expect(value).toBe(testValue);
    });
  });

  describe('UInt64', () => {
    it('should encode max UInt64 to JSON string', () => {
      const encoder = new JsonEncoder();
      encoder.encodeUInt64(18446744073709551615n);
      expect(encoder.getJson()).toBe('"18446744073709551615"');
    });

    it('should decode UInt64 from JSON string', () => {
      const decoder = new JsonDecoder('"9999999999999999999"');
      const value = decoder.decodeUInt64();
      expect(value).toBe(9999999999999999999n);
    });

    it('should round-trip UInt64 values', () => {
      const encoder = new JsonEncoder();
      const testValue = 9876543210987654321n;
      encoder.encodeUInt64(testValue);
      
      const decoder = new JsonDecoder(encoder.getJson());
      const value = decoder.decodeUInt64();
      expect(value).toBe(testValue);
    });

    it('should throw on negative UInt64 encode', () => {
      const encoder = new JsonEncoder();
      expect(() => encoder.encodeUInt64(-1n)).toThrow('cannot be negative');
    });

    it('should throw on negative UInt64 decode', () => {
      const decoder = new JsonDecoder('"-1"');
      expect(() => decoder.decodeUInt64()).toThrow('cannot be negative');
    });
  });

  describe('String', () => {
    it('should encode string to JSON', () => {
      const encoder = new JsonEncoder();
      encoder.encodeString('Hello, OPC UA!');
      expect(encoder.getJson()).toBe('"Hello, OPC UA!"');
    });

    it('should decode string from JSON', () => {
      const decoder = new JsonDecoder('"Test String"');
      const value = decoder.decodeString();
      expect(value).toBe('Test String');
    });

    it('should handle JSON string escaping', () => {
      const encoder = new JsonEncoder();
      encoder.encodeString('Line 1\nLine 2\tTabbed');
      const json = encoder.getJson();
      
      const decoder = new JsonDecoder(json);
      const value = decoder.decodeString();
      expect(value).toBe('Line 1\nLine 2\tTabbed');
    });

    it('should encode null string', () => {
      const encoder = new JsonEncoder();
      encoder.encodeString(null);
      expect(encoder.getJson()).toBe('null');
    });

    it('should decode null string', () => {
      const decoder = new JsonDecoder('null');
      const value = decoder.decodeString();
      expect(value).toBeNull();
    });

    it('should round-trip string values', () => {
      const encoder = new JsonEncoder();
      encoder.encodeString('Temperature Sensor');
      
      const decoder = new JsonDecoder(encoder.getJson());
      const value = decoder.decodeString();
      expect(value).toBe('Temperature Sensor');
    });
  });

  describe('Float', () => {
    it('should encode Float to JSON', () => {
      const encoder = new JsonEncoder();
      encoder.encodeFloat(3.14159);
      const json = encoder.getJson();
      const decoded = JSON.parse(json);
      expect(decoded).toBeCloseTo(3.14159, 5);
    });

    it('should encode NaN as string', () => {
      const encoder = new JsonEncoder();
      encoder.encodeFloat(NaN);
      expect(encoder.getJson()).toBe('"NaN"');
    });

    it('should encode Infinity as string', () => {
      const encoder = new JsonEncoder();
      encoder.encodeFloat(Infinity);
      expect(encoder.getJson()).toBe('"Infinity"');
    });

    it('should encode -Infinity as string', () => {
      const encoder = new JsonEncoder();
      encoder.encodeFloat(-Infinity);
      expect(encoder.getJson()).toBe('"-Infinity"');
    });

    it('should decode special Float values from strings', () => {
      expect(new JsonDecoder('"NaN"').decodeFloat()).toBeNaN();
      expect(new JsonDecoder('"Infinity"').decodeFloat()).toBe(Infinity);
      expect(new JsonDecoder('"-Infinity"').decodeFloat()).toBe(-Infinity);
    });

    it('should round-trip Float values', () => {
      const encoder = new JsonEncoder();
      encoder.encodeFloat(-273.15);
      
      const decoder = new JsonDecoder(encoder.getJson());
      const value = decoder.decodeFloat();
      expect(value).toBeCloseTo(-273.15, 2);
    });
  });

  describe('Double', () => {
    it('should encode Double to JSON', () => {
      const encoder = new JsonEncoder();
      encoder.encodeDouble(2.718281828459045);
      const json = encoder.getJson();
      const decoded = JSON.parse(json);
      expect(decoded).toBeCloseTo(2.718281828459045, 10);
    });

    it('should encode NaN as string', () => {
      const encoder = new JsonEncoder();
      encoder.encodeDouble(NaN);
      expect(encoder.getJson()).toBe('"NaN"');
    });

    it('should encode Infinity as string', () => {
      const encoder = new JsonEncoder();
      encoder.encodeDouble(Infinity);
      expect(encoder.getJson()).toBe('"Infinity"');
    });

    it('should encode -Infinity as string', () => {
      const encoder = new JsonEncoder();
      encoder.encodeDouble(-Infinity);
      expect(encoder.getJson()).toBe('"-Infinity"');
    });

    it('should decode special Double values from strings', () => {
      expect(new JsonDecoder('"NaN"').decodeDouble()).toBeNaN();
      expect(new JsonDecoder('"Infinity"').decodeDouble()).toBe(Infinity);
      expect(new JsonDecoder('"-Infinity"').decodeDouble()).toBe(-Infinity);
    });

    it('should round-trip Double values with high precision', () => {
      const encoder = new JsonEncoder();
      const testValue = 1.23456789012345e-100;
      encoder.encodeDouble(testValue);
      
      const decoder = new JsonDecoder(encoder.getJson());
      const value = decoder.decodeDouble();
      expect(value).toBeCloseTo(testValue, 110);
    });
  });

  describe('DateTime', () => {
    it('should encode DateTime to ISO 8601 string', () => {
      const encoder = new JsonEncoder();
      const date = new Date('2024-02-19T12:34:56.789Z');
      encoder.encodeDateTime(date);
      expect(encoder.getJson()).toBe('"2024-02-19T12:34:56.789Z"');
    });

    it('should decode DateTime from ISO 8601 string', () => {
      const decoder = new JsonDecoder('"2024-02-19T12:34:56.789Z"');
      const value = decoder.decodeDateTime();
      expect(value.toISOString()).toBe('2024-02-19T12:34:56.789Z');
    });

    it('should round-trip DateTime values', () => {
      const encoder = new JsonEncoder();
      const originalDate = new Date('2024-12-25T00:00:00.000Z');
      encoder.encodeDateTime(originalDate);
      
      const decoder = new JsonDecoder(encoder.getJson());
      const decodedDate = decoder.decodeDateTime();
      expect(decodedDate.getTime()).toBe(originalDate.getTime());
    });
  });

  describe('ByteString', () => {
    it('should encode ByteString to Base64 string', () => {
      const encoder = new JsonEncoder();
      const bytes = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f]); // "Hello"
      encoder.encodeByteString(bytes);
      expect(encoder.getJson()).toBe('"SGVsbG8="'); // Base64 for "Hello"
    });

    it('should decode ByteString from Base64 string', () => {
      const decoder = new JsonDecoder('"SGVsbG8="');
      const value = decoder.decodeByteString();
      expect(value).toEqual(new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f]));
    });

    it('should encode null ByteString', () => {
      const encoder = new JsonEncoder();
      encoder.encodeByteString(null);
      expect(encoder.getJson()).toBe('null');
    });

    it('should decode null ByteString', () => {
      const decoder = new JsonDecoder('null');
      const value = decoder.decodeByteString();
      expect(value).toBeNull();
    });

    it('should round-trip ByteString values', () => {
      const encoder = new JsonEncoder();
      const originalBytes = new Uint8Array([0x01, 0x02, 0x03, 0xFF, 0xFE]);
      encoder.encodeByteString(originalBytes);
      
      const decoder = new JsonDecoder(encoder.getJson());
      const decodedBytes = decoder.decodeByteString();
      expect(decodedBytes).toEqual(originalBytes);
    });
  });

  describe('Guid', () => {
    it('should encode Guid to JSON string', () => {
      const encoder = new JsonEncoder();
      encoder.encodeGuid('12345678-1234-5678-1234-567812345678');
      expect(encoder.getJson()).toBe('"12345678-1234-5678-1234-567812345678"');
    });

    it('should decode Guid from JSON string', () => {
      const decoder = new JsonDecoder('"a1b2c3d4-e5f6-4718-9abc-def012345678"');
      const value = decoder.decodeGuid();
      expect(value).toBe('a1b2c3d4-e5f6-4718-9abc-def012345678');
    });

    it('should round-trip Guid values', () => {
      const encoder = new JsonEncoder();
      const guid = 'f81d4fae-7dec-11d0-a765-00a0c91e6bf6';
      encoder.encodeGuid(guid);
      
      const decoder = new JsonDecoder(encoder.getJson());
      const value = decoder.decodeGuid();
      expect(value).toBe(guid);
    });

    it('should throw on invalid Guid format encode', () => {
      const encoder = new JsonEncoder();
      expect(() => encoder.encodeGuid('not-a-guid')).toThrow('Invalid GUID format');
    });

    it('should throw on invalid Guid format decode', () => {
      const decoder = new JsonDecoder('"not-a-guid"');
      expect(() => decoder.decodeGuid()).toThrow('Invalid GUID format');
    });
  });

  describe('XmlElement', () => {
    it('should encode XML to JSON string', () => {
      const encoder = new JsonEncoder();
      const xml = '<element>Content</element>';
      encoder.encodeXmlElement(xml);
      expect(encoder.getJson()).toBe('"<element>Content</element>"');
    });

    it('should encode simple text', () => {
      const encoder = new JsonEncoder();
      encoder.encodeXmlElement('Just text');
      expect(encoder.getJson()).toBe('"Just text"');
    });

    it('should decode XmlElement text', () => {
      const decoder = new JsonDecoder('"<root>Value</root>"');
      const value = decoder.decodeXmlElement();
      expect(value).toBe('<root>Value</root>');
    });

    it('should round-trip XmlElement values', () => {
      const encoder = new JsonEncoder();
      const xml = '<data><item>1</item><item>2</item></data>';
      encoder.encodeXmlElement(xml);
      
      const decoder = new JsonDecoder(encoder.getJson());
      const value = decoder.decodeXmlElement();
      expect(value).toBe(xml);
    });
  });

  describe('Error Handling', () => {
    it('should throw on malformed JSON', () => {
      expect(() => new JsonDecoder('{ invalid json')).toThrow('Malformed JSON');
    });

    it('should throw on type mismatch', () => {
      const decoder = new JsonDecoder('"string"');
      expect(() => decoder.decodeBoolean()).toThrow('Expected boolean');
    });
  });
});
