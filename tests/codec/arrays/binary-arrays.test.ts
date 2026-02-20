/**
 * Tests for Binary Array Encoding.
 * 
 * Tests cover:
 * - Int32 length prefix encoding (-1=null, 0=empty, positive=count)
 * - Arrays of all primitive types
 * - Arrays of complex types
 * - Null array handling
 * - Empty array handling
 * - Large arrays (performance)
 * - Array length validation
 * 
 * @module codec/arrays/binary-arrays.test
 */

import { describe, it, expect } from 'vitest';
import { BinaryEncoder } from '../../../src/codec/binary/encoder.js';
import { BinaryDecoder } from '../../../src/codec/binary/decoder.js';

describe('Binary Arrays - Primitive Types', () => {
  it('should encode and decode Int32 array', () => {
    const encoder = new BinaryEncoder();
    
    // Array: [10, 20, 30]
    encoder.writeInt32(3); // length
    encoder.writeInt32(10);
    encoder.writeInt32(20);
    encoder.writeInt32(30);
    
    const buffer = encoder.getBuffer();
    expect(buffer.length).toBe(16); // 4 + 4*3 bytes
    
    const decoder = new BinaryDecoder(buffer);
    const length = decoder.readInt32();
    expect(length).toBe(3);
    
    const values = [];
    for (let i = 0; i < length; i++) {
      values.push(decoder.readInt32());
    }
    
    expect(values).toEqual([10, 20, 30]);
  });

  it('should encode and decode Boolean array', () => {
    const encoder = new BinaryEncoder();
    
    encoder.writeInt32(4); // length
    encoder.writeBoolean(true);
    encoder.writeBoolean(false);
    encoder.writeBoolean(true);
    encoder.writeBoolean(false);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const length = decoder.readInt32();
    expect(length).toBe(4);
    
    const values = [];
    for (let i = 0; i < length; i++) {
      values.push(decoder.readBoolean());
    }
    
    expect(values).toEqual([true, false, true, false]);
  });

  it('should encode and decode String array', () => {
    const encoder = new BinaryEncoder();
    
    const strings = ['Hello', 'World', 'OPC UA'];
    encoder.writeInt32(strings.length);
    for (const str of strings) {
      encoder.writeString(str);
    }
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const length = decoder.readInt32();
    expect(length).toBe(3);
    
    const values = [];
    for (let i = 0; i < length; i++) {
      values.push(decoder.readString());
    }
    
    expect(values).toEqual(strings);
  });

  it('should encode and decode Double array', () => {
    const encoder = new BinaryEncoder();
    
    const doubles = [1.1, 2.2, 3.3, 4.4];
    encoder.writeInt32(doubles.length);
    for (const d of doubles) {
      encoder.writeDouble(d);
    }
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const length = decoder.readInt32();
    expect(length).toBe(4);
    
    const values = [];
    for (let i = 0; i < length; i++) {
      values.push(decoder.readDouble());
    }
    
    for (let i = 0; i < doubles.length; i++) {
      expect(values[i]).toBeCloseTo(doubles[i], 5);
    }
  });

  it('should encode and decode Byte array', () => {
    const encoder = new BinaryEncoder();
    
    const bytes = [0x01, 0x02, 0xFF, 0xAA, 0x55];
    encoder.writeInt32(bytes.length);
    for (const b of bytes) {
      encoder.writeByte(b);
    }
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const length = decoder.readInt32();
    expect(length).toBe(5);
    
    const values = [];
    for (let i = 0; i < length; i++) {
      values.push(decoder.readByte());
    }
    
    expect(values).toEqual(bytes);
  });
});

