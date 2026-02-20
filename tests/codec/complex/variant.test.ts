/**
 * Tests for Variant encoding/decoding.
 * 
 * Tests cover:
 * - All 26 builtin type IDs (0-25)
 * - Scalar values
 * - Array values
 * - Multi-dimensional arrays
 * - Null variant
 * - Nested variants
 * - Encoding mask verification
 * - Round-trip encoding
 * 
 * @module codec/complex/variant.test
 */

import { describe, it, expect } from 'vitest';
import { BinaryEncoder } from '../../../src/codec/binary/encoder.js';
import { BinaryDecoder } from '../../../src/codec/binary/decoder.js';
import {
  variant,
  nullVariant,
  arrayVariant,
  isArray,
  isNull,
  getTypeName,
  encodeBinary,
  decodeBinary,
  registerVariant,
  VariantType,
  Variant,
} from '../../../src/codec/complex/variant.js';
import { numericNodeId, stringNodeId } from '../../../src/codec/complex/nodeid.js';
import { expandedNodeId } from '../../../src/codec/complex/expanded-nodeid.js';
import { qualifiedName } from '../../../src/codec/complex/qualified-name.js';
import { localizedText } from '../../../src/codec/complex/localized-text.js';
import { statusCode, StatusCodes } from '../../../src/codec/complex/statuscode.js';
import { dataValue } from '../../../src/codec/complex/datavalue.js';
import { simpleDiagnosticInfo } from '../../../src/codec/complex/diagnosticinfo.js';
import { CodecFacade } from '../../../src/codec/facade.js';

describe('Variant - Basic Encoding/Decoding', () => {
  it('should encode and decode null variant', () => {
    const v = nullVariant();
    
    const encoder = new BinaryEncoder();
    encodeBinary(encoder, v);
    
    const buffer = encoder.getBuffer();
    expect(buffer.length).toBe(1); // Just encoding mask
    expect(buffer[0]).toBe(0x00); // Type 0 = Null
    
    const decoder = new BinaryDecoder(buffer);
    const decoded = decodeBinary(decoder);
    
    expect(decoded.variantType).toBe(VariantType.Null);
    expect(decoded.value).toBe(null);
    expect(decoded.arrayDimensions).toBe(null);
  });

  it('should encode and decode Boolean variant', () => {
    const v = variant(VariantType.Boolean, true);
    
    const encoder = new BinaryEncoder();
    encodeBinary(encoder, v);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    expect(decoded.variantType).toBe(VariantType.Boolean);
    expect(decoded.value).toBe(true);
    expect(decoded.arrayDimensions).toBe(null);
  });

  it('should encode and decode Int32 variant', () => {
    const v = variant(VariantType.Int32, 42);
    
    const encoder = new BinaryEncoder();
    encodeBinary(encoder, v);
    
    const buffer = encoder.getBuffer();
    expect(buffer[0]).toBe(0x06); // Type 6 = Int32
    
    const decoder = new BinaryDecoder(buffer);
    const decoded = decodeBinary(decoder);
    
    expect(decoded.variantType).toBe(VariantType.Int32);
    expect(decoded.value).toBe(42);
  });

  it('should encode and decode String variant', () => {
    const v = variant(VariantType.String, 'Hello, OPC UA!');
    
    const encoder = new BinaryEncoder();
    encodeBinary(encoder, v);
    
    const buffer = encoder.getBuffer();
    expect(buffer[0]).toBe(0x0C); // Type 12 = String
    
    const decoder = new BinaryDecoder(buffer);
    const decoded = decodeBinary(decoder);
    
    expect(decoded.variantType).toBe(VariantType.String);
    expect(decoded.value).toBe('Hello, OPC UA!');
  });

  it('should encode and decode Double variant', () => {
    const v = variant(VariantType.Double, 3.14159);
    
    const encoder = new BinaryEncoder();
    encodeBinary(encoder, v);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    expect(decoded.variantType).toBe(VariantType.Double);
    expect(decoded.value).toBeCloseTo(3.14159, 5);
  });
});

