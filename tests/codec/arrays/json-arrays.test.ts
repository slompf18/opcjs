/**
 * Tests for JSON Array Encoding.
 * 
 * Tests cover:
 * - Native JSON array syntax [element1, element2, ...]
 * - Arrays of all primitive types
 * - Null array handling (null keyword)
 * - Empty array handling ([])
 * - Nested arrays
 * - Round-trip encoding/decoding
 * 
 * Note: JSON has native array support, so arrays are simply JS arrays converted to JSON.
 * 
 * @module codec/arrays/json-arrays.test
 */

import { describe, it, expect } from 'vitest';
import { JsonEncoder } from '../../../src/codec/json/encoder.js';
import { JsonDecoder } from '../../../src/codec/json/decoder.js';

describe('JSON Arrays - Native Array Syntax', () => {
  it('should encode Int32 array using native JSON array', () => {
    const encoder = new JsonEncoder();
    
    // JSON arrays are just JS arrays
    const values = [10, 20, 30];
    encoder.setValue(values);
    
    const json = encoder.getJson();
    expect(json).toBe('[10,20,30]');
  });

  it('should encode String array using native JSON array', () => {
    const encoder = new JsonEncoder();
    
    const values = ['Hello', 'World', 'OPC UA'];
    encoder.setValue(values);
    
    const json = encoder.getJson();
    expect(json).toBe('["Hello","World","OPC UA"]');
  });

  it('should encode Boolean array using native JSON array', () => {
    const encoder = new JsonEncoder();
    
    const values = [true, false, true, false];
    encoder.setValue(values);
    
    const json = encoder.getJson();
    expect(json).toBe('[true,false,true,false]');
  });

  it('should encode Double array using native JSON array', () => {
    const encoder = new JsonEncoder();
    
    const values = [1.1, 2.2, 3.3];
    encoder.setValue(values);
    
    const json = encoder.getJson();
    expect(json).toBe('[1.1,2.2,3.3]');
  });

  it('should encode mixed type array', () => {
    const encoder = new JsonEncoder();
    
    // JSON allows mixed types in arrays
    const values = [42, 'text', true, null];
    encoder.setValue(values);
    
    const json = encoder.getJson();
    expect(json).toBe('[42,"text",true,null]');
  });

  it('should decode Int32 array from JSON', () => {
    const json = '[10,20,30]';
    const decoder = new JsonDecoder(json);
    
    const values = decoder.getValue();
    expect(Array.isArray(values)).toBe(true);
    expect(values).toEqual([10, 20, 30]);
  });

  it('should decode String array from JSON', () => {
    const json = '["a","b","c"]';
    const decoder = new JsonDecoder(json);
    
    const values = decoder.getValue();
    expect(values).toEqual(['a', 'b', 'c']);
  });

  it('should decode Boolean array from JSON', () => {
    const json = '[true,false,true]';
    const decoder = new JsonDecoder(json);
    
    const values = decoder.getValue();
    expect(values).toEqual([true, false, true]);
  });
});

describe('JSON Arrays - Null and Empty Arrays', () => {
  it('should encode null array as null keyword', () => {
    const encoder = new JsonEncoder();
    
    encoder.setValue(null);
    
    const json = encoder.getJson();
    expect(json).toBe('null');
  });

  it('should encode empty array as []', () => {
    const encoder = new JsonEncoder();
    
    encoder.setValue([]);
    
    const json = encoder.getJson();
    expect(json).toBe('[]');
  });

  it('should decode null from JSON', () => {
    const json = 'null';
    const decoder = new JsonDecoder(json);
    
    const value = decoder.getValue();
    expect(value).toBeNull();
  });

  it('should decode empty array from JSON', () => {
    const json = '[]';
    const decoder = new JsonDecoder(json);
    
    const values = decoder.getValue();
    expect(Array.isArray(values)).toBe(true);
    expect(values).toEqual([]);
  });
});