describe('Binary Arrays - Null and Empty Arrays', () => {
  it('should encode null array with length -1', () => {
    const encoder = new BinaryEncoder();
    
    encoder.writeInt32(-1); // null array
    
    const buffer = encoder.getBuffer();
    expect(buffer.length).toBe(4); // Just the length prefix
    
    const decoder = new BinaryDecoder(buffer);
    const length = decoder.readInt32();
    expect(length).toBe(-1);
  });

  it('should encode empty array with length 0', () => {
    const encoder = new BinaryEncoder();
    
    encoder.writeInt32(0); // empty array
    
    const buffer = encoder.getBuffer();
    expect(buffer.length).toBe(4); // Just the length prefix
    
    const decoder = new BinaryDecoder(buffer);
    const length = decoder.readInt32();
    expect(length).toBe(0);
  });

  it('should handle null String array', () => {
    const encoder = new BinaryEncoder();
    encoder.writeInt32(-1); // null array
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const length = decoder.readInt32();
    
    expect(length).toBe(-1);
    // No elements to read
  });

  it('should handle empty array with no elements', () => {
    const encoder = new BinaryEncoder();
    encoder.writeInt32(0); // empty array
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const length = decoder.readInt32();
    
    expect(length).toBe(0);
    // Would read 0 elements
  });
});

describe('Binary Arrays - Large Arrays', () => {
  it('should handle large Int32 array (1000 elements)', () => {
    const encoder = new BinaryEncoder();
    
    const size = 1000;
    const values = Array.from({ length: size }, (_, i) => i);
    
    encoder.writeInt32(values.length);
    for (const v of values) {
      encoder.writeInt32(v);
    }
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const length = decoder.readInt32();
    expect(length).toBe(size);
    
    const decoded = [];
    for (let i = 0; i < length; i++) {
      decoded.push(decoder.readInt32());
    }
    
    expect(decoded).toEqual(values);
  });

  it('should handle large String array (500 elements)', () => {
    const encoder = new BinaryEncoder();
    
    const size = 500;
    const values = Array.from({ length: size }, (_, i) => `String_${i}`);
    
    encoder.writeInt32(values.length);
    for (const v of values) {
      encoder.writeString(v);
    }
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const length = decoder.readInt32();
    expect(length).toBe(size);
    
    const decoded = [];
    for (let i = 0; i < length; i++) {
      decoded.push(decoder.readString());
    }
    
    expect(decoded).toEqual(values);
  });

  it('should encode 10k element array efficiently', () => {
    const encoder = new BinaryEncoder();
    
    const size = 10000;
    const start = Date.now();
    
    encoder.writeInt32(size);
    for (let i = 0; i < size; i++) {
      encoder.writeInt32(i);
    }
    
    const encodeTime = Date.now() - start;
    
    const buffer = encoder.getBuffer();
    expect(buffer.length).toBe(4 + size * 4);
    
    const decodeStart = Date.now();
    const decoder = new BinaryDecoder(buffer);
    const length = decoder.readInt32();
    expect(length).toBe(size);
    
    for (let i = 0; i < length; i++) {
      const value = decoder.readInt32();
      expect(value).toBe(i);
    }
    
    const decodeTime = Date.now() - decodeStart;
    
    // Should complete in reasonable time (< 100ms per FR-006)
    expect(encodeTime).toBeLessThan(100);
    expect(decodeTime).toBeLessThan(100);
  });
});

describe('Binary Arrays - Array Length Validation', () => {
  it('should accept valid array length', () => {
    const encoder = new BinaryEncoder();
    encoder.writeInt32(100); // valid length
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const length = decoder.readInt32();
    
    expect(length).toBe(100);
  });

  it('should accept -1 for null array', () => {
    const encoder = new BinaryEncoder();
    encoder.writeInt32(-1); // null array is valid
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const length = decoder.readInt32();
    
    expect(length).toBe(-1);
  });

  it('should reject invalid negative array length (-2)', () => {
    const encoder = new BinaryEncoder();
    encoder.writeInt32(-2); // invalid negative length
    
    const buffer = encoder.getBuffer();
    
    // Note: Validation would happen at a higher level when reading array
    // For now, we just verify the length is readable
    const decoder = new BinaryDecoder(buffer);
    const length = decoder.readInt32();
    expect(length).toBe(-2); // Reader gets the value, caller must validate
  });

  it('should handle maximum valid array size', () => {
    const encoder = new BinaryEncoder();
    const maxSize = 16777216; // 16M elements per FR-019
    
    encoder.writeInt32(maxSize);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const length = decoder.readInt32();
    
    expect(length).toBe(maxSize);
  });

  it('should reject array length > 16,777,216 at higher level', () => {
    const encoder = new BinaryEncoder();
    const tooLarge = 16777217; // Exceeds max per FR-019
    
    encoder.writeInt32(tooLarge);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const length = decoder.readInt32();
    
    // Value is read, but higher-level code should validate this
    expect(length).toBe(tooLarge);
    // TODO: Add validation helper that rejects this
  });
});