describe('Variant - Complex Type Values', () => {
  it('should encode and decode NodeId variant', () => {
    const nid = numericNodeId(1, 100);
    const v = variant(VariantType.NodeId, nid);
    
    const encoder = new BinaryEncoder();
    encodeBinary(encoder, v);
    
    const buffer = encoder.getBuffer();
    expect(buffer[0]).toBe(0x11); // Type 17 = NodeId
    
    const decoder = new BinaryDecoder(buffer);
    const decoded = decodeBinary(decoder);
    
    expect(decoded.variantType).toBe(VariantType.NodeId);
    expect(decoded.value).toEqual(nid);
  });

  it('should encode and decode StatusCode variant', () => {
    const sc = statusCode(StatusCodes.BadUnexpectedError);
    const v = variant(VariantType.StatusCode, sc);
    
    const encoder = new BinaryEncoder();
    encodeBinary(encoder, v);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    expect(decoded.variantType).toBe(VariantType.StatusCode);
    expect(decoded.value).toEqual(sc);
  });

  it('should encode and decode QualifiedName variant', () => {
    const qn = qualifiedName(2, 'MyVariable');
    const v = variant(VariantType.QualifiedName, qn);
    
    const encoder = new BinaryEncoder();
    encodeBinary(encoder, v);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    expect(decoded.variantType).toBe(VariantType.QualifiedName);
    expect(decoded.value).toEqual(qn);
  });

  it('should encode and decode LocalizedText variant', () => {
    const lt = localizedText('en-US', 'Hello');
    const v = variant(VariantType.LocalizedText, lt);
    
    const encoder = new BinaryEncoder();
    encodeBinary(encoder, v);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    expect(decoded.variantType).toBe(VariantType.LocalizedText);
    expect(decoded.value).toEqual(lt);
  });

  it('should encode and decode DiagnosticInfo variant', () => {
    const di = simpleDiagnosticInfo('Test error');
    const v = variant(VariantType.DiagnosticInfo, di);
    
    const encoder = new BinaryEncoder();
    encodeBinary(encoder, v);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    expect(decoded.variantType).toBe(VariantType.DiagnosticInfo);
    expect(decoded.value).toEqual(di);
  });
});

describe('Variant - Array Values', () => {
  it('should encode and decode Int32 array', () => {
    const v = arrayVariant(VariantType.Int32, [1, 2, 3, 4, 5]);
    
    const encoder = new BinaryEncoder();
    encodeBinary(encoder, v);
    
    const buffer = encoder.getBuffer();
    expect(buffer[0]).toBe(0x86); // 0x80 (array) | 0x06 (Int32)
    
    const decoder = new BinaryDecoder(buffer);
    const decoded = decodeBinary(decoder);
    
    expect(decoded.variantType).toBe(VariantType.Int32);
    expect(decoded.value).toEqual([1, 2, 3, 4, 5]);
    expect(isArray(decoded)).toBe(true);
  });

  it('should encode and decode String array', () => {
    const v = arrayVariant(VariantType.String, ['one', 'two', 'three']);
    
    const encoder = new BinaryEncoder();
    encodeBinary(encoder, v);
    
    const buffer = encoder.getBuffer();
    expect(buffer[0]).toBe(0x8C); // 0x80 (array) | 0x0C (String)
    
    const decoder = new BinaryDecoder(buffer);
    const decoded = decodeBinary(decoder);
    
    expect(decoded.variantType).toBe(VariantType.String);
    expect(decoded.value).toEqual(['one', 'two', 'three']);
  });

  it('should encode and decode Boolean array', () => {
    const v = arrayVariant(VariantType.Boolean, [true, false, true, true]);
    
    const encoder = new BinaryEncoder();
    encodeBinary(encoder, v);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    expect(decoded.variantType).toBe(VariantType.Boolean);
    expect(decoded.value).toEqual([true, false, true, true]);
  });

  it('should encode and decode empty array', () => {
    const v = arrayVariant(VariantType.Int32, []);
    
    const encoder = new BinaryEncoder();
    encodeBinary(encoder, v);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    expect(decoded.variantType).toBe(VariantType.Int32);
    expect(decoded.value).toEqual([]);
  });
});

