/**
 * @fileoverview Tests for complex builtin types
 * @module tests/codec/complex/complex-types
 */

import { describe, it, expect } from 'vitest';
import { BinaryEncoder } from '../../../src/codec/binary/encoder.js';
import { BinaryDecoder } from '../../../src/codec/binary/decoder.js';
import { CodecFacade } from '../../../src/codec/facade.js';
import { numericNodeId } from '../../../src/codec/complex/nodeid.js';
import {
  ExpandedNodeId,
  encodeBinary as encodeExpandedNodeIdBinary,
  decodeBinary as decodeExpandedNodeIdBinary,
  registerExpandedNodeId,
  expandedNodeId,
} from '../../../src/codec/complex/expanded-nodeid.js';
import {
  QualifiedName,
  encodeBinary as encodeQualifiedNameBinary,
  decodeBinary as decodeQualifiedNameBinary,
  registerQualifiedName,
  qualifiedName,
} from '../../../src/codec/complex/qualified-name.js';
import {
  LocalizedText,
  encodeBinary as encodeLocalizedTextBinary,
  decodeBinary as decodeLocalizedTextBinary,
  registerLocalizedText,
  localizedText,
} from '../../../src/codec/complex/localized-text.js';
import {
  DataValue,
  encodeBinary as encodeDataValueBinary,
  decodeBinary as decodeDataValueBinary,
  registerDataValue,
  dataValue,
} from '../../../src/codec/complex/datavalue.js';
import { variant, VariantType, Variant } from '../../../src/codec/complex/variant.js';