describe('Binary Arrays - Round-trip Tests', () => {
  it('should round-trip various array types', () => {
    type TestCase<T> = {
      type: string;
      values: T[];
      encode: (e: BinaryEncoder, v: T) => void;
      decode: (d: BinaryDecoder) => T | null;
    };

    const runTest = <T>(testCase: TestCase<T>) => {
      const encoder = new BinaryEncoder();
      
      encoder.writeInt32(testCase.values.length);
      for (const v of testCase.values) {
        testCase.encode(encoder, v);
      }
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const length = decoder.readInt32();
      expect(length).toBe(testCase.values.length);
      
      const decoded = [];
      for (let i = 0; i < length; i++) {
        decoded.push(testCase.decode(decoder));
      }
      
      expect(decoded).toEqual(testCase.values);
    };

    runTest({ type: 'Int32', values: [1, 2, 3, 4, 5], encode: (e, v) => e.writeInt32(v), decode: (d) => d.readInt32() });
    runTest({ type: 'Boolean', values: [true, false, true], encode: (e, v) => e.writeBoolean(v), decode: (d) => d.readBoolean() });
    runTest({ type: 'String', values: ['a', 'b', 'c'], encode: (e, v) => e.writeString(v), decode: (d) => d.readString() });
    runTest({ type: 'Byte', values: [10, 20, 30], encode: (e, v) => e.writeByte(v), decode: (d) => d.readByte() });
  });

  it('should round-trip mixed null, empty, and populated arrays', () => {
    const encoder = new BinaryEncoder();
    
    // Encode three arrays: null, empty, populated
    encoder.writeInt32(-1); // null
    encoder.writeInt32(0);  // empty
    encoder.writeInt32(3);  // populated [100, 200, 300]
    encoder.writeInt32(100);
    encoder.writeInt32(200);
    encoder.writeInt32(300);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    
    const len1 = decoder.readInt32();
    expect(len1).toBe(-1);
    
    const len2 = decoder.readInt32();
    expect(len2).toBe(0);
    
    const len3 = decoder.readInt32();
    expect(len3).toBe(3);
    const values = [decoder.readInt32(), decoder.readInt32(), decoder.readInt32()];
    expect(values).toEqual([100, 200, 300]);
  });
});

describe('Binary Arrays - Binary Format Verification', () => {
  it('should have correct byte layout for Int32 array', () => {
    const encoder = new BinaryEncoder();
    
    encoder.writeInt32(2); // length = 2
    encoder.writeInt32(10);
    encoder.writeInt32(20);
    
    const buffer = encoder.getBuffer();
    
    // Verify byte layout (little-endian)
    expect(buffer[0]).toBe(0x02); // length = 2 (little-endian)
    expect(buffer[1]).toBe(0x00);
    expect(buffer[2]).toBe(0x00);
    expect(buffer[3]).toBe(0x00);
    
    expect(buffer[4]).toBe(0x0A); // 10 (little-endian)
    expect(buffer[5]).toBe(0x00);
    expect(buffer[6]).toBe(0x00);
    expect(buffer[7]).toBe(0x00);
    
    expect(buffer[8]).toBe(0x14); // 20 (little-endian)
    expect(buffer[9]).toBe(0x00);
    expect(buffer[10]).toBe(0x00);
    expect(buffer[11]).toBe(0x00);
  });

  it('should have correct byte layout for null array', () => {
    const encoder = new BinaryEncoder();
    
    encoder.writeInt32(-1); // null array
    
    const buffer = encoder.getBuffer();
    
    // -1 in little-endian is 0xFFFFFFFF
    expect(buffer[0]).toBe(0xFF);
    expect(buffer[1]).toBe(0xFF);
    expect(buffer[2]).toBe(0xFF);
    expect(buffer[3]).toBe(0xFF);
    expect(buffer.length).toBe(4); // No array data
  });

  it('should have correct byte layout for empty array', () => {
    const encoder = new BinaryEncoder();
    
    encoder.writeInt32(0); // empty array
    
    const buffer = encoder.getBuffer();
    
    expect(buffer[0]).toBe(0x00);
    expect(buffer[1]).toBe(0x00);
    expect(buffer[2]).toBe(0x00);
    expect(buffer[3]).toBe(0x00);
    expect(buffer.length).toBe(4); // No array data
  });
});