describe('JSON Arrays - Nested Arrays', () => {
  it('should encode nested arrays', () => {
    const encoder = new JsonEncoder();
    
    const values = [[1, 2], [3, 4], [5, 6]];
    encoder.setValue(values);
    
    const json = encoder.getJson();
    expect(json).toBe('[[1,2],[3,4],[5,6]]');
  });

  it('should decode nested arrays', () => {
    const json = '[[1,2],[3,4]]';
    const decoder = new JsonDecoder(json);
    
    const values = decoder.getValue();
    expect(values).toEqual([[1, 2], [3, 4]]);
  });

  it('should encode array of objects', () => {
    const encoder = new JsonEncoder();
    
    const values = [
      { id: 1, name: 'Item1' },
      { id: 2, name: 'Item2' }
    ];
    encoder.setValue(values);
    
    const json = encoder.getJson();
    const parsed = JSON.parse(json);
    expect(parsed).toEqual(values);
  });

  it('should encode object with array properties', () => {
    const encoder = new JsonEncoder();
    
    const obj = {
      integers: [1, 2, 3],
      strings: ['a', 'b'],
      mixed: [true, 42, 'text']
    };
    encoder.setValue(obj);
    
    const json = encoder.getJson();
    const parsed = JSON.parse(json);
    expect(parsed).toEqual(obj);
  });
});

describe('JSON Arrays - Independent Test per Specification', () => {
  it('should encode Int32 array [10, 20, 30] per OPC UA spec', () => {
    const encoder = new JsonEncoder();
    
    // Independent test from task specification
    const values = [10, 20, 30];
    encoder.setValue(values);
    
    const json = encoder.getJson();
    
    // Verify JSON produces [10,20,30]
    expect(json).toBe('[10,20,30]');
    
    // Verify it decodes correctly
    const decoder = new JsonDecoder(json);
    const decoded = decoder.getValue();
    expect(decoded).toEqual(values);
  });
});

describe('JSON Arrays - Large Arrays', () => {
  it('should handle large Int32 array (1000 elements)', () => {
    const encoder = new JsonEncoder();
    
    const size = 1000;
    const values = Array.from({ length: size }, (_, i) => i);
    encoder.setValue(values);
    
    const json = encoder.getJson();
    
    const decoder = new JsonDecoder(json);
    const decoded = decoder.getValue();
    
    expect(Array.isArray(decoded)).toBe(true);
    expect(decoded.length).toBe(size);
    expect(decoded).toEqual(values);
  });

  it('should handle large String array (500 elements)', () => {
    const encoder = new JsonEncoder();
    
    const size = 500;
    const values = Array.from({ length: size }, (_, i) => `String_${i}`);
    encoder.setValue(values);
    
    const json = encoder.getJson();
    
    const decoder = new JsonDecoder(json);
    const decoded = decoder.getValue();
    
    expect(decoded.length).toBe(size);
    expect(decoded).toEqual(values);
  });

  it('should encode 10k element array efficiently', () => {
    const encoder = new JsonEncoder();
    
    const size = 10000;
    const start = Date.now();
    
    const values = Array.from({ length: size }, (_, i) => i);
    encoder.setValue(values);
    const json = encoder.getJson();
    
    const encodeTime = Date.now() - start;
    
    const decodeStart = Date.now();
    const decoder = new JsonDecoder(json);
    const decoded = decoder.getValue();
    const decodeTime = Date.now() - decodeStart;
    
    expect(decoded.length).toBe(size);
    
    // Should complete in reasonable time (< 100ms per FR-006)
    expect(encodeTime).toBeLessThan(100);
    expect(decodeTime).toBeLessThan(100);
  });
});

