/**
 * Tests for Variant XML encoding/decoding (US7).
 * 
 * Validates:
 * - Type-specific element names (e.g., <Int32>42</Int32>)
 * - Array encoding with ListOf prefix
 * - Null variant encoding
 * - Round-trip encoding/decoding for all types
 * - XML format compliance per OPC UA specification
 * 
 * Tasks: T433-T434 (Phase 9: Variant Type Discrimination)
 */

import { describe, it, expect } from 'vitest';
import { XmlEncoder } from '../../../src/codec/xml/encoder.js';
import { XmlDecoder } from '../../../src/codec/xml/decoder.js';
import * as VariantCodec from '../../../src/codec/complex/variant.js';
import { Variant, VariantType } from '../../../src/types/src/index.js';
import { statusCode } from '../../../src/codec/complex/statuscode.js';
import { nodeId } from '../../../src/codec/complex/nodeid.js';
import { qualifiedName } from '../../../src/codec/complex/qualified-name.js';
import { localizedText } from '../../../src/codec/complex/localized-text.js';

describe('Variant XML Encoding', () => {
  describe('Primitive Types', () => {
    it('should encode Boolean variant to XML', () => {
      const encoder = new XmlEncoder();
      const variant = VariantCodec.variant(VariantType.Boolean, true);
      
      encoder.startElement('Variant');
      VariantCodec.encodeXml(encoder, variant);
      encoder.endElement();
      
      const xml = encoder.getXml();
      expect(xml).toContain('<Boolean>');
      expect(xml).toContain('true');
    });

    it('should encode Int32 variant to XML', () => {
      const encoder = new XmlEncoder();
      const variant = VariantCodec.variant(VariantType.Int32, 42);
      
      encoder.startElement('Variant');
      VariantCodec.encodeXml(encoder, variant);
      encoder.endElement();
      
      const xml = encoder.getXml();
      expect(xml).toContain('<Int32>');
      expect(xml).toContain('42');
    });

    it('should encode UInt32 variant to XML', () => {
      const encoder = new XmlEncoder();
      const variant = VariantCodec.variant(VariantType.UInt32, 4294967295);
      
      encoder.startElement('Variant');
      VariantCodec.encodeXml(encoder, variant);
      encoder.endElement();
      
      const xml = encoder.getXml();
      expect(xml).toContain('<UInt32>');
      expect(xml).toContain('4294967295');
    });

    it('should encode Int64 variant to XML', () => {
      const encoder = new XmlEncoder();
      const variant = VariantCodec.variant(VariantType.Int64, 9223372036854775807n);
      
      encoder.startElement('Variant');
      VariantCodec.encodeXml(encoder, variant);
      encoder.endElement();
      
      const xml = encoder.getXml();
      expect(xml).toContain('<Int64>');
      expect(xml).toContain('9223372036854775807');
    });

    it('should encode Float variant to XML', () => {
      const encoder = new XmlEncoder();
      const variant = VariantCodec.variant(VariantType.Float, 3.14159);
      
      encoder.startElement('Variant');
      VariantCodec.encodeXml(encoder, variant);
      encoder.endElement();
      
      const xml = encoder.getXml();
      expect(xml).toContain('<Float>');
    });

    it('should encode Double variant to XML', () => {
      const encoder = new XmlEncoder();
      const variant = VariantCodec.variant(VariantType.Double, 2.718281828459045);
      
      encoder.startElement('Variant');
      VariantCodec.encodeXml(encoder, variant);
      encoder.endElement();
      
      const xml = encoder.getXml();
      expect(xml).toContain('<Double>');
    });

    it('should encode String variant to XML', () => {
      const encoder = new XmlEncoder();
      const variant = VariantCodec.variant(VariantType.String, 'Hello OPC UA');
      
      encoder.startElement('Variant');
      VariantCodec.encodeXml(encoder, variant);
      encoder.endElement();
      
      const xml = encoder.getXml();
      expect(xml).toContain('<String>');
      expect(xml).toContain('Hello OPC UA');
    });

    it('should encode DateTime variant to XML', () => {
      const encoder = new XmlEncoder();
      const date = new Date('2024-01-15T10:30:00Z');
      const variant = VariantCodec.variant(VariantType.DateTime, date);
      
      encoder.startElement('Variant');
      VariantCodec.encodeXml(encoder, variant);
      encoder.endElement();
      
      const xml = encoder.getXml();
      expect(xml).toContain('<DateTime>');
    });

    it('should encode Guid variant to XML', () => {
      const encoder = new XmlEncoder();
      const guid = 'A0B1C2D3-E4F5-6789-ABCD-EF0123456789';
      const variant = VariantCodec.variant(VariantType.Guid, guid);
      
      encoder.startElement('Variant');
      VariantCodec.encodeXml(encoder, variant);
      encoder.endElement();
      
      const xml = encoder.getXml();
      expect(xml).toContain('<Guid>');
    });

    it('should encode ByteString variant to XML', () => {
      const encoder = new XmlEncoder();
      const bytes = new Uint8Array([0x01, 0x02, 0x03, 0x04]);
      const variant = VariantCodec.variant(VariantType.ByteString, bytes);
      
      encoder.startElement('Variant');
      VariantCodec.encodeXml(encoder, variant);
      encoder.endElement();
      
      const xml = encoder.getXml();
      expect(xml).toContain('<ByteString>');
    });
  });

  describe.skip('Complex Types (XML encoding not yet implemented)', () => {
    // Note: Complex types (NodeId, StatusCode, QualifiedName, LocalizedText, etc.)
    // require XML encoding to be implemented in their respective modules first.
    // These tests will be enabled once those implementations are complete.
    
    it('should encode NodeId variant to XML', () => {
      const encoder = new XmlEncoder();
      const node = nodeId(42, 1);
      const variant = VariantCodec.variant(VariantType.NodeId, node);
      
      encoder.startElement('Variant');
      VariantCodec.encodeXml(encoder, variant);
      encoder.endElement();
      
      const xml = encoder.getXml();
      expect(xml).toContain('<NodeId>');
    });

    it('should encode StatusCode variant to XML', () => {
      const encoder = new XmlEncoder();
      const status = statusCode(0x80000000);
      const variant = VariantCodec.variant(VariantType.StatusCode, status);
      
      encoder.startElement('Variant');
      VariantCodec.encodeXml(encoder, variant);
      encoder.endElement();
      
      const xml = encoder.getXml();
      expect(xml).toContain('<StatusCode>');
    });

    it('should encode QualifiedName variant to XML', () => {
      const encoder = new XmlEncoder();
      const qname = qualifiedName('TestName', 2);
      const variant = VariantCodec.variant(VariantType.QualifiedName, qname);
      
      encoder.startElement('Variant');
      VariantCodec.encodeXml(encoder, variant);
      encoder.endElement();
      
      const xml = encoder.getXml();
      expect(xml).toContain('<QualifiedName>');
    });

    it('should encode LocalizedText variant to XML', () => {
      const encoder = new XmlEncoder();
      const text = localizedText('Hello', 'en');
      const variant = VariantCodec.variant(VariantType.LocalizedText, text);
      
      encoder.startElement('Variant');
      VariantCodec.encodeXml(encoder, variant);
      encoder.endElement();
      
      const xml = encoder.getXml();
      expect(xml).toContain('<LocalizedText>');
    });
  });

  describe('Null Variant', () => {
    it('should encode null variant to XML', () => {
      const encoder = new XmlEncoder();
      const variant = VariantCodec.nullVariant();
      
      encoder.startElement('Variant');
      VariantCodec.encodeXml(encoder, variant);
      encoder.endElement();
      
      const xml = encoder.getXml();
      expect(xml).toContain('<Null');
    });
  });

  describe('Array Types', () => {
    it('should encode Int32 array variant to XML', () => {
      const encoder = new XmlEncoder();
      const variant = VariantCodec.arrayVariant(VariantType.Int32, [10, 20, 30]);
      
      encoder.startElement('Variant');
      VariantCodec.encodeXml(encoder, variant);
      encoder.endElement();
      
      const xml = encoder.getXml();
      expect(xml).toContain('<ListOfInt32>');
      expect(xml).toContain('<Int32>10</Int32>');
      expect(xml).toContain('<Int32>20</Int32>');
      expect(xml).toContain('<Int32>30</Int32>');
    });

    it('should encode Boolean array variant to XML', () => {
      const encoder = new XmlEncoder();
      const variant = VariantCodec.arrayVariant(VariantType.Boolean, [true, false, true]);
      
      encoder.startElement('Variant');
      VariantCodec.encodeXml(encoder, variant);
      encoder.endElement();
      
      const xml = encoder.getXml();
      expect(xml).toContain('<ListOfBoolean>');
      expect(xml).toContain('<Boolean>true</Boolean>');
      expect(xml).toContain('<Boolean>false</Boolean>');
    });

    it('should encode String array variant to XML', () => {
      const encoder = new XmlEncoder();
      const variant = VariantCodec.arrayVariant(VariantType.String, ['alpha', 'beta', 'gamma']);
      
      encoder.startElement('Variant');
      VariantCodec.encodeXml(encoder, variant);
      encoder.endElement();
      
      const xml = encoder.getXml();
      expect(xml).toContain('<ListOfString>');
      expect(xml).toContain('<String>alpha</String>');
      expect(xml).toContain('<String>beta</String>');
      expect(xml).toContain('<String>gamma</String>');
    });

    it('should encode empty array variant to XML', () => {
      const encoder = new XmlEncoder();
      const variant = VariantCodec.arrayVariant(VariantType.Int32, []);
      
      encoder.startElement('Variant');
      VariantCodec.encodeXml(encoder, variant);
      encoder.endElement();
      
      const xml = encoder.getXml();
      expect(xml).toContain('<ListOfInt32>');
      expect(xml).toContain('</ListOfInt32>');
    });
  });
});