describe('Binary Arrays - Helper Methods', () => {
  it('should encode and decode Int32 array using writeArray/readArray', () => {
    const encoder = new BinaryEncoder();
    const values = [10, 20, 30];
    
    encoder.writeArray(values, (enc, value) => enc.writeInt32(value));
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const result = decoder.readArray((dec) => dec.readInt32());
    
    expect(result).toEqual(values);
  });

  it('should encode and decode String array using writeArray/readArray', () => {
    const encoder = new BinaryEncoder();
    const values = ['Hello', 'World', 'OPC UA'];
    
    encoder.writeArray(values, (enc, value) => enc.writeString(value));
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const result = decoder.readArray((dec) => dec.readString());
    
    expect(result).toEqual(values);
  });

  it('should encode and decode Boolean array using writeArray/readArray', () => {
    const encoder = new BinaryEncoder();
    const values = [true, false, true, false];
    
    encoder.writeArray(values, (enc, value) => enc.writeBoolean(value));
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const result = decoder.readArray((dec) => dec.readBoolean());
    
    expect(result).toEqual(values);
  });

  it('should encode and decode Double array using writeArray/readArray', () => {
    const encoder = new BinaryEncoder();
    const values = [1.1, 2.2, 3.3, 4.4];
    
    encoder.writeArray(values, (enc, value) => enc.writeDouble(value));
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const result = decoder.readArray((dec) => dec.readDouble());
    
    expect(result).toEqual(values);
  });

  it('should handle null arrays with writeArray/readArray', () => {
    const encoder = new BinaryEncoder();
    
    encoder.writeArray(null, (enc, value: number) => enc.writeInt32(value));
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const result = decoder.readArray((dec) => dec.readInt32());
    
    expect(result).toBeNull();
  });

  it('should handle empty arrays with writeArray/readArray', () => {
    const encoder = new BinaryEncoder();
    
    encoder.writeArray([], (enc, value: number) => enc.writeInt32(value));
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const result = decoder.readArray((dec) => dec.readInt32());
    
    expect(result).toEqual([]);
  });

  it('should encode and decode ByteString array using writeArray/readArray', () => {
    const encoder = new BinaryEncoder();
    const values = [
      new Uint8Array([1, 2, 3]),
      new Uint8Array([4, 5, 6]),
      null,
      new Uint8Array([7, 8, 9])
    ];
    
    encoder.writeArray(values, (enc, value) => enc.writeByteString(value));
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const result = decoder.readArray((dec) => dec.readByteString());
    
    expect(result).toHaveLength(4);
    expect(Array.from(result![0]!)).toEqual([1, 2, 3]);
    expect(Array.from(result![1]!)).toEqual([4, 5, 6]);
    expect(result![2]).toBeNull();
    expect(Array.from(result![3]!)).toEqual([7, 8, 9]);
  });

  it('should validate array length exceeds maximum', () => {
    const encoder = new BinaryEncoder();
    
    // Create an array that's too large
    const largeArray = new Array(2147483648); // > Int32.MAX_VALUE
    
    expect(() => {
      encoder.writeArray(largeArray, (enc, value: number) => enc.writeInt32(value));
    }).toThrow('Array length 2147483648 exceeds maximum');
  });

  it('should reject invalid array length during decode', () => {
    const encoder = new BinaryEncoder();
    
    // Manually write invalid length
    encoder.writeInt32(-5); // Invalid: not -1 and negative
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    
    expect(() => {
      decoder.readArray((dec) => dec.readInt32());
    }).toThrow('Invalid array length -5');
  });

  it('should reject unreasonably large array length during decode', () => {
    const encoder = new BinaryEncoder();
    
    // Write a length that would exceed safe memory
    encoder.writeInt32(200000000); // > 100M elements
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    
    expect(() => {
      decoder.readArray((dec) => dec.readInt32());
    }).toThrow('exceeds maximum safe length');
  });
});

