/**
 * @fileoverview Tests for Binary encoder/decoder basic primitives
 * @module codec/primitives
 */

import { describe, it, expect } from 'vitest';
import { BinaryEncoder } from '../../../src/codec/binary/encoder.js';
import { BinaryDecoder } from '../../../src/codec/binary/decoder.js';

describe('BinaryEncoder/Decoder - Basic Primitives', () => {
  describe('Boolean', () => {
    it('should encode and decode true', () => {
      const encoder = new BinaryEncoder();
      encoder.writeBoolean(true);
      
      const buffer = encoder.getBuffer();
      expect(buffer.length).toBe(1);
      expect(buffer[0]).toBe(0x01);

      const decoder = new BinaryDecoder(buffer);
      const value = decoder.readBoolean();
      expect(value).toBe(true);
    });

    it('should encode and decode false', () => {
      const encoder = new BinaryEncoder();
      encoder.writeBoolean(false);
      
      const buffer = encoder.getBuffer();
      expect(buffer.length).toBe(1);
      expect(buffer[0]).toBe(0x00);

      const decoder = new BinaryDecoder(buffer);
      const value = decoder.readBoolean();
      expect(value).toBe(false);
    });
  });

  describe('Int32', () => {
    it('should encode and decode 42', () => {
      const encoder = new BinaryEncoder();
      encoder.writeInt32(42);
      
      const buffer = encoder.getBuffer();
      expect(buffer.length).toBe(4);
      // Little-endian: 0x2A 0x00 0x00 0x00
      expect(buffer[0]).toBe(0x2A);
      expect(buffer[1]).toBe(0x00);
      expect(buffer[2]).toBe(0x00);
      expect(buffer[3]).toBe(0x00);

      const decoder = new BinaryDecoder(buffer);
      const value = decoder.readInt32();
      expect(value).toBe(42);
    });

    it('should encode and decode negative values', () => {
      const encoder = new BinaryEncoder();
      encoder.writeInt32(-1);
      
      const buffer = encoder.getBuffer();
      const decoder = new BinaryDecoder(buffer);
      const value = decoder.readInt32();
      expect(value).toBe(-1);
    });

    it('should encode and decode Int32.MinValue', () => {
      const encoder = new BinaryEncoder();
      encoder.writeInt32(-2147483648);
      
      const buffer = encoder.getBuffer();
      const decoder = new BinaryDecoder(buffer);
      const value = decoder.readInt32();
      expect(value).toBe(-2147483648);
    });

    it('should encode and decode Int32.MaxValue', () => {
      const encoder = new BinaryEncoder();
      encoder.writeInt32(2147483647);
      
      const buffer = encoder.getBuffer();
      const decoder = new BinaryDecoder(buffer);
      const value = decoder.readInt32();
      expect(value).toBe(2147483647);
    });
  });

  describe('String', () => {
    it('should encode and decode "Hello"', () => {
      const encoder = new BinaryEncoder();
      encoder.writeString('Hello');
      
      const buffer = encoder.getBuffer();
      // 4 bytes length + 5 bytes UTF-8
      expect(buffer.length).toBe(9);

      const decoder = new BinaryDecoder(buffer);
      const value = decoder.readString();
      expect(value).toBe('Hello');
    });

    it('should encode and decode null string', () => {
      const encoder = new BinaryEncoder();
      encoder.writeString(null);
      
      const buffer = encoder.getBuffer();
      expect(buffer.length).toBe(4); // -1 as Int32

      const decoder = new BinaryDecoder(buffer);
      const value = decoder.readString();
      expect(value).toBeNull();
    });

    it('should encode and decode empty string', () => {
      const encoder = new BinaryEncoder();
      encoder.writeString('');
      
      const buffer = encoder.getBuffer();
      expect(buffer.length).toBe(4); // 0 as Int32

      const decoder = new BinaryDecoder(buffer);
      const value = decoder.readString();
      expect(value).toBe('');
    });
  });

  describe('Float', () => {
    it('should encode and decode Float.NaN', () => {
      const encoder = new BinaryEncoder();
      encoder.writeFloat(NaN);
      
      const buffer = encoder.getBuffer();
      const decoder = new BinaryDecoder(buffer);
      const value = decoder.readFloat();
      expect(Number.isNaN(value)).toBe(true);
    });

    it('should encode and decode Float.Infinity', () => {
      const encoder = new BinaryEncoder();
      encoder.writeFloat(Infinity);
      
      const buffer = encoder.getBuffer();
      const decoder = new BinaryDecoder(buffer);
      const value = decoder.readFloat();
      expect(value).toBe(Infinity);
    });

    it('should encode and decode Float.-Infinity', () => {
      const encoder = new BinaryEncoder();
      encoder.writeFloat(-Infinity);
      
      const buffer = encoder.getBuffer();
      const decoder = new BinaryDecoder(buffer);
      const value = decoder.readFloat();
      expect(value).toBe(-Infinity);
    });
  });

  describe('Buffer Validation (FR-018)', () => {
    it('should throw error when reading past buffer end', () => {
      const encoder = new BinaryEncoder();
      encoder.writeInt32(42);
      
      const buffer = encoder.getBuffer();
      const decoder = new BinaryDecoder(buffer);
      
      decoder.readInt32(); // This should succeed
      
      // Try to read another Int32, should fail
      expect(() => decoder.readInt32()).toThrow(/Buffer underflow/);
    });
  });

  describe('Length Validation (FR-019)', () => {
    it('should reject string longer than 16,777,216 bytes', () => {
      const encoder = new BinaryEncoder();
      const longString = 'a'.repeat(16777217);
      
      expect(() => encoder.writeString(longString)).toThrow(/exceeds maximum allowed length/);
    });
  });
});
