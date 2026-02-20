/**
 * @fileoverview Test CodecFacade with primitive type registration
 * @module codec/facade
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { CodecFacade } from '../../../src/codec/facade.js';
import { registerBoolean } from '../../../src/codec/primitives/boolean.js';
import { registerInt32 } from '../../../src/codec/primitives/int32.js';
import { registerString } from '../../../src/codec/primitives/string.js';
import { EncodingFormat } from '../../../src/codec/types.js';

describe('CodecFacade', () => {
  let facade: CodecFacade;

  beforeEach(() => {
    facade = new CodecFacade();
  });

  describe('Type Registration', () => {
    it('should register Boolean type', () => {
      registerBoolean(facade);
      
      const encodingId = facade.getEncodingId('Boolean', EncodingFormat.Binary);
      expect(encodingId).toBe('i=1');
      
      const typeName = facade.getTypeName('i=1');
      expect(typeName).toBe('Boolean');
    });

    it('should register Int32 type', () => {
      registerInt32(facade);
      
      const encodingId = facade.getEncodingId('Int32', EncodingFormat.Binary);
      expect(encodingId).toBe('i=6');
    });

    it('should register String type', () => {
      registerString(facade);
      
      const encodingId = facade.getEncodingId('String', EncodingFormat.Binary);
      expect(encodingId).toBe('i=12');
    });
  });

  describe('Encode/Decode via Facade', () => {
    beforeEach(() => {
      registerBoolean(facade);
      registerInt32(facade);
      registerString(facade);
    });

    it('should encode and decode Boolean via facade', () => {
      const buffer = facade.encode(true, 'i=1');
      expect(buffer.length).toBe(1);
      
      const value = facade.decode<boolean>(buffer, 'i=1');
      expect(value).toBe(true);
    });

    it('should encode and decode Int32 via facade', () => {
      const buffer = facade.encode(42, 'i=6');
      expect(buffer.length).toBe(4);
      
      const value = facade.decode<number>(buffer, 'i=6');
      expect(value).toBe(42);
    });

    it('should encode and decode String via facade', () => {
      const buffer = facade.encode('Hello, OPC UA!', 'i=12');
      
      const value = facade.decode<string>(buffer, 'i=12');
      expect(value).toBe('Hello, OPC UA!');
    });

    it('should encode and decode null string via facade', () => {
      const buffer = facade.encode(null, 'i=12');
      expect(buffer.length).toBe(4); // -1 as Int32
      
      const value = facade.decode<string | null>(buffer, 'i=12');
      expect(value).toBeNull();
    });
  });

  describe('Error Handling (FR-044)', () => {
    it('should throw error with encoding ID when encoding with unregistered ID', () => {
      try {
        facade.encode(42, 'i=999');
        expect.fail('Should have thrown error');
      } catch (error: any) {
        expect(error.message).toContain('Unregistered encoding ID: i=999');
        expect(error.encodingId).toBe('i=999');
        expect(error.suggestedAction).toContain('Register encoder');
      }
    });

    it('should throw error with encoding ID when decoding with unregistered ID', () => {
      try {
        facade.decode(Buffer.from([0x01, 0x02, 0x03, 0x04]), 'i=999');
        expect.fail('Should have thrown error');
      } catch (error: any) {
        expect(error.message).toContain('Unregistered encoding ID: i=999');
        expect(error.encodingId).toBe('i=999');
        expect(error.suggestedAction).toContain('Register decoder');
      }
    });
  });
});