describe('JSON Arrays - Round-trip Tests', () => {
  it('should round-trip various array types', () => {
    const testCases = [
      { name: 'Int32', values: [1, 2, 3, 4, 5] },
      { name: 'Boolean', values: [true, false, true] },
      { name: 'String', values: ['a', 'b', 'c'] },
      { name: 'Double', values: [1.1, 2.2, 3.3] },
      { name: 'Mixed', values: [42, 'text', true, null] }
    ];

    for (const { name, values } of testCases) {
      const encoder = new JsonEncoder();
      encoder.setValue(values);
      
      const decoder = new JsonDecoder(encoder.getJson());
      const decoded = decoder.getValue();
      
      expect(decoded).toEqual(values);
    }
  });

  it('should round-trip null, empty, and populated arrays', () => {
    const encoder1 = new JsonEncoder();
    encoder1.setValue(null);
    const decoder1 = new JsonDecoder(encoder1.getJson());
    expect(decoder1.getValue()).toBeNull();
    
    const encoder2 = new JsonEncoder();
    encoder2.setValue([]);
    const decoder2 = new JsonDecoder(encoder2.getJson());
    expect(decoder2.getValue()).toEqual([]);
    
    const encoder3 = new JsonEncoder();
    encoder3.setValue([100, 200, 300]);
    const decoder3 = new JsonDecoder(encoder3.getJson());
    expect(decoder3.getValue()).toEqual([100, 200, 300]);
  });

  it('should round-trip nested structures', () => {
    const data = {
      simpleArray: [1, 2, 3],
      nestedArray: [[1, 2], [3, 4]],
      objectArray: [{ x: 1 }, { x: 2 }],
      nullValue: null,
      emptyArray: []
    };
    
    const encoder = new JsonEncoder();
    encoder.setValue(data);
    
    const decoder = new JsonDecoder(encoder.getJson());
    const decoded = decoder.getValue();
    
    expect(decoded).toEqual(data);
  });
});

describe('JSON Arrays - JSON Format Verification', () => {
  it('should produce valid JSON array syntax', () => {
    const encoder = new JsonEncoder();
    encoder.setValue([1, 2, 3]);
    
    const json = encoder.getJson();
    
    // Verify it's valid JSON
    expect(() => JSON.parse(json)).not.toThrow();
    
    // Verify array syntax
    expect(json).toMatch(/^\[.*\]$/);
  });

  it('should escape special characters in string arrays', () => {
    const encoder = new JsonEncoder();
    
    const values = ['quote"test', 'backslash\\test', 'newline\ntest'];
    encoder.setValue(values);
    
    const json = encoder.getJson();
    
    // JSON.stringify handles escaping automatically
    expect(json).toContain('\\"'); // Escaped quote
    expect(json).toContain('\\\\'); // Escaped backslash
    expect(json).toContain('\\n'); // Escaped newline
    
    const decoder = new JsonDecoder(json);
    const decoded = decoder.getValue();
    
    // Should decode back to original values
    expect(decoded).toEqual(values);
  });

  it('should handle Unicode in string arrays', () => {
    const encoder = new JsonEncoder();
    
    const values = ['Hello 世界', 'Test Ñ', '😀 emoji'];
    encoder.setValue(values);
    
    const json = encoder.getJson();
    
    const decoder = new JsonDecoder(json);
    const decoded = decoder.getValue();
    
    expect(decoded).toEqual(values);
  });

  it('should maintain type information', () => {
    const encoder = new JsonEncoder();
    
    const values = [42, '42', true, null];
    encoder.setValue(values);
    
    const json = encoder.getJson();
    const decoded = JSON.parse(json);
    
    expect(typeof decoded[0]).toBe('number');
    expect(typeof decoded[1]).toBe('string');
    expect(typeof decoded[2]).toBe('boolean');
    expect(decoded[3]).toBeNull();
  });
});