describe('Variant XML Decoding', () => {
  describe('Primitive Types Round-Trip', () => {
    it('should decode Boolean variant from XML', () => {
      const xml = '<Variant><Boolean>true</Boolean></Variant>';
      const decoder = new XmlDecoder(xml);
      
      decoder.startElement('Variant');
      const variant = VariantCodec.decodeXml(decoder);
      decoder.endElement();
      
      expect(variant.variantType).toBe(VariantType.Boolean);
      expect(variant.value).toBe(true);
    });

    it('should decode Int32 variant from XML', () => {
      const xml = '<Variant><Int32>42</Int32></Variant>';
      const decoder = new XmlDecoder(xml);
      
      decoder.startElement('Variant');
      const variant = VariantCodec.decodeXml(decoder);
      decoder.endElement();
      
      expect(variant.variantType).toBe(VariantType.Int32);
      expect(variant.value).toBe(42);
    });

    it('should decode negative Int32 variant from XML', () => {
      const xml = '<Variant><Int32>-100</Int32></Variant>';
      const decoder = new XmlDecoder(xml);
      
      decoder.startElement('Variant');
      const variant = VariantCodec.decodeXml(decoder);
      decoder.endElement();
      
      expect(variant.variantType).toBe(VariantType.Int32);
      expect(variant.value).toBe(-100);
    });

    it('should decode UInt32 variant from XML', () => {
      const xml = '<Variant><UInt32>4294967295</UInt32></Variant>';
      const decoder = new XmlDecoder(xml);
      
      decoder.startElement('Variant');
      const variant = VariantCodec.decodeXml(decoder);
      decoder.endElement();
      
      expect(variant.variantType).toBe(VariantType.UInt32);
      expect(variant.value).toBe(4294967295);
    });

    it('should decode Int64 variant from XML', () => {
      const xml = '<Variant><Int64>9223372036854775807</Int64></Variant>';
      const decoder = new XmlDecoder(xml);
      
      decoder.startElement('Variant');
      const variant = VariantCodec.decodeXml(decoder);
      decoder.endElement();
      
      expect(variant.variantType).toBe(VariantType.Int64);
      expect(variant.value).toBe(9223372036854775807n);
    });

    it('should decode Float variant from XML', () => {
      const xml = '<Variant><Float>3.14159</Float></Variant>';
      const decoder = new XmlDecoder(xml);
      
      decoder.startElement('Variant');
      const variant = VariantCodec.decodeXml(decoder);
      decoder.endElement();
      
      expect(variant.variantType).toBe(VariantType.Float);
      expect(variant.value).toBeCloseTo(3.14159, 5);
    });

    it('should decode Double variant from XML', () => {
      const xml = '<Variant><Double>2.718281828459045</Double></Variant>';
      const decoder = new XmlDecoder(xml);
      
      decoder.startElement('Variant');
      const variant = VariantCodec.decodeXml(decoder);
      decoder.endElement();
      
      expect(variant.variantType).toBe(VariantType.Double);
      expect(variant.value).toBeCloseTo(2.718281828459045, 10);
    });

    it('should decode String variant from XML', () => {
      const xml = '<Variant><String>Hello OPC UA</String></Variant>';
      const decoder = new XmlDecoder(xml);
      
      decoder.startElement('Variant');
      const variant = VariantCodec.decodeXml(decoder);
      decoder.endElement();
      
      expect(variant.variantType).toBe(VariantType.String);
      expect(variant.value).toBe('Hello OPC UA');
    });
  });

  describe('Null Variant', () => {
    it('should decode null variant from XML with self-closing tag', () => {
      const xml = '<Variant><Null/></Variant>';
      const decoder = new XmlDecoder(xml);
      
      decoder.startElement('Variant');
      const variant = VariantCodec.decodeXml(decoder);
      decoder.endElement();
      
      expect(variant.variantType).toBe(VariantType.Null);
      expect(variant.value).toBeNull();
    });

    it('should decode null variant from XML with empty element', () => {
      const xml = '<Variant><Null></Null></Variant>';
      const decoder = new XmlDecoder(xml);
      
      decoder.startElement('Variant');
      const variant = VariantCodec.decodeXml(decoder);
      decoder.endElement();
      
      expect(variant.variantType).toBe(VariantType.Null);
      expect(variant.value).toBeNull();
    });
  });

  describe('Array Round-Trip', () => {
    it('should decode Int32 array variant from XML', () => {
      const xml = '<Variant><ListOfInt32><Int32>10</Int32><Int32>20</Int32><Int32>30</Int32></ListOfInt32></Variant>';
      const decoder = new XmlDecoder(xml);
      
      decoder.startElement('Variant');
      const variant = VariantCodec.decodeXml(decoder);
      decoder.endElement();
      
      expect(variant.variantType).toBe(VariantType.Int32);
      expect(Array.isArray(variant.value)).toBe(true);
      expect(variant.value).toEqual([10, 20, 30]);
    });

    it('should decode Boolean array variant from XML', () => {
      const xml = '<Variant><ListOfBoolean><Boolean>true</Boolean><Boolean>false</Boolean><Boolean>true</Boolean></ListOfBoolean></Variant>';
      const decoder = new XmlDecoder(xml);
      
      decoder.startElement('Variant');
      const variant = VariantCodec.decodeXml(decoder);
      decoder.endElement();
      
      expect(variant.variantType).toBe(VariantType.Boolean);
      expect(Array.isArray(variant.value)).toBe(true);
      expect(variant.value).toEqual([true, false, true]);
    });

    it('should decode String array variant from XML', () => {
      const xml = '<Variant><ListOfString><String>alpha</String><String>beta</String><String>gamma</String></ListOfString></Variant>';
      const decoder = new XmlDecoder(xml);
      
      decoder.startElement('Variant');
      const variant = VariantCodec.decodeXml(decoder);
      decoder.endElement();
      
      expect(variant.variantType).toBe(VariantType.String);
      expect(Array.isArray(variant.value)).toBe(true);
      expect(variant.value).toEqual(['alpha', 'beta', 'gamma']);
    });

    it('should decode single element array from XML', () => {
      const xml = '<Variant><ListOfInt32><Int32>42</Int32></ListOfInt32></Variant>';
      const decoder = new XmlDecoder(xml);
      
      decoder.startElement('Variant');
      const variant = VariantCodec.decodeXml(decoder);
      decoder.endElement();
      
      expect(variant.variantType).toBe(VariantType.Int32);
      expect(Array.isArray(variant.value)).toBe(true);
      expect(variant.value).toEqual([42]);
    });

    it('should decode empty array from XML', () => {
      const xml = '<Variant><ListOfInt32></ListOfInt32></Variant>';
      const decoder = new XmlDecoder(xml);
      
      decoder.startElement('Variant');
      const variant = VariantCodec.decodeXml(decoder);
      decoder.endElement();
      
      expect(variant.variantType).toBe(VariantType.Int32);
      expect(Array.isArray(variant.value)).toBe(true);
      expect(variant.value).toEqual([]);
    });
  });

  describe('Full Round-Trip', () => {
    it('should round-trip Boolean variant through XML', () => {
      const encoder = new XmlEncoder();
      const original = VariantCodec.variant(VariantType.Boolean, true);
      
      encoder.startElement('Variant');
      VariantCodec.encodeXml(encoder, original);
      encoder.endElement();
      
      const xml = encoder.getXml();
      const decoder = new XmlDecoder(xml);
      
      decoder.startElement('Variant');
      const decoded = VariantCodec.decodeXml(decoder);
      decoder.endElement();
      
      expect(decoded.variantType).toBe(original.variantType);
      expect(decoded.value).toBe(original.value);
    });

    it('should round-trip Int32 variant through XML', () => {
      const encoder = new XmlEncoder();
      const original = VariantCodec.variant(VariantType.Int32, -12345);
      
      encoder.startElement('Variant');
      VariantCodec.encodeXml(encoder, original);
      encoder.endElement();
      
      const xml = encoder.getXml();
      const decoder = new XmlDecoder(xml);
      
      decoder.startElement('Variant');
      const decoded = VariantCodec.decodeXml(decoder);
      decoder.endElement();
      
      expect(decoded.variantType).toBe(original.variantType);
      expect(decoded.value).toBe(original.value);
    });

    it('should round-trip String variant through XML', () => {
      const encoder = new XmlEncoder();
      const original = VariantCodec.variant(VariantType.String, 'Test & <XML> "Escaping"');
      
      encoder.startElement('Variant');
      VariantCodec.encodeXml(encoder, original);
      encoder.endElement();
      
      const xml = encoder.getXml();
      const decoder = new XmlDecoder(xml);
      
      decoder.startElement('Variant');
      const decoded = VariantCodec.decodeXml(decoder);
      decoder.endElement();
      
      expect(decoded.variantType).toBe(original.variantType);
      expect(decoded.value).toBe(original.value);
    });

    it('should round-trip Int32 array variant through XML', () => {
      const encoder = new XmlEncoder();
      const original = VariantCodec.arrayVariant(VariantType.Int32, [100, 200, 300, 400]);
      
      encoder.startElement('Variant');
      VariantCodec.encodeXml(encoder, original);
      encoder.endElement();
      
      const xml = encoder.getXml();
      const decoder = new XmlDecoder(xml);
      
      decoder.startElement('Variant');
      const decoded = VariantCodec.decodeXml(decoder);
      decoder.endElement();
      
      expect(decoded.variantType).toBe(original.variantType);
      expect(decoded.value).toEqual(original.value);
    });

    it('should round-trip null variant through XML', () => {
      const encoder = new XmlEncoder();
      const original = VariantCodec.nullVariant();
      
      encoder.startElement('Variant');
      VariantCodec.encodeXml(encoder, original);
      encoder.endElement();
      
      const xml = encoder.getXml();
      const decoder = new XmlDecoder(xml);
      
      decoder.startElement('Variant');
      const decoded = VariantCodec.decodeXml(decoder);
      decoder.endElement();
      
      expect(decoded.variantType).toBe(original.variantType);
      expect(decoded.value).toBeNull();
    });
  });
});