describe('Complex Builtin Types - Binary Encoding', () => {
  
  describe('ExpandedNodeId', () => {
    it('should encode/decode ExpandedNodeId without optional fields', () => {
      const encoder = new BinaryEncoder();
      const expNodeId = expandedNodeId(numericNodeId(2, 1234));
      
      encodeExpandedNodeIdBinary(encoder, expNodeId);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeExpandedNodeIdBinary(decoder);
      
      expect(decoded.namespace).toBe(2);
      expect(decoded.identifier).toBe(1234);
      expect(decoded.namespaceUri).toBeUndefined();
      expect(decoded.serverIndex).toBeUndefined();
    });
    
    it('should encode/decode ExpandedNodeId with NamespaceUri', () => {
      const encoder = new BinaryEncoder();
      const expNodeId = expandedNodeId(
        numericNodeId(0, 42),
        'http://opcfoundation.org/UA/'
      );
      
      encodeExpandedNodeIdBinary(encoder, expNodeId);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeExpandedNodeIdBinary(decoder);
      
      expect(decoded.namespace).toBe(0);
      expect(decoded.identifier).toBe(42);
      expect(decoded.namespaceUri).toBe('http://opcfoundation.org/UA/');
      expect(decoded.serverIndex).toBeUndefined();
    });
    
    it('should encode/decode ExpandedNodeId with ServerIndex', () => {
      const encoder = new BinaryEncoder();
      const expNodeId = expandedNodeId(
        numericNodeId(2, 1234),
        null,
        5
      );
      
      encodeExpandedNodeIdBinary(encoder, expNodeId);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeExpandedNodeIdBinary(decoder);
      
      expect(decoded.namespace).toBe(2);
      expect(decoded.identifier).toBe(1234);
      expect(decoded.namespaceUri).toBeUndefined();
      expect(decoded.serverIndex).toBe(5);
    });
    
    it('should encode/decode ExpandedNodeId with both optional fields', () => {
      const encoder = new BinaryEncoder();
      const expNodeId = expandedNodeId(
        numericNodeId(0, 100),
        'http://example.com/UA/',
        10
      );
      
      encodeExpandedNodeIdBinary(encoder, expNodeId);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeExpandedNodeIdBinary(decoder);
      
      expect(decoded.namespace).toBe(0);
      expect(decoded.identifier).toBe(100);
      expect(decoded.namespaceUri).toBe('http://example.com/UA/');
      expect(decoded.serverIndex).toBe(10);
    });
  });
  
  describe('QualifiedName', () => {
    it('should encode/decode QualifiedName', () => {
      const encoder = new BinaryEncoder();
      const qn = qualifiedName(2, 'Temperature');
      
      encodeQualifiedNameBinary(encoder, qn);
      
      const buffer = encoder.getBuffer();
      // Verify: NamespaceIndex (UInt16) + Name (String)
      expect(buffer.readUInt16LE(0)).toBe(2);
      expect(buffer.readInt32LE(2)).toBe(11); // String length
      expect(buffer.toString('utf8', 6, 17)).toBe('Temperature');
      
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeQualifiedNameBinary(decoder);
      
      expect(decoded.namespaceIndex).toBe(2);
      expect(decoded.name).toBe('Temperature');
    });
    
    it('should encode/decode QualifiedName with empty name', () => {
      const encoder = new BinaryEncoder();
      const qn = qualifiedName(0, '');
      
      encodeQualifiedNameBinary(encoder, qn);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeQualifiedNameBinary(decoder);
      
      expect(decoded.namespaceIndex).toBe(0);
      expect(decoded.name).toBe('');
    });
    
    it('should round-trip via facade', () => {
      const facade = new CodecFacade();
      registerQualifiedName(facade);
      
      const qn = qualifiedName(3, 'MyNode');
      const buffer = facade.encode(qn, 'i=20');
      const decoded = facade.decode<QualifiedName>(buffer, 'i=20');
      
      expect(decoded).toEqual(qn);
    });
  });
  
  describe('LocalizedText', () => {
    it('should encode/decode LocalizedText with both locale and text', () => {
      const encoder = new BinaryEncoder();
      const lt = localizedText('en-US', 'Temperature');
      
      encodeLocalizedTextBinary(encoder, lt);
      
      const buffer = encoder.getBuffer();
      // Verify: EncodingMask (0x03 = both flags) + Locale + Text
      expect(buffer[0]).toBe(0x03);
      
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeLocalizedTextBinary(decoder);
      
      expect(decoded.locale).toBe('en-US');
      expect(decoded.text).toBe('Temperature');
    });
    
    it('should encode/decode LocalizedText with only locale', () => {
      const encoder = new BinaryEncoder();
      const lt = localizedText('de-DE', null);
      
      encodeLocalizedTextBinary(encoder, lt);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x01); // Only locale flag
      
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeLocalizedTextBinary(decoder);
      
      expect(decoded.locale).toBe('de-DE');
      expect(decoded.text).toBe('');
    });
    
    it('should encode/decode LocalizedText with only text', () => {
      const encoder = new BinaryEncoder();
      const lt = localizedText(null, 'Pressure');
      
      encodeLocalizedTextBinary(encoder, lt);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x02); // Only text flag
      
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeLocalizedTextBinary(decoder);
      
      expect(decoded.locale).toBeUndefined();
      expect(decoded.text).toBe('Pressure');
    });
    
    it('should encode/decode LocalizedText with neither field', () => {
      const encoder = new BinaryEncoder();
      const lt = localizedText(null, null);
      
      encodeLocalizedTextBinary(encoder, lt);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x00); // No flags
      expect(buffer.length).toBe(1); // Only encoding mask
      
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeLocalizedTextBinary(decoder);
      
      expect(decoded.locale).toBeUndefined();
      expect(decoded.text).toBe('');
    });
    
    it('should round-trip via facade', () => {
      const facade = new CodecFacade();
      registerLocalizedText(facade);
      
      const lt = localizedText('fr-FR', 'Température');
      const buffer = facade.encode(lt, 'i=21');
      const decoded = facade.decode<LocalizedText>(buffer, 'i=21');
      
      expect(decoded).toEqual(lt);
    });
  });
  
  describe('DataValue', () => {
    it('should encode/decode DataValue with only value', () => {
      const encoder = new BinaryEncoder();
      const dv = dataValue(variant(VariantType.Int32, 42));
      
      encodeDataValueBinary(encoder, dv);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x01); // Only value flag
      
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeDataValueBinary(decoder);
      
      expect(decoded.value).toBe(42);
      expect(decoded.statusCode).toBeNull();
      expect(decoded.sourceTimestamp).toBeNull();
      expect(decoded.serverTimestamp).toBeNull();
    });
    
    it('should encode/decode DataValue with value and statusCode', () => {
      const encoder = new BinaryEncoder();
      const dv = dataValue(variant(VariantType.Int32, 100), 0x00000000); // Good status
      
      encodeDataValueBinary(encoder, dv);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x03); // Value + StatusCode flags
      
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeDataValueBinary(decoder);
      
      expect(decoded.value).toBe(100);
      expect(decoded.statusCode?.getValue()).toBe(0x00000000);
    });
    
    it('should encode/decode DataValue with all fields', () => {
      const encoder = new BinaryEncoder();
      const sourceTs = new Date('2024-01-01T00:00:00.000Z');
      const serverTs = new Date('2024-01-01T00:00:00.001Z');
      const dv = dataValue(variant(VariantType.Int32, 42), 0x00000000, sourceTs, serverTs, 500, 1000);
      
      encodeDataValueBinary(encoder, dv);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x3F); // All 6 flags set
      
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeDataValueBinary(decoder);
      
      expect(decoded.value).toBe(42);
      expect(decoded.statusCode?.getValue()).toBe(0x00000000);
      expect(decoded.sourceTimestamp?.getTime()).toBe(sourceTs.getTime());
      expect(decoded.serverTimestamp?.getTime()).toBe(serverTs.getTime());
      expect(decoded.sourcePicoseconds).toBe(500);
      expect(decoded.serverPicoseconds).toBe(1000);
    });
    
    it('should encode/decode DataValue with only timestamps', () => {
      const encoder = new BinaryEncoder();
      const sourceTs = new Date('2024-01-01T12:30:00.000Z');
      const dv = dataValue(null, null, sourceTs);
      
      encodeDataValueBinary(encoder, dv);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x04); // Only source timestamp flag
      
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeDataValueBinary(decoder);
      
      expect(decoded.value).toBeNull();
      expect(decoded.statusCode).toBeNull();
      expect(decoded.sourceTimestamp?.getTime()).toBe(sourceTs.getTime());
      expect(decoded.serverTimestamp).toBeNull();
    });
    
    it('should round-trip via facade', () => {
      const facade = new CodecFacade();
      registerDataValue(facade);
      
      const dv = dataValue(variant(VariantType.Int32, 123), 0x80000000); // Bad status
      const buffer = facade.encode(dv, 'i=23');
      const decoded = facade.decode<DataValue>(buffer, 'i=23');
      
      expect(decoded.value).toBe(123);
      expect(decoded.statusCode?.getValue()).toBe(0x80000000);
    });
  });
  
  describe('Facade Integration - All Complex Types', () => {
    it('should register and use all complex types', () => {
      const facade = new CodecFacade();
      registerExpandedNodeId(facade);
      registerQualifiedName(facade);
      registerLocalizedText(facade);
      registerDataValue(facade);
      
      // ExpandedNodeId
      const expNodeId = expandedNodeId(numericNodeId(2, 1234), 'http://example.com/UA/', 5);
      expect(facade.decode<ExpandedNodeId>(facade.encode(expNodeId, 'i=18'), 'i=18'))
        .toEqual(expNodeId);
      
      // QualifiedName
      const qn = qualifiedName(3, 'MyNode');
      expect(facade.decode<QualifiedName>(facade.encode(qn, 'i=20'), 'i=20'))
        .toEqual(qn);
      
      // LocalizedText
      const lt = localizedText('en-US', 'Temperature');
      expect(facade.decode<LocalizedText>(facade.encode(lt, 'i=21'), 'i=21'))
        .toEqual(lt);
      
      // DataValue
      const dv = dataValue(variant(VariantType.Int32, 42), 0x00000000);
      const decodedDv = facade.decode<DataValue>(facade.encode(dv, 'i=23'), 'i=23');
      // Note: simplified encoder/decoder only handles raw Int32, not full Variant
      expect(decodedDv.value).toBe((dv.value as Variant).value);
      expect(decodedDv.statusCode?.getValue()).toBe(dv.statusCode?.getValue());
    });
  });
});
