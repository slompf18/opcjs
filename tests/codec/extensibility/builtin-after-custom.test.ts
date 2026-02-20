/**
 * @fileoverview Tests that builtin types still work after custom registration
 * @module tests/codec/extensibility/builtin-after-custom
 * 
 * Verifies that registering custom types does not interfere with the
 * encoding/decoding of builtin primitive types.
 * 
 * @see Phase 7: User Story 5 - Extensible Codec Registration (T341)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { CodecFacade } from '../../../src/codec/facade.js';
import { registerBoolean } from '../../../src/codec/primitives/boolean.js';
import { registerInt32 } from '../../../src/codec/primitives/int32.js';
import { registerString } from '../../../src/codec/primitives/string.js';
import { EncodingFormat } from '../../../src/codec/types.js';
import {
  ApplicationDescription,
  ApplicationType,
  createApplicationDescription,
  registerApplicationDescription,
} from '../../fixtures/types/application-description.js';

describe('Builtin Types After Custom Registration', () => {
  let facade: CodecFacade;

  beforeEach(() => {
    facade = new CodecFacade();
  });

  describe('Builtins Before Custom', () => {
    it('should register builtins first, then custom types', () => {
      // Register builtins first
      registerBoolean(facade);
      registerInt32(facade);
      registerString(facade);

      // Then register custom type
      registerApplicationDescription(facade);

      // Verify all are registered
      expect(facade.getEncodingId('Boolean', EncodingFormat.Binary)).toBe('i=1');
      expect(facade.getEncodingId('Int32', EncodingFormat.Binary)).toBe('i=6');
      expect(facade.getEncodingId('String', EncodingFormat.Binary)).toBe('i=12');
      expect(facade.getEncodingId('ApplicationDescription', EncodingFormat.Binary)).toBe('i=298');
    });

    it('should encode builtins after custom type registered', () => {
      registerBoolean(facade);
      registerInt32(facade);
      registerString(facade);
      registerApplicationDescription(facade);

      // Encode builtin types
      const boolBuffer = facade.encode(true, 'i=1');
      const int32Buffer = facade.encode(42, 'i=6');
      const stringBuffer = facade.encode('Hello', 'i=12');

      // All should encode successfully
      expect(Buffer.isBuffer(boolBuffer)).toBe(true);
      expect(Buffer.isBuffer(int32Buffer)).toBe(true);
      expect(Buffer.isBuffer(stringBuffer)).toBe(true);

      // Decode and verify
      expect(facade.decode<boolean>(boolBuffer, 'i=1')).toBe(true);
      expect(facade.decode<number>(int32Buffer, 'i=6')).toBe(42);
      expect(facade.decode<string>(stringBuffer, 'i=12')).toBe('Hello');
    });

    it('should encode custom type after builtins registered', () => {
      registerBoolean(facade);
      registerInt32(facade);
      registerString(facade);
      registerApplicationDescription(facade);

      const app = createApplicationDescription({
        applicationUri: 'urn:test:mixed',
        applicationName: 'Mixed Registration Test',
        applicationType: ApplicationType.Server,
      });

      const buffer = facade.encode(app, 'i=298');
      const decoded = facade.decode<ApplicationDescription>(buffer, 'i=298');

      expect(decoded.applicationUri).toBe(app.applicationUri);
      expect(decoded.applicationName).toBe(app.applicationName);
    });
  });

  describe('Custom Before Builtins', () => {
    it('should register custom type first, then builtins', () => {
      // Register custom type first
      registerApplicationDescription(facade);

      // Then register builtins
      registerBoolean(facade);
      registerInt32(facade);
      registerString(facade);

      // Verify all are registered
      expect(facade.getEncodingId('ApplicationDescription', EncodingFormat.Binary)).toBe('i=298');
      expect(facade.getEncodingId('Boolean', EncodingFormat.Binary)).toBe('i=1');
      expect(facade.getEncodingId('Int32', EncodingFormat.Binary)).toBe('i=6');
      expect(facade.getEncodingId('String', EncodingFormat.Binary)).toBe('i=12');
    });

    it('should encode builtins after custom registered first', () => {
      registerApplicationDescription(facade);
      registerBoolean(facade);
      registerInt32(facade);
      registerString(facade);

      // Encode builtin types
      const boolBuffer = facade.encode(false, 'i=1');
      const int32Buffer = facade.encode(999, 'i=6');
      const stringBuffer = facade.encode('Test', 'i=12');

      // Decode and verify
      expect(facade.decode<boolean>(boolBuffer, 'i=1')).toBe(false);
      expect(facade.decode<number>(int32Buffer, 'i=6')).toBe(999);
      expect(facade.decode<string>(stringBuffer, 'i=12')).toBe('Test');
    });
  });

  describe('Interleaved Encoding', () => {
    beforeEach(() => {
      registerBoolean(facade);
      registerInt32(facade);
      registerString(facade);
      registerApplicationDescription(facade);
    });

    it('should encode builtin, then custom, then builtin again', () => {
      // Encode Boolean
      const bool1 = facade.encode(true, 'i=1');
      expect(facade.decode<boolean>(bool1, 'i=1')).toBe(true);

      // Encode ApplicationDescription
      const app = createApplicationDescription({ applicationName: 'Interleaved' });
      const appBuffer = facade.encode(app, 'i=298');
      expect(facade.decode<ApplicationDescription>(appBuffer, 'i=298').applicationName).toBe('Interleaved');

      // Encode Int32
      const int1 = facade.encode(12345, 'i=6');
      expect(facade.decode<number>(int1, 'i=6')).toBe(12345);
    });

    it('should encode multiple instances of each type', () => {
      const results: Array<{ type: string; buffer: Buffer; original: any }> = [];

      // Encode 5 instances of each type in mixed order
      for (let i = 0; i < 5; i++) {
        // Boolean
        const boolVal = i % 2 === 0;
        results.push({
          type: 'Boolean',
          buffer: facade.encode(boolVal, 'i=1') as Buffer,
          original: boolVal,
        });

        // Int32
        const intVal = i * 100;
        results.push({
          type: 'Int32',
          buffer: facade.encode(intVal, 'i=6') as Buffer,
          original: intVal,
        });

        // Custom type
        const app = createApplicationDescription({
          applicationName: `App ${i}`,
          applicationType: (i % 4) as ApplicationType,
        });
        results.push({
          type: 'ApplicationDescription',
          buffer: facade.encode(app, 'i=298') as Buffer,
          original: app,
        });

        // String
        const strVal = `String ${i}`;
        results.push({
          type: 'String',
          buffer: facade.encode(strVal, 'i=12') as Buffer,
          original: strVal,
        });
      }

      // Verify all 20 encodings (5 * 4 types)
      expect(results).toHaveLength(20);

      // Decode and verify each one
      for (const { type, buffer, original } of results) {
        if (type === 'Boolean') {
          expect(facade.decode<boolean>(buffer, 'i=1')).toBe(original);
        } else if (type === 'Int32') {
          expect(facade.decode<number>(buffer, 'i=6')).toBe(original);
        } else if (type === 'String') {
          expect(facade.decode<string>(buffer, 'i=12')).toBe(original);
        } else if (type === 'ApplicationDescription') {
          const decoded = facade.decode<ApplicationDescription>(buffer, 'i=298');
          expect(decoded.applicationName).toBe((original as ApplicationDescription).applicationName);
        }
      }
    });
  });

  describe('No Interference', () => {
    beforeEach(() => {
      registerBoolean(facade);
      registerInt32(facade);
      registerString(facade);
      registerApplicationDescription(facade);
    });

    it('should not corrupt builtin Boolean encoding', () => {
      const testValues = [true, false, true, true, false];
      
      for (const value of testValues) {
        const buffer = facade.encode(value, 'i=1');
        const decoded = facade.decode<boolean>(buffer, 'i=1');
        expect(decoded).toBe(value);
      }
    });

    it('should not corrupt builtin Int32 encoding', () => {
      const testValues = [0, 1, -1, 2147483647, -2147483648, 42, -999];
      
      for (const value of testValues) {
        const buffer = facade.encode(value, 'i=6');
        const decoded = facade.decode<number>(buffer, 'i=6');
        expect(decoded).toBe(value);
      }
    });

    it('should not corrupt builtin String encoding', () => {
      const testValues = [
        '',
        'Hello',
        'Unicode: 测试',
        'Long: ' + 'a'.repeat(1000),
        'Special: <>&"\'',
      ];
      
      for (const value of testValues) {
        const buffer = facade.encode(value, 'i=12');
        const decoded = facade.decode<string>(buffer, 'i=12');
        expect(decoded).toBe(value);
      }
    });

    it('should not corrupt custom type encoding', () => {
      const testValues = [
        createApplicationDescription({ applicationName: 'Test 1', applicationType: ApplicationType.Server }),
        createApplicationDescription({ applicationName: 'Test 2', applicationType: ApplicationType.Client }),
        createApplicationDescription({
          applicationUri: 'urn:test:3',
          applicationName: 'Test 3',
          applicationType: ApplicationType.ClientAndServer,
          discoveryUrls: ['url1', 'url2', 'url3'],
        }),
      ];
      
      for (const value of testValues) {
        const buffer = facade.encode(value, 'i=298');
        const decoded = facade.decode<ApplicationDescription>(buffer, 'i=298');
        expect(decoded.applicationName).toBe(value.applicationName);
        expect(decoded.applicationType).toBe(value.applicationType);
        expect(decoded.discoveryUrls).toEqual(value.discoveryUrls);
      }
    });
  });

  describe('Registration Independence', () => {
    it('should maintain separate encoding IDs', () => {
      registerBoolean(facade);
      registerInt32(facade);
      registerString(facade);
      registerApplicationDescription(facade);

      // Each type should have its own unique encoding ID
      const ids = [
        facade.getEncodingId('Boolean', EncodingFormat.Binary),
        facade.getEncodingId('Int32', EncodingFormat.Binary),
        facade.getEncodingId('String', EncodingFormat.Binary),
        facade.getEncodingId('ApplicationDescription', EncodingFormat.Binary),
      ];

      // All IDs should be unique
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(4);
    });

    it('should maintain separate type names', () => {
      registerBoolean(facade);
      registerInt32(facade);
      registerString(facade);
      registerApplicationDescription(facade);

      expect(facade.getTypeName('i=1')).toBe('Boolean');
      expect(facade.getTypeName('i=6')).toBe('Int32');
      expect(facade.getTypeName('i=12')).toBe('String');
      expect(facade.getTypeName('i=298')).toBe('ApplicationDescription');
    });

    it('should maintain separate formats', () => {
      registerBoolean(facade);
      registerInt32(facade);
      registerString(facade);
      registerApplicationDescription(facade);

      expect(facade.getFormat('i=1')).toBe(EncodingFormat.Binary);
      expect(facade.getFormat('i=6')).toBe(EncodingFormat.Binary);
      expect(facade.getFormat('i=12')).toBe(EncodingFormat.Binary);
      expect(facade.getFormat('i=298')).toBe(EncodingFormat.Binary);
    });
  });

  describe('Performance Not Degraded', () => {
    beforeEach(() => {
      registerBoolean(facade);
      registerInt32(facade);
      registerString(facade);
      registerApplicationDescription(facade);
    });

    it('should encode builtins quickly even after custom registration', () => {
      const iterations = 1000;
      const start = Date.now();

      for (let i = 0; i < iterations; i++) {
        const boolBuffer = facade.encode(true, 'i=1');
        facade.decode<boolean>(boolBuffer, 'i=1');
      }

      const duration = Date.now() - start;
      expect(duration).toBeLessThan(100); // Should process 1000 bools in <100ms
    });

    it('should encode custom types efficiently alongside builtins', () => {
      const iterations = 100;
      const start = Date.now();

      for (let i = 0; i < iterations; i++) {
        // Encode a builtin
        const intBuffer = facade.encode(i, 'i=6');
        facade.decode<number>(intBuffer, 'i=6');

        // Encode a custom type
        const app = createApplicationDescription({ applicationName: `App ${i}` });
        const appBuffer = facade.encode(app, 'i=298');
        facade.decode<ApplicationDescription>(appBuffer, 'i=298');
      }

      const duration = Date.now() - start;
      expect(duration).toBeLessThan(200); // Should complete in reasonable time
    });
  });
});
