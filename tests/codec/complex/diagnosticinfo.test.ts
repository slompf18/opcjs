/**
 * @fileoverview Tests for DiagnosticInfo type
 * @module tests/codec/complex/diagnosticinfo
 */

import { describe, it, expect } from 'vitest';
import { BinaryEncoder } from '../../../src/codec/binary/encoder.js';
import { BinaryDecoder } from '../../../src/codec/binary/decoder.js';
import {
  DiagnosticInfo,
  DiagnosticInfoMask,
  encodeBinary,
  decodeBinary,
  registerDiagnosticInfo,
  diagnosticInfo,
  simpleDiagnosticInfo,
  diagnosticInfoWithStatus,
  nestedDiagnosticInfo,
} from '../../../src/codec/complex/diagnosticinfo.js';
import { statusCode, StatusCodes } from '../../../src/codec/complex/statuscode.js';
import { CodecFacade } from '../../../src/codec/facade.js';

describe('DiagnosticInfo - Binary Encoding', () => {
  
  describe('Basic Encoding/Decoding', () => {
    it('should encode/decode empty DiagnosticInfo (all fields null)', () => {
      const encoder = new BinaryEncoder();
      const diag = diagnosticInfo();
      
      encodeBinary(encoder, diag);
      
      const buffer = encoder.getBuffer();
      expect(buffer.length).toBe(1); // Just encoding mask = 0x00
      expect(buffer[0]).toBe(0x00); // All bits clear
      
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeBinary(decoder);
      
      expect(decoded.symbolicId).toBeNull();
      expect(decoded.namespaceUri).toBeNull();
      expect(decoded.localizedText).toBeNull();
      expect(decoded.locale).toBeNull();
      expect(decoded.additionalInfo).toBeNull();
      expect(decoded.innerStatusCode).toBeNull();
      expect(decoded.innerDiagnosticInfo).toBeNull();
    });
    
    it('should encode/decode DiagnosticInfo with only symbolicId', () => {
      const encoder = new BinaryEncoder();
      const diag = diagnosticInfo(42, null, null, null, null, null, null);
      
      encodeBinary(encoder, diag);
      
      const buffer = encoder.getBuffer();
      expect(buffer.length).toBe(5); // 1 byte mask + 4 bytes Int32
      expect(buffer[0]).toBe(DiagnosticInfoMask.SymbolicId);
      
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeBinary(decoder);
      
      expect(decoded.symbolicId).toBe(42);
      expect(decoded.namespaceUri).toBeNull();
      expect(decoded.localizedText).toBeNull();
      expect(decoded.locale).toBeNull();
      expect(decoded.additionalInfo).toBeNull();
      expect(decoded.innerStatusCode).toBeNull();
      expect(decoded.innerDiagnosticInfo).toBeNull();
    });
    
    it('should encode/decode DiagnosticInfo with only additionalInfo', () => {
      const encoder = new BinaryEncoder();
      const diag = simpleDiagnosticInfo('Error occurred during operation');
      
      encodeBinary(encoder, diag);
      
      const buffer = encoder.getBuffer();
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeBinary(decoder);
      
      expect(decoded.symbolicId).toBeNull();
      expect(decoded.additionalInfo).toBe('Error occurred during operation');
      expect(decoded.innerStatusCode).toBeNull();
    });
    
    it('should encode/decode DiagnosticInfo with additionalInfo and innerStatusCode', () => {
      const encoder = new BinaryEncoder();
      const diag = diagnosticInfoWithStatus(
        'Operation failed',
        statusCode(StatusCodes.BadUnexpectedError)
      );
      
      encodeBinary(encoder, diag);
      
      const buffer = encoder.getBuffer();
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeBinary(decoder);
      
      expect(decoded.additionalInfo).toBe('Operation failed');
      expect(decoded.innerStatusCode).not.toBeNull();
      expect(decoded.innerStatusCode?.getValue()).toBe(StatusCodes.BadUnexpectedError);
    });
    
    it('should encode/decode DiagnosticInfo with all Int32 index fields', () => {
      const encoder = new BinaryEncoder();
      const diag = diagnosticInfo(1, 2, 3, 4, null, null, null);
      
      encodeBinary(encoder, diag);
      
      const buffer = encoder.getBuffer();
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeBinary(decoder);
      
      expect(decoded.symbolicId).toBe(1);
      expect(decoded.namespaceUri).toBe(2);
      expect(decoded.localizedText).toBe(3);
      expect(decoded.locale).toBe(4);
      expect(decoded.additionalInfo).toBeNull();
      expect(decoded.innerStatusCode).toBeNull();
      expect(decoded.innerDiagnosticInfo).toBeNull();
    });
    
    it('should encode/decode DiagnosticInfo with all fields except inner', () => {
      const encoder = new BinaryEncoder();
      const diag = diagnosticInfo(
        10,
        20,
        30,
        40,
        'Additional diagnostic information',
        statusCode(StatusCodes.BadTimeout),
        null
      );
      
      encodeBinary(encoder, diag);
      
      const buffer = encoder.getBuffer();
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeBinary(decoder);
      
      expect(decoded.symbolicId).toBe(10);
      expect(decoded.namespaceUri).toBe(20);
      expect(decoded.localizedText).toBe(30);
      expect(decoded.locale).toBe(40);
      expect(decoded.additionalInfo).toBe('Additional diagnostic information');
      expect(decoded.innerStatusCode?.getValue()).toBe(StatusCodes.BadTimeout);
      expect(decoded.innerDiagnosticInfo).toBeNull();
    });
  });
  
  describe('Recursive DiagnosticInfo', () => {
    it('should encode/decode nested DiagnosticInfo (1 level)', () => {
      const encoder = new BinaryEncoder();
      const inner = simpleDiagnosticInfo('Inner error');
      const outer = nestedDiagnosticInfo('Outer error', inner);
      
      encodeBinary(encoder, outer);
      
      const buffer = encoder.getBuffer();
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeBinary(decoder);
      
      expect(decoded.additionalInfo).toBe('Outer error');
      expect(decoded.innerDiagnosticInfo).not.toBeNull();
      expect(decoded.innerDiagnosticInfo?.additionalInfo).toBe('Inner error');
      expect(decoded.innerDiagnosticInfo?.innerDiagnosticInfo).toBeNull();
    });
    
    it('should encode/decode deeply nested DiagnosticInfo (3 levels)', () => {
      const encoder = new BinaryEncoder();
      const level3 = simpleDiagnosticInfo('Level 3 error');
      const level2 = nestedDiagnosticInfo('Level 2 error', level3);
      const level1 = nestedDiagnosticInfo('Level 1 error', level2);
      
      encodeBinary(encoder, level1);
      
      const buffer = encoder.getBuffer();
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeBinary(decoder);
      
      expect(decoded.additionalInfo).toBe('Level 1 error');
      expect(decoded.innerDiagnosticInfo).not.toBeNull();
      expect(decoded.innerDiagnosticInfo?.additionalInfo).toBe('Level 2 error');
      expect(decoded.innerDiagnosticInfo?.innerDiagnosticInfo).not.toBeNull();
      expect(decoded.innerDiagnosticInfo?.innerDiagnosticInfo?.additionalInfo).toBe('Level 3 error');
      expect(decoded.innerDiagnosticInfo?.innerDiagnosticInfo?.innerDiagnosticInfo).toBeNull();
    });
    
    it('should encode/decode nested DiagnosticInfo with mixed fields', () => {
      const encoder = new BinaryEncoder();
      const inner = diagnosticInfo(
        100,
        null,
        null,
        null,
        'Inner diagnostic',
        statusCode(StatusCodes.BadInternalError),
        null
      );
      const outer = diagnosticInfo(
        200,
        201,
        null,
        null,
        'Outer diagnostic',
        null,
        inner
      );
      
      encodeBinary(encoder, outer);
      
      const buffer = encoder.getBuffer();
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeBinary(decoder);
      
      expect(decoded.symbolicId).toBe(200);
      expect(decoded.namespaceUri).toBe(201);
      expect(decoded.additionalInfo).toBe('Outer diagnostic');
      expect(decoded.innerStatusCode).toBeNull();
      expect(decoded.innerDiagnosticInfo).not.toBeNull();
      expect(decoded.innerDiagnosticInfo?.symbolicId).toBe(100);
      expect(decoded.innerDiagnosticInfo?.additionalInfo).toBe('Inner diagnostic');
      expect(decoded.innerDiagnosticInfo?.innerStatusCode?.getValue()).toBe(StatusCodes.BadInternalError);
    });
  });
  
  describe('Encoding Mask Verification', () => {
    it('should set correct encoding mask bits for each field', () => {
      const tests = [
        { diag: diagnosticInfo(1, null, null, null, null, null, null), expectedMask: 0x01 },
        { diag: diagnosticInfo(null, 2, null, null, null, null, null), expectedMask: 0x02 },
        { diag: diagnosticInfo(null, null, 3, null, null, null, null), expectedMask: 0x04 },
        { diag: diagnosticInfo(null, null, null, 4, null, null, null), expectedMask: 0x08 },
        { diag: simpleDiagnosticInfo('text'), expectedMask: 0x10 },
        { diag: diagnosticInfoWithStatus('text', statusCode(StatusCodes.Good)), expectedMask: 0x30 },
        { diag: nestedDiagnosticInfo('text', diagnosticInfo()), expectedMask: 0x50 },
      ];
      
      for (const { diag, expectedMask } of tests) {
        const encoder = new BinaryEncoder();
        encodeBinary(encoder, diag);
        const buffer = encoder.getBuffer();
        expect(buffer[0]).toBe(expectedMask);
      }
    });
    
    it('should set all mask bits when all fields present', () => {
      const encoder = new BinaryEncoder();
      const inner = simpleDiagnosticInfo('inner');
      const diag = diagnosticInfo(
        1,
        2,
        3,
        4,
        'additional',
        statusCode(StatusCodes.Good),
        inner
      );
      
      encodeBinary(encoder, diag);
      
      const buffer = encoder.getBuffer();
      const allBits = 0x01 | 0x02 | 0x04 | 0x08 | 0x10 | 0x20 | 0x40; // 0x7F
      expect(buffer[0]).toBe(allBits);
    });
  });
  
  describe('Round-Trip Tests', () => {
    it('should round-trip various DiagnosticInfo configurations', () => {
      const testCases: DiagnosticInfo[] = [
        diagnosticInfo(),
        simpleDiagnosticInfo('Simple error'),
        diagnosticInfo(1, 2, 3, 4, null, null, null),
        diagnosticInfoWithStatus('Error', statusCode(StatusCodes.BadTimeout)),
        nestedDiagnosticInfo('Outer', simpleDiagnosticInfo('Inner')),
        diagnosticInfo(10, 20, 30, 40, 'Full info', statusCode(StatusCodes.BadUnexpectedError), null),
      ];
      
      for (const original of testCases) {
        const encoder = new BinaryEncoder();
        encodeBinary(encoder, original);
        
        const decoder = new BinaryDecoder(encoder.getBuffer());
        const decoded = decodeBinary(decoder);
        
        expect(decoded.symbolicId).toBe(original.symbolicId);
        expect(decoded.namespaceUri).toBe(original.namespaceUri);
        expect(decoded.localizedText).toBe(original.localizedText);
        expect(decoded.locale).toBe(original.locale);
        expect(decoded.additionalInfo).toBe(original.additionalInfo);
        expect(decoded.innerStatusCode?.getValue()).toBe(original.innerStatusCode?.getValue());
        
        if (original.innerDiagnosticInfo) {
          expect(decoded.innerDiagnosticInfo).not.toBeNull();
          expect(decoded.innerDiagnosticInfo?.additionalInfo).toBe(original.innerDiagnosticInfo.additionalInfo);
        } else {
          expect(decoded.innerDiagnosticInfo).toBeNull();
        }
      }
    });
  });
  
  describe('Edge Cases', () => {
    it('should handle zero values for Int32 indices', () => {
      const encoder = new BinaryEncoder();
      const diag = diagnosticInfo(0, 0, 0, 0, null, null, null);
      
      encodeBinary(encoder, diag);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(decoded.symbolicId).toBe(0);
      expect(decoded.namespaceUri).toBe(0);
      expect(decoded.localizedText).toBe(0);
      expect(decoded.locale).toBe(0);
    });
    
    it('should handle negative values for Int32 indices', () => {
      const encoder = new BinaryEncoder();
      const diag = diagnosticInfo(-1, -100, -999, -12345, null, null, null);
      
      encodeBinary(encoder, diag);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(decoded.symbolicId).toBe(-1);
      expect(decoded.namespaceUri).toBe(-100);
      expect(decoded.localizedText).toBe(-999);
      expect(decoded.locale).toBe(-12345);
    });
    
    it('should handle empty string in additionalInfo', () => {
      const encoder = new BinaryEncoder();
      const diag = simpleDiagnosticInfo('');
      
      encodeBinary(encoder, diag);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(decoded.additionalInfo).toBe('');
    });
    
    it('should handle very long additionalInfo string', () => {
      const encoder = new BinaryEncoder();
      const longString = 'A'.repeat(1000);
      const diag = simpleDiagnosticInfo(longString);
      
      encodeBinary(encoder, diag);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(decoded.additionalInfo).toBe(longString);
    });
    
    it('should handle DiagnosticInfo with innerStatusCode but no additionalInfo', () => {
      const encoder = new BinaryEncoder();
      const diag = diagnosticInfo(
        null,
        null,
        null,
        null,
        null,
        statusCode(StatusCodes.BadNodeIdInvalid),
        null
      );
      
      encodeBinary(encoder, diag);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(decoded.additionalInfo).toBeNull();
      expect(decoded.innerStatusCode?.getValue()).toBe(StatusCodes.BadNodeIdInvalid);
    });
  });
  
  describe('CodecFacade Integration', () => {
    it('should register with facade', () => {
      const facade = new CodecFacade();
      registerDiagnosticInfo(facade);
      
      const diag = simpleDiagnosticInfo('Test error');
      const buffer = facade.encode(diag, 'i=25');
      
      expect(buffer).toBeDefined();
      
      const decoded = facade.decode<DiagnosticInfo>(buffer, 'i=25');
      expect(decoded.additionalInfo).toBe('Test error');
    });
    
    it('should encode/decode through facade with various configurations', () => {
      const facade = new CodecFacade();
      registerDiagnosticInfo(facade);
      
      const testCases: DiagnosticInfo[] = [
        diagnosticInfo(),
        simpleDiagnosticInfo('Error message'),
        diagnosticInfo(100, 200, null, null, 'Additional info', null, null),
        diagnosticInfoWithStatus('Operation failed', statusCode(StatusCodes.BadTimeout)),
        nestedDiagnosticInfo('Outer error', simpleDiagnosticInfo('Inner error')),
      ];
      
      for (const original of testCases) {
        const buffer = facade.encode(original, 'i=25');
        const decoded = facade.decode<DiagnosticInfo>(buffer, 'i=25');
        
        expect(decoded.additionalInfo).toBe(original.additionalInfo);
        expect(decoded.symbolicId).toBe(original.symbolicId);
        expect(decoded.innerStatusCode?.getValue()).toBe(original.innerStatusCode?.getValue());
      }
    });
  });
  
  describe('Binary Format Verification', () => {
    it('should produce expected byte layout for simple DiagnosticInfo', () => {
      const encoder = new BinaryEncoder();
      const diag = diagnosticInfo(42, null, null, null, null, null, null);
      
      encodeBinary(encoder, diag);
      
      const buffer = encoder.getBuffer();
      expect(buffer.length).toBe(5); // 1 mask + 4 Int32
      expect(buffer[0]).toBe(0x01); // SymbolicId bit
      expect(buffer[1]).toBe(42); // Int32 little-endian: 42, 0, 0, 0
      expect(buffer[2]).toBe(0);
      expect(buffer[3]).toBe(0);
      expect(buffer[4]).toBe(0);
    });
    
    it('should produce correct size for nested DiagnosticInfo', () => {
      const encoder = new BinaryEncoder();
      const inner = simpleDiagnosticInfo('Inner');
      const outer = nestedDiagnosticInfo('Outer', inner);
      
      encodeBinary(encoder, outer);
      
      const buffer = encoder.getBuffer();
      // Outer: 1 mask + 4 length + 5 "Outer" + inner bytes
      // Inner: 1 mask + 4 length + 5 "Inner"
      // Total: 1 + 4 + 5 + 1 + 4 + 5 = 20 bytes
      expect(buffer.length).toBe(20);
    });
  });
});
