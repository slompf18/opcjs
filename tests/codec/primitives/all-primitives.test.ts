/**
 * @fileoverview Comprehensive tests for all OPC UA primitive types
 * @module tests/codec/primitives/all-primitives
 */

import { describe, it, expect } from 'vitest';
import { BinaryEncoder } from '../../../src/codec/binary/encoder.js';
import { BinaryDecoder } from '../../../src/codec/binary/decoder.js';
import { CodecFacade } from '../../../src/codec/facade.js';
import {
  registerBoolean,
  registerByte,
  registerSByte,
  registerInt16,
  registerUInt16,
  registerInt32,
  registerUInt32,
  registerInt64,
  registerUInt64,
  registerFloat,
  registerDouble,
  registerString,
  registerDateTime,
  registerGuid,
  registerByteString,
  registerXmlElement,
} from '../../../src/codec/index.js';

describe('All Primitive Types - Binary Encoding', () => {
  
  describe('Byte (UInt8)', () => {
    it('should encode/decode Byte values', () => {
      const encoder = new BinaryEncoder();
      encoder.writeByte(0);
      encoder.writeByte(127);
      encoder.writeByte(255);

      const decoder = new BinaryDecoder(encoder.getBuffer());
      expect(decoder.readByte()).toBe(0);
      expect(decoder.readByte()).toBe(127);
      expect(decoder.readByte()).toBe(255);
    });

    it('should reject out-of-range Byte values', () => {
      const encoder = new BinaryEncoder();
      expect(() => encoder.writeByte(-1)).toThrow('out of range');
      expect(() => encoder.writeByte(256)).toThrow('out of range');
    });
  });

  describe('SByte (Int8)', () => {
    it('should encode/decode SByte values', () => {
      const encoder = new BinaryEncoder();
      encoder.writeSByte(-128);
      encoder.writeSByte(0);
      encoder.writeSByte(127);

      const decoder = new BinaryDecoder(encoder.getBuffer());
      expect(decoder.readSByte()).toBe(-128);
      expect(decoder.readSByte()).toBe(0);
      expect(decoder.readSByte()).toBe(127);
    });

    it('should reject out-of-range SByte values', () => {
      const encoder = new BinaryEncoder();
      expect(() => encoder.writeSByte(-129)).toThrow('out of range');
      expect(() => encoder.writeSByte(128)).toThrow('out of range');
    });
  });

  describe('Int16', () => {
    it('should encode/decode Int16 values', () => {
      const encoder = new BinaryEncoder();
      encoder.writeInt16(-32768);
      encoder.writeInt16(0);
      encoder.writeInt16(32767);

      const decoder = new BinaryDecoder(encoder.getBuffer());
      expect(decoder.readInt16()).toBe(-32768);
      expect(decoder.readInt16()).toBe(0);
      expect(decoder.readInt16()).toBe(32767);
    });

    it('should reject out-of-range Int16 values', () => {
      const encoder = new BinaryEncoder();
      expect(() => encoder.writeInt16(-32769)).toThrow('out of range');
      expect(() => encoder.writeInt16(32768)).toThrow('out of range');
    });
  });

  describe('UInt16', () => {
    it('should encode/decode UInt16 values', () => {
      const encoder = new BinaryEncoder();
      encoder.writeUInt16(0);
      encoder.writeUInt16(32768);
      encoder.writeUInt16(65535);

      const decoder = new BinaryDecoder(encoder.getBuffer());
      expect(decoder.readUInt16()).toBe(0);
      expect(decoder.readUInt16()).toBe(32768);
      expect(decoder.readUInt16()).toBe(65535);
    });

    it('should reject out-of-range UInt16 values', () => {
      const encoder = new BinaryEncoder();
      expect(() => encoder.writeUInt16(-1)).toThrow('out of range');
      expect(() => encoder.writeUInt16(65536)).toThrow('out of range');
    });
  });

  describe('UInt32', () => {
    it('should encode/decode UInt32 values', () => {
      const encoder = new BinaryEncoder();
      encoder.writeUInt32(0);
      encoder.writeUInt32(2147483648);
      encoder.writeUInt32(4294967295);

      const decoder = new BinaryDecoder(encoder.getBuffer());
      expect(decoder.readUInt32()).toBe(0);
      expect(decoder.readUInt32()).toBe(2147483648);
      expect(decoder.readUInt32()).toBe(4294967295);
    });

    it('should reject out-of-range UInt32 values', () => {
      const encoder = new BinaryEncoder();
      expect(() => encoder.writeUInt32(-1)).toThrow('out of range');
      expect(() => encoder.writeUInt32(4294967296)).toThrow('out of range');
    });
  });

  describe('Int64', () => {
    it('should encode/decode Int64 values', () => {
      const encoder = new BinaryEncoder();
      encoder.writeInt64(-9223372036854775808n);
      encoder.writeInt64(0n);
      encoder.writeInt64(9223372036854775807n);

      const decoder = new BinaryDecoder(encoder.getBuffer());
      expect(decoder.readInt64()).toBe(-9223372036854775808n);
      expect(decoder.readInt64()).toBe(0n);
      expect(decoder.readInt64()).toBe(9223372036854775807n);
    });
  });

  describe('UInt64', () => {
    it('should encode/decode UInt64 values', () => {
      const encoder = new BinaryEncoder();
      encoder.writeUInt64(0n);
      encoder.writeUInt64(9223372036854775808n);
      encoder.writeUInt64(18446744073709551615n);

      const decoder = new BinaryDecoder(encoder.getBuffer());
      expect(decoder.readUInt64()).toBe(0n);
      expect(decoder.readUInt64()).toBe(9223372036854775808n);
      expect(decoder.readUInt64()).toBe(18446744073709551615n);
    });
  });

  describe('Float', () => {
    it('should encode/decode Float values', () => {
      const encoder = new BinaryEncoder();
      encoder.writeFloat(0.0);
      encoder.writeFloat(3.14159);
      encoder.writeFloat(-3.14159);

      const decoder = new BinaryDecoder(encoder.getBuffer());
      expect(decoder.readFloat()).toBeCloseTo(0.0);
      expect(decoder.readFloat()).toBeCloseTo(3.14159, 5);
      expect(decoder.readFloat()).toBeCloseTo(-3.14159, 5);
    });

    it('should preserve special Float values (NaN, Infinity)', () => {
      const encoder = new BinaryEncoder();
      encoder.writeFloat(NaN);
      encoder.writeFloat(Infinity);
      encoder.writeFloat(-Infinity);

      const decoder = new BinaryDecoder(encoder.getBuffer());
      expect(decoder.readFloat()).toBeNaN();
      expect(decoder.readFloat()).toBe(Infinity);
      expect(decoder.readFloat()).toBe(-Infinity);
    });
  });

  describe('Double', () => {
    it('should encode/decode Double values', () => {
      const encoder = new BinaryEncoder();
      encoder.writeDouble(0.0);
      encoder.writeDouble(3.141592653589793);
      encoder.writeDouble(-3.141592653589793);

      const decoder = new BinaryDecoder(encoder.getBuffer());
      expect(decoder.readDouble()).toBe(0.0);
      expect(decoder.readDouble()).toBeCloseTo(3.141592653589793, 10);
      expect(decoder.readDouble()).toBeCloseTo(-3.141592653589793, 10);
    });

    it('should preserve special Double values (NaN, Infinity)', () => {
      const encoder = new BinaryEncoder();
      encoder.writeDouble(NaN);
      encoder.writeDouble(Infinity);
      encoder.writeDouble(-Infinity);

      const decoder = new BinaryDecoder(encoder.getBuffer());
      expect(decoder.readDouble()).toBeNaN();
      expect(decoder.readDouble()).toBe(Infinity);
      expect(decoder.readDouble()).toBe(-Infinity);
    });
  });

  describe('DateTime', () => {
    it('should encode/decode DateTime values', () => {
      const date1 = new Date('2024-01-01T00:00:00.000Z');
      const date2 = new Date('2000-06-15T12:30:45.123Z');

      const encoder = new BinaryEncoder();
      encoder.writeDateTime(date1);
      encoder.writeDateTime(date2);

      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded1 = decoder.readDateTime();
      const decoded2 = decoder.readDateTime();

      expect(decoded1.getTime()).toBe(date1.getTime());
      expect(decoded2.getTime()).toBe(date2.getTime());
    });

    it('should handle DateTime boundary values', () => {
      const minDate = new Date('1601-01-01T00:00:00.000Z');
      const maxDate = new Date('9999-12-31T23:59:59.999Z');

      const encoder = new BinaryEncoder();
      encoder.writeDateTime(minDate);
      encoder.writeDateTime(maxDate);

      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded1 = decoder.readDateTime();
      const decoded2 = decoder.readDateTime();

      // Allow small rounding differences due to tick precision
      expect(Math.abs(decoded1.getTime() - minDate.getTime())).toBeLessThan(1);
      expect(Math.abs(decoded2.getTime() - maxDate.getTime())).toBeLessThan(1);
    });
  });

  describe('Guid', () => {
    it('should encode/decode Guid values', () => {
      const guid1 = '550e8400-e29b-41d4-a716-446655440000';
      const guid2 = '00000000-0000-0000-0000-000000000000';

      const encoder = new BinaryEncoder();
      encoder.writeGuid(guid1);
      encoder.writeGuid(guid2);

      const decoder = new BinaryDecoder(encoder.getBuffer());
      expect(decoder.readGuid()).toBe(guid1);
      expect(decoder.readGuid()).toBe(guid2);
    });
  });

  describe('ByteString', () => {
    it('should encode/decode ByteString values', () => {
      const bytes1 = Buffer.from([0x01, 0x02, 0x03, 0x04]);
      const bytes2 = Buffer.from([]);

      const encoder = new BinaryEncoder();
      encoder.writeByteString(bytes1);
      encoder.writeByteString(bytes2);
      encoder.writeByteString(null);

      const decoder = new BinaryDecoder(encoder.getBuffer());
      expect(decoder.readByteString()).toEqual(bytes1);
      expect(decoder.readByteString()).toEqual(Buffer.from([]));
      expect(decoder.readByteString()).toBeNull();
    });
  });

  describe('XmlElement', () => {
    it('should encode/decode XmlElement values', () => {
      const xml1 = '<root><child>value</child></root>';
      const xml2 = '<empty/>';

      const encoder = new BinaryEncoder();
      encoder.writeXmlElement(xml1);
      encoder.writeXmlElement(xml2);
      encoder.writeXmlElement(null);

      const decoder = new BinaryDecoder(encoder.getBuffer());
      expect(decoder.readXmlElement()).toBe(xml1);
      expect(decoder.readXmlElement()).toBe(xml2);
      expect(decoder.readXmlElement()).toBeNull();
    });
  });

  describe('Facade Integration', () => {
    it('should encode/decode all primitives via facade', () => {
      const facade = new CodecFacade();
      
      // Register all types
      registerBoolean(facade);
      registerByte(facade);
      registerSByte(facade);
      registerInt16(facade);
      registerUInt16(facade);
      registerInt32(facade);
      registerUInt32(facade);
      registerInt64(facade);
      registerUInt64(facade);
      registerFloat(facade);
      registerDouble(facade);
      registerString(facade);
      registerDateTime(facade);
      registerGuid(facade);
      registerByteString(facade);
      registerXmlElement(facade);

      // Test round-trip for each type
      expect(facade.decode(facade.encode(true, 'i=1'), 'i=1')).toBe(true);
      expect(facade.decode(facade.encode(255, 'i=3'), 'i=3')).toBe(255);
      expect(facade.decode(facade.encode(-128, 'i=2'), 'i=2')).toBe(-128);
      expect(facade.decode(facade.encode(-32768, 'i=4'), 'i=4')).toBe(-32768);
      expect(facade.decode(facade.encode(65535, 'i=5'), 'i=5')).toBe(65535);
      expect(facade.decode(facade.encode(-2147483648, 'i=6'), 'i=6')).toBe(-2147483648);
      expect(facade.decode(facade.encode(4294967295, 'i=7'), 'i=7')).toBe(4294967295);
      expect(facade.decode(facade.encode(-9223372036854775808n, 'i=8'), 'i=8')).toBe(-9223372036854775808n);
      expect(facade.decode(facade.encode(18446744073709551615n, 'i=9'), 'i=9')).toBe(18446744073709551615n);
      expect(facade.decode(facade.encode(3.14, 'i=10'), 'i=10')).toBeCloseTo(3.14, 5);
      expect(facade.decode(facade.encode(3.141592653589793, 'i=11'), 'i=11')).toBeCloseTo(3.141592653589793, 10);
      expect(facade.decode(facade.encode('Hello, OPC UA!', 'i=12'), 'i=12')).toBe('Hello, OPC UA!');
      
      const date = new Date('2024-01-01T00:00:00.000Z');
      const decodedDate = facade.decode<Date>(facade.encode(date, 'i=13'), 'i=13');
      expect(decodedDate.getTime()).toBe(date.getTime());
      
      const guid = '550e8400-e29b-41d4-a716-446655440000';
      expect(facade.decode(facade.encode(guid, 'i=14'), 'i=14')).toBe(guid);
      
      const bytes = Buffer.from([0x01, 0x02, 0x03]);
      expect(facade.decode(facade.encode(bytes, 'i=15'), 'i=15')).toEqual(bytes);
      
      const xml = '<root>test</root>';
      expect(facade.decode(facade.encode(xml, 'i=16'), 'i=16')).toBe(xml);
    });
  });

  describe('Boundary Value Tests (T075a)', () => {
    it('should handle minimum and maximum values for all numeric types', () => {
      const encoder = new BinaryEncoder();
      
      // Byte: 0 to 255
      encoder.writeByte(0);
      encoder.writeByte(255);
      
      // SByte: -128 to 127
      encoder.writeSByte(-128);
      encoder.writeSByte(127);
      
      // Int16: -32768 to 32767
      encoder.writeInt16(-32768);
      encoder.writeInt16(32767);
      
      // UInt16: 0 to 65535
      encoder.writeUInt16(0);
      encoder.writeUInt16(65535);
      
      // Int32: -2147483648 to 2147483647
      encoder.writeInt32(-2147483648);
      encoder.writeInt32(2147483647);
      
      // UInt32: 0 to 4294967295
      encoder.writeUInt32(0);
      encoder.writeUInt32(4294967295);
      
      // Int64: full range
      encoder.writeInt64(-9223372036854775808n);
      encoder.writeInt64(9223372036854775807n);
      
      // UInt64: full range
      encoder.writeUInt64(0n);
      encoder.writeUInt64(18446744073709551615n);

      const decoder = new BinaryDecoder(encoder.getBuffer());
      
      expect(decoder.readByte()).toBe(0);
      expect(decoder.readByte()).toBe(255);
      expect(decoder.readSByte()).toBe(-128);
      expect(decoder.readSByte()).toBe(127);
      expect(decoder.readInt16()).toBe(-32768);
      expect(decoder.readInt16()).toBe(32767);
      expect(decoder.readUInt16()).toBe(0);
      expect(decoder.readUInt16()).toBe(65535);
      expect(decoder.readInt32()).toBe(-2147483648);
      expect(decoder.readInt32()).toBe(2147483647);
      expect(decoder.readUInt32()).toBe(0);
      expect(decoder.readUInt32()).toBe(4294967295);
      expect(decoder.readInt64()).toBe(-9223372036854775808n);
      expect(decoder.readInt64()).toBe(9223372036854775807n);
      expect(decoder.readUInt64()).toBe(0n);
      expect(decoder.readUInt64()).toBe(18446744073709551615n);
    });
  });
});