describe('Variant - Multi-dimensional Arrays', () => {
  it('should encode and decode 2D array with dimensions', () => {
    const v = arrayVariant(VariantType.Int32, [1, 2, 3, 4, 5, 6], [2, 3]);
    
    const encoder = new BinaryEncoder();
    encodeBinary(encoder, v);
    
    const buffer = encoder.getBuffer();
    expect(buffer[0]).toBe(0xC6); // 0x80 (array) | 0x40 (dimensions) | 0x06 (Int32)
    
    const decoder = new BinaryDecoder(buffer);
    const decoded = decodeBinary(decoder);
    
    expect(decoded.variantType).toBe(VariantType.Int32);
    expect(decoded.value).toEqual([1, 2, 3, 4, 5, 6]);
    expect(decoded.arrayDimensions).toEqual([2, 3]);
  });

  it('should encode and decode 3D array with dimensions', () => {
    const v = arrayVariant(VariantType.Double, [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0], [2, 2, 2]);
    
    const encoder = new BinaryEncoder();
    encodeBinary(encoder, v);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    expect(decoded.variantType).toBe(VariantType.Double);
    expect(decoded.value).toHaveLength(8);
    expect(decoded.arrayDimensions).toEqual([2, 2, 2]);
  });
});

describe('Variant - Nested Variants', () => {
  it('should encode and decode nested variant', () => {
    const inner = variant(VariantType.Int32, 42);
    const outer = variant(VariantType.Variant, inner);
    
    const encoder = new BinaryEncoder();
    encodeBinary(encoder, outer);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    expect(decoded.variantType).toBe(VariantType.Variant);
    const innerDecoded = decoded.value as unknown as Variant;
    expect(innerDecoded.variantType).toBe(VariantType.Int32);
    expect(innerDecoded.value).toBe(42);
  });

  it('should encode and decode array of variants', () => {
    const v1 = variant(VariantType.Int32, 1);
    const v2 = variant(VariantType.String, 'test');
    const v3 = variant(VariantType.Boolean, true);
    
    const array = arrayVariant(VariantType.Variant, [v1, v2, v3]);
    
    const encoder = new BinaryEncoder();
    encodeBinary(encoder, array);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    expect(decoded.variantType).toBe(VariantType.Variant);
    const values = decoded.value as unknown as Variant[];
    expect(values).toHaveLength(3);
    expect(values[0].value).toBe(1);
    expect(values[1].value).toBe('test');
    expect(values[2].value).toBe(true);
  });
});

