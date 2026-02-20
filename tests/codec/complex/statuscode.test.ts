/**
 * @fileoverview Tests for StatusCode type
 * @module tests/codec/complex/statuscode
 */

import { describe, it, expect } from 'vitest';
import { BinaryEncoder } from '../../../src/codec/binary/encoder.js';
import { BinaryDecoder } from '../../../src/codec/binary/decoder.js';
import {
  StatusCode,
  StatusCodeSeverity,
  StatusCodes,
  encodeBinary,
  decodeBinary,
  registerStatusCode,
  statusCode,
  getSeverity,
  isGood,
  isUncertain,
  isBad,
  getCode,
  getSubCode,
} from '../../../src/codec/complex/statuscode.js';
import { CodecFacade } from '../../../src/codec/facade.js';
import { EncodingFormat } from '../../../src/codec/types.js';

describe('StatusCode - Binary Encoding', () => {
  
  describe('Basic Encoding/Decoding', () => {
    it('should encode/decode StatusCode Good', () => {
      const encoder = new BinaryEncoder();
      const sc = statusCode(StatusCodes.Good);
      
      encodeBinary(encoder, sc);
      
      const buffer = encoder.getBuffer();
      expect(buffer.length).toBe(4); // UInt32 = 4 bytes
      
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeBinary(decoder);
      
      expect(decoded.getValue()).toBe(StatusCodes.Good);
      expect(decoded.getValue()).toBe(0x00000000);
    });
    
    it('should encode/decode StatusCode BadUnexpectedError', () => {
      const encoder = new BinaryEncoder();
      const sc = statusCode(StatusCodes.BadUnexpectedError);
      
      encodeBinary(encoder, sc);
      
      const buffer = encoder.getBuffer();
      expect(buffer.length).toBe(4);
      
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeBinary(decoder);
      
      expect(decoded.getValue()).toBe(StatusCodes.BadUnexpectedError);
      expect(decoded.getValue()).toBe(0x80010000);
    });
    
    it('should encode/decode StatusCode GoodSubscriptionTransferred', () => {
      const encoder = new BinaryEncoder();
      const sc = statusCode(StatusCodes.GoodSubscriptionTransferred);
      
      encodeBinary(encoder, sc);
      
      const buffer = encoder.getBuffer();
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeBinary(decoder);
      
      expect(decoded.getValue()).toBe(StatusCodes.GoodSubscriptionTransferred);
      expect(decoded.getValue()).toBe(0x002D0000);
    });
    
    it('should encode/decode StatusCode UncertainReferenceNotDeleted', () => {
      const encoder = new BinaryEncoder();
      const sc = statusCode(StatusCodes.UncertainReferenceNotDeleted);
      
      encodeBinary(encoder, sc);
      
      const buffer = encoder.getBuffer();
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeBinary(decoder);
      
      expect(decoded.getValue()).toBe(StatusCodes.UncertainReferenceNotDeleted);
      expect(decoded.getValue()).toBe(0x40BC0000);
    });
    
    it('should round-trip various status codes', () => {
      const testCodes = [
        StatusCodes.Good,
        StatusCodes.BadInternalError,
        StatusCodes.BadTimeout,
        StatusCodes.BadNodeIdInvalid,
        StatusCodes.GoodCompletesAsynchronously,
        StatusCodes.UncertainNoCommunicationLastUsableValue,
        StatusCodes.BadSecurityChecksFailed,
        StatusCodes.BadCertificateInvalid,
      ];
      
      for (const code of testCodes) {
        const encoder = new BinaryEncoder();
        const sc = statusCode(code);
        
        encodeBinary(encoder, sc);
        
        const decoder = new BinaryDecoder(encoder.getBuffer());
        const decoded = decodeBinary(decoder);
        
        expect(decoded.getValue()).toBe(code);
      }
    });
  });
  
  describe('Bit Field Extraction', () => {
    it('should extract severity Good (0x00)', () => {
      const sc = statusCode(StatusCodes.Good);
      expect(getSeverity(sc)).toBe(StatusCodeSeverity.Good);
      expect(isGood(sc)).toBe(true);
      expect(isUncertain(sc)).toBe(false);
      expect(isBad(sc)).toBe(false);
    });
    
    it('should extract severity Bad (0x02)', () => {
      const sc = statusCode(StatusCodes.BadUnexpectedError);
      expect(getSeverity(sc)).toBe(StatusCodeSeverity.Bad);
      expect(isGood(sc)).toBe(false);
      expect(isUncertain(sc)).toBe(false);
      expect(isBad(sc)).toBe(true);
    });
    
    it('should extract severity Uncertain (0x01)', () => {
      const sc = statusCode(StatusCodes.UncertainReferenceNotDeleted);
      expect(getSeverity(sc)).toBe(StatusCodeSeverity.Uncertain);
      expect(isGood(sc)).toBe(false);
      expect(isUncertain(sc)).toBe(true);
      expect(isBad(sc)).toBe(false);
    });
    
    it('should extract code from status code (bits 0-15)', () => {
      // BadUnexpectedError = 0x80010000
      // Code = bits 0-15 = 0x0000
      // SubCode = bits 16-29 = 0x0001
      // Severity = bits 30-31 = 0x02 (Bad, bit 31 set)
      const sc = statusCode(StatusCodes.BadUnexpectedError);
      expect(getCode(sc)).toBe(0x0000);
      expect(getSubCode(sc)).toBe(0x0001);
    });
    
    it('should extract code from  another status code', () => {
      // BadNodeIdInvalid = 0x80330000
      // Code = bits 0-15 = 0x0000
      // SubCode = bits 16-29 = 0x0033
      const sc = statusCode(StatusCodes.BadNodeIdInvalid);
      expect(getCode(sc)).toBe(0x0000);
      expect(getSubCode(sc)).toBe(0x0033);
    });
    
    it('should handle combined severity bits', () => {
      // Test Good (bits 30-31 = 00)
      const scGood = statusCode(0x00000000);
      expect(getSeverity(scGood)).toBe(StatusCodeSeverity.Good);
      expect(isGood(scGood)).toBe(true);
      
      // Test Uncertain (bits 30-31 = 01, bit 30 set)
      const scUncertain = statusCode(0x40000000);
      expect(getSeverity(scUncertain)).toBe(StatusCodeSeverity.Uncertain);
      expect(isUncertain(scUncertain)).toBe(true);
      
      // Test Bad (bits 30-31 = 10, bit 31 set)
      const scBad = statusCode(0x80000000);
      expect(getSeverity(scBad)).toBe(StatusCodeSeverity.Bad);
      expect(isBad(scBad)).toBe(true);
      
      // Test both bits set (bits 30-31 = 11) - also Bad
      const scBad3 = statusCode(0xC0000000);
      expect(getSeverity(scBad3)).toBe(0x03); // Raw value is 3
      expect(isBad(scBad3)).toBe(true); // Still treated as Bad
    });
  });
  
  describe('Well-Known Status Codes', () => {
    it('should have correct Good codes', () => {
      expect(StatusCodes.Good).toBe(0x00000000);
      expect(StatusCodes.GoodSubscriptionTransferred).toBe(0x002D0000);
      expect(StatusCodes.GoodCompletesAsynchronously).toBe(0x002E0000);
      expect(StatusCodes.GoodOverload).toBe(0x002F0000);
      expect(StatusCodes.GoodClamped).toBe(0x00300000);
    });
    
    it('should have correct Bad codes', () => {
      expect(StatusCodes.BadUnexpectedError).toBe(0x80010000);
      expect(StatusCodes.BadInternalError).toBe(0x80020000);
      expect(StatusCodes.BadTimeout).toBe(0x800A0000);
      expect(StatusCodes.BadNodeIdInvalid).toBe(0x80330000);
      expect(StatusCodes.BadNotImplemented).toBe(0x80400000);
    });
    
    it('should have correct Uncertain codes', () => {
      expect(StatusCodes.UncertainReferenceNotDeleted).toBe(0x40BC0000);
      expect(StatusCodes.UncertainReferenceOutOfServer).toBe(0x406C0000);
      expect(StatusCodes.UncertainNotAllNodesAvailable).toBe(0x40C00000);
      expect(StatusCodes.UncertainNoCommunicationLastUsableValue).toBe(0x408F0000);
      expect(StatusCodes.UncertainLastUsableValue).toBe(0x40900000);
    });
  });
  
  describe('Edge Cases', () => {
    it('should handle minimum value (0)', () => {
      const encoder = new BinaryEncoder();
      const sc = statusCode(0);
      
      encodeBinary(encoder, sc);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(decoded.getValue()).toBe(0);
    });
    
    it('should handle maximum value (0xFFFFFFFF)', () => {
      const encoder = new BinaryEncoder();
      const sc = statusCode(0xFFFFFFFF);
      
      encodeBinary(encoder, sc);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(decoded.getValue()).toBe(0xFFFFFFFF);
    });
    
    it('should throw on out-of-range value (negative)', () => {
      expect(() => statusCode(-1)).toThrow('StatusCode value -1 out of range');
    });
    
    it('should throw on out-of-range value (too large)', () => {
      expect(() => statusCode(0x100000000)).toThrow('StatusCode value 4294967296 out of range');
    });
  });
  
  describe('Binary Format Verification', () => {
    it('should produce little-endian byte order', () => {
      const encoder = new BinaryEncoder();
      const sc = statusCode(0x12345678);
      
      encodeBinary(encoder, sc);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x78); // Least significant byte first
      expect(buffer[1]).toBe(0x56);
      expect(buffer[2]).toBe(0x34);
      expect(buffer[3]).toBe(0x12); // Most significant byte last
    });
    
    it('should match expected byte representation for Good', () => {
      const encoder = new BinaryEncoder();
      const sc = statusCode(StatusCodes.Good);
      
      encodeBinary(encoder, sc);
      
      const buffer = encoder.getBuffer();
      expect(Array.from(buffer)).toEqual([0x00, 0x00, 0x00, 0x00]);
    });
    
    it('should match expected byte representation for BadUnexpectedError', () => {
      const encoder = new BinaryEncoder();
      const sc = statusCode(StatusCodes.BadUnexpectedError);
      
      encodeBinary(encoder, sc);
      
      const buffer = encoder.getBuffer();
      expect(Array.from(buffer)).toEqual([0x00, 0x00, 0x01, 0x80]);
    });
  });
  
  describe('CodecFacade Integration', () => {
    it('should register with facade', () => {
      const facade = new CodecFacade();
      registerStatusCode(facade);
      
      const sc = statusCode(StatusCodes.Good);
      const buffer = facade.encode(sc, 'i=19');
      
      expect(buffer).toBeDefined();
      expect(buffer.length).toBe(4);
      
      const decoded = facade.decode<StatusCode>(buffer, 'i=19');
      expect(decoded.getValue()).toBe(StatusCodes.Good);
    });
    
    it('should encode/decode through facade with various codes', () => {
      const facade = new CodecFacade();
      registerStatusCode(facade);
      
      const testCodes = [
        StatusCodes.Good,
        StatusCodes.BadInternalError,
        StatusCodes.UncertainLastUsableValue,
        StatusCodes.GoodCompletesAsynchronously,
      ];
      
      for (const code of testCodes) {
        const sc = statusCode(code);
        const buffer = facade.encode(sc, 'i=19');
        const decoded = facade.decode<StatusCode>(buffer, 'i=19');
        
        expect(decoded.getValue()).toBe(code);
      }
    });
  });
  
  describe('Severity Classification', () => {
    it('should correctly classify Good status codes', () => {
      const goodCodes = [
        StatusCodes.Good,
        StatusCodes.GoodSubscriptionTransferred,
        StatusCodes.GoodCompletesAsynchronously,
        StatusCodes.GoodOverload,
        StatusCodes.GoodClamped,
        StatusCodes.GoodLocalOverride,
        StatusCodes.GoodNoData,
        StatusCodes.GoodMoreData,
      ];
      
      for (const code of goodCodes) {
        const sc = statusCode(code);
        expect(isGood(sc)).toBe(true);
        expect(isBad(sc)).toBe(false);
        expect(isUncertain(sc)).toBe(false);
      }
    });
    
    it('should correctly classify Bad status codes', () => {
      const badCodes = [
        StatusCodes.BadUnexpectedError,
        StatusCodes.BadInternalError,
        StatusCodes.BadTimeout,
        StatusCodes.BadNodeIdInvalid,
        StatusCodes.BadNotImplemented,
        StatusCodes.BadSecurityChecksFailed,
      ];
      
      for (const code of badCodes) {
        const sc = statusCode(code);
        expect(isBad(sc)).toBe(true);
        expect(isGood(sc)).toBe(false);
        expect(isUncertain(sc)).toBe(false);
      }
    });
    
    it('should correctly classify Uncertain status codes', () => {
      const uncertainCodes = [
        StatusCodes.UncertainReferenceNotDeleted,
        StatusCodes.UncertainReferenceOutOfServer,
        StatusCodes.UncertainNotAllNodesAvailable,
        StatusCodes.UncertainNoCommunicationLastUsableValue,
        StatusCodes.UncertainLastUsableValue,
      ];
      
      for (const code of uncertainCodes) {
        const sc = statusCode(code);
        expect(isUncertain(sc)).toBe(true);
        expect(isGood(sc)).toBe(false);
        expect(isBad(sc)).toBe(false);
      }
    });
  });
});