describe('JSON Arrays - Helper Methods', () => {
  it('should encode and decode Int32 array using encodeArray/decodeArray', () => {
    const encoder = new JsonEncoder();
    const values = [10, 20, 30];
    
    encoder.encodeArray(values, (enc, value) => enc.encodeInt32(value));
    
    const json = encoder.getJson();
    expect(json).toBe('[10,20,30]');
    
    const decoder = new JsonDecoder(json);
    const result = decoder.decodeArray((dec) => dec.decodeInt32());
    
    expect(result).toEqual(values);
  });

  it('should encode and decode String array using encodeArray/decodeArray', () => {
    const encoder = new JsonEncoder();
    const values = ['Hello', 'World', 'OPC UA'];
    
    encoder.encodeArray(values, (enc, value) => enc.encodeString(value));
    
    const json = encoder.getJson();
    expect(json).toBe('["Hello","World","OPC UA"]');
    
    const decoder = new JsonDecoder(json);
    const result = decoder.decodeArray((dec) => dec.decodeString());
    
    expect(result).toEqual(values);
  });

  it('should encode and decode Boolean array using encodeArray/decodeArray', () => {
    const encoder = new JsonEncoder();
    const values = [true, false, true, false];
    
    encoder.encodeArray(values, (enc, value) => enc.encodeBoolean(value));
    
    const json = encoder.getJson();
    expect(json).toBe('[true,false,true,false]');
    
    const decoder = new JsonDecoder(json);
    const result = decoder.decodeArray((dec) => dec.decodeBoolean());
    
    expect(result).toEqual(values);
  });

  it('should encode and decode Double array using encodeArray/decodeArray', () => {
    const encoder = new JsonEncoder();
    const values = [1.1, 2.2, 3.3];
    
    encoder.encodeArray(values, (enc, value) => enc.encodeDouble(value));
    
    const json = encoder.getJson();
    expect(json).toBe('[1.1,2.2,3.3]');
    
    const decoder = new JsonDecoder(json);
    const result = decoder.decodeArray((dec) => dec.decodeDouble());
    
    expect(result).toEqual(values);
  });

  it('should handle null arrays with encodeArray/decodeArray', () => {
    const encoder = new JsonEncoder();
    
    encoder.encodeArray(null, (enc, value: number) => enc.encodeInt32(value));
    
    const json = encoder.getJson();
    expect(json).toBe('null');
    
    const decoder = new JsonDecoder(json);
    const result = decoder.decodeArray((dec) => dec.decodeInt32());
    
    expect(result).toBeNull();
  });

  it('should handle empty arrays with encodeArray/decodeArray', () => {
    const encoder = new JsonEncoder();
    
    encoder.encodeArray([], (enc, value: number) => enc.encodeInt32(value));
    
    const json = encoder.getJson();
    expect(json).toBe('[]');
    
    const decoder = new JsonDecoder(json);
    const result = decoder.decodeArray((dec) => dec.decodeInt32());
    
    expect(result).toEqual([]);
  });

  it('should encode and decode Int64 array using encodeArray/decodeArray', () => {
    const encoder = new JsonEncoder();
    const values = [10n, 20n, 30n];
    
    encoder.encodeArray(values, (enc, value) => enc.encodeInt64(value));
    
    const json = encoder.getJson();
    expect(json).toBe('["10","20","30"]');
    
    const decoder = new JsonDecoder(json);
    const result = decoder.decodeArray((dec) => dec.decodeInt64());
    
    expect(result).toEqual(values);
  });

  it('should encode and decode single-element array', () => {
    const encoder = new JsonEncoder();
    const values = [42];
    
    encoder.encodeArray(values, (enc, value) => enc.encodeInt32(value));
    
    const json = encoder.getJson();
    expect(json).toBe('[42]');
    
    const decoder = new JsonDecoder(json);
    const result = decoder.decodeArray((dec) => dec.decodeInt32());
    
    expect(result).toEqual([42]);
  });

  it('should encode and decode large arrays efficiently', () => {
    const encoder = new JsonEncoder();
    const values = Array.from({ length: 100 }, (_, i) => i);
    
    encoder.encodeArray(values, (enc, value) => enc.encodeInt32(value));
    
    const json = encoder.getJson();
    expect(json).toContain('[0,1,2,');
    expect(json).toContain(',98,99]');
    
    const decoder = new JsonDecoder(json);
    const result = decoder.decodeArray((dec) => dec.decodeInt32());
    
    expect(result).toEqual(values);
  });

  it('should reject non-array values when decoding array', () => {
    const json = '42'; // Not an array
    const decoder = new JsonDecoder(json);
    
    expect(() => {
      decoder.decodeArray((dec) => dec.decodeInt32());
    }).toThrow('Expected array or null');
  });
});