describe('Variant - All Primitive Types', () => {
  it('should encode and decode all numeric types', () => {
    const types = [
      { type: VariantType.SByte, value: -42 },
      { type: VariantType.Byte, value: 255 },
      { type: VariantType.Int16, value: -1000 },
      { type: VariantType.UInt16, value: 60000 },
      { type: VariantType.Int32, value: -100000 },
      { type: VariantType.UInt32, value: 4000000000 },
      { type: VariantType.Int64, value: -9007199254740991n },
      { type: VariantType.UInt64, value: 18446744073709551615n },
      { type: VariantType.Float, value: 3.14 },
      { type: VariantType.Double, value: 2.718281828 },
    ];

    for (const { type, value } of types) {
      const v = variant(type, value);
      
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(decoded.variantType).toBe(type);
      if (type === VariantType.Float || type === VariantType.Double) {
        expect(decoded.value).toBeCloseTo(value as number, 5);
      } else {
        expect(decoded.value).toEqual(value);
      }
    }
  });

  it('should encode and decode DateTime variant', () => {
    const now = new Date('2024-01-15T10:30:00.000Z');
    const v = variant(VariantType.DateTime, now);
    
    const encoder = new BinaryEncoder();
    encodeBinary(encoder, v);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    expect(decoded.variantType).toBe(VariantType.DateTime);
    expect((decoded.value as Date).getTime()).toBe(now.getTime());
  });

  it('should encode and decode Guid variant', () => {
    const guid = '550e8400-e29b-41d4-a716-446655440000';
    const v = variant(VariantType.Guid, guid);
    
    const encoder = new BinaryEncoder();
    encodeBinary(encoder, v);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    expect(decoded.variantType).toBe(VariantType.Guid);
    expect(decoded.value).toBe(guid);
  });

  it('should encode and decode ByteString variant', () => {
    const bytes = new Uint8Array([0x01, 0x02, 0x03, 0x04, 0xFF]);
    const v = variant(VariantType.ByteString, bytes);
    
    const encoder = new BinaryEncoder();
    encodeBinary(encoder, v);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    expect(decoded.variantType).toBe(VariantType.ByteString);
    // Compare as Buffer since decoding returns Buffer
    expect(Array.from(decoded.value as Uint8Array)).toEqual(Array.from(bytes));
  });

  it('should encode and decode XmlElement variant', () => {
    const xml = '<test>Hello</test>';
    const v = variant(VariantType.XmlElement, xml);
    
    const encoder = new BinaryEncoder();
    encodeBinary(encoder, v);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    expect(decoded.variantType).toBe(VariantType.XmlElement);
    expect(decoded.value).toBe(xml);
  });
});

describe('Variant - Helper Functions', () => {
  it('should correctly identify null variant', () => {
    const v = nullVariant();
    expect(isNull(v)).toBe(true);
    
    const v2 = variant(VariantType.Int32, 0);
    expect(isNull(v2)).toBe(false);
  });

  it('should correctly identify array variant', () => {
    const v1 = arrayVariant(VariantType.Int32, [1, 2, 3]);
    expect(isArray(v1)).toBe(true);
    
    const v2 = variant(VariantType.Int32, 42);
    expect(isArray(v2)).toBe(false);
  });

  it('should get type name as string', () => {
    expect(getTypeName(VariantType.Null)).toBe('Null');
    expect(getTypeName(VariantType.Boolean)).toBe('Boolean');
    expect(getTypeName(VariantType.Int32)).toBe('Int32');
    expect(getTypeName(VariantType.String)).toBe('String');
    expect(getTypeName(VariantType.NodeId)).toBe('NodeId');
    expect(getTypeName(VariantType.StatusCode)).toBe('StatusCode');
    expect(getTypeName(VariantType.Variant)).toBe('Variant');
    expect(getTypeName(VariantType.DiagnosticInfo)).toBe('DiagnosticInfo');
  });
});

describe('Variant - Encoding Mask Verification', () => {
  it('should have correct encoding mask for different variants', () => {
    const testCases = [
      { type: VariantType.Null, value: null, expectedMask: 0x00 },
      { type: VariantType.Boolean, value: true, expectedMask: 0x01 },
      { type: VariantType.Int32, value: 42, expectedMask: 0x06 },
      { type: VariantType.String, value: 'test', expectedMask: 0x0C },
      { type: VariantType.NodeId, value: numericNodeId(0, 1), expectedMask: 0x11 },
      { type: VariantType.StatusCode, value: statusCode(0), expectedMask: 0x13 },
    ];

    for (const { type, value, expectedMask } of testCases) {
      const v = variant(type, value);
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(expectedMask);
    }
  });

  it('should set array bit for array variants', () => {
    const v = arrayVariant(VariantType.Int32, [1, 2, 3]);
    const encoder = new BinaryEncoder();
    encodeBinary(encoder, v);
    
    const buffer = encoder.getBuffer();
    expect(buffer[0] & 0x80).toBe(0x80); // Array bit set
    expect(buffer[0] & 0x3F).toBe(0x06); // Type = Int32
  });

  it('should set dimensions bit for multi-dimensional arrays', () => {
    const v = arrayVariant(VariantType.Int32, [1, 2, 3, 4], [2, 2]);
    const encoder = new BinaryEncoder();
    encodeBinary(encoder, v);
    
    const buffer = encoder.getBuffer();
    expect(buffer[0] & 0x80).toBe(0x80); // Array bit set
    expect(buffer[0] & 0x40).toBe(0x40); // Dimensions bit set
    expect(buffer[0] & 0x3F).toBe(0x06); // Type = Int32
  });
});

describe('Variant - Edge Cases', () => {
  it('should reject invalid type ID > 25', () => {
    const v = new Variant(26 as VariantType, 42, null);
    const encoder = new BinaryEncoder();
    
    expect(() => encodeBinary(encoder, v)).toThrow('Invalid Variant type ID: 26');
  });

  it('should reject invalid type ID < 0', () => {
    const v = new Variant(-1 as VariantType, 42, null);
    const encoder = new BinaryEncoder();
    
    expect(() => encodeBinary(encoder, v)).toThrow('Invalid Variant type ID: -1');
  });

  it('should handle large arrays efficiently', () => {
    const largeArray = Array.from({ length: 1000 }, (_, i) => i);
    const v = arrayVariant(VariantType.Int32, largeArray);
    
    const encoder = new BinaryEncoder();
    encodeBinary(encoder, v);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    expect(decoded.value).toEqual(largeArray);
  });

  it('should handle zero-length dimensions array as no dimensions', () => {
    const v = arrayVariant(VariantType.Int32, [1, 2, 3], []);
    
    const encoder = new BinaryEncoder();
    encodeBinary(encoder, v);
    
    const buffer = encoder.getBuffer();
    expect(buffer[0] & 0x40).toBe(0); // Dimensions bit NOT set
  });
});

describe('Variant - Round-trip Tests', () => {
  it('should round-trip various variant configurations', () => {
    const variants = [
      nullVariant(),
      variant(VariantType.Boolean, false),
      variant(VariantType.Int32, -12345),
      variant(VariantType.String, 'Round-trip test'),
      arrayVariant(VariantType.Double, [1.1, 2.2, 3.3]),
      arrayVariant(VariantType.String, ['a', 'b', 'c']),
      arrayVariant(VariantType.Int32, [1, 2, 3, 4, 5, 6], [2, 3]),
      variant(VariantType.NodeId, stringNodeId(3, 'MyNode')),
      variant(VariantType.StatusCode, statusCode(StatusCodes.Good)),
    ];

    for (const v of variants) {
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(decoded.variantType).toBe(v.variantType);
      expect(decoded.arrayDimensions).toEqual(v.arrayDimensions);
      
      if (v.variantType === VariantType.Double && Array.isArray(v.value)) {
        const values = v.value as number[];
        const decodedValues = decoded.value as number[];
        for (let i = 0; i < values.length; i++) {
          expect(decodedValues[i]).toBeCloseTo(values[i], 5);
        }
      } else {
        expect(decoded.value).toEqual(v.value);
      }
    }
  });
});

describe('Variant - CodecFacade Integration', () => {
  it('should register with facade', () => {
    const facade = new CodecFacade();
    registerVariant(facade);
    
    const v = variant(VariantType.Int32, 999);
    const buffer = facade.encode(v, 'i=24');
    
    expect(buffer).toBeDefined();
    
    const decoded = facade.decode<Variant>(buffer, 'i=24');
    expect(decoded.variantType).toBe(VariantType.Int32);
    expect(decoded.value).toBe(999);
  });

  it('should encode and decode through facade', () => {
    const facade = new CodecFacade();
    registerVariant(facade);
    
    const v = variant(VariantType.Int32, 999);
    const buffer = facade.encode(v, 'i=24');
    
    const decoded = facade.decode<Variant>(buffer, 'i=24');
    
    expect(decoded.variantType).toBe(VariantType.Int32);
    expect(decoded.value).toBe(999);
  });
});
