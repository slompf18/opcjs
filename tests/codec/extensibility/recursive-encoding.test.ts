/**
 * @fileoverview Tests for recursive encoding (custom types containing builtins)
 * @module tests/codec/extensibility/recursive-encoding
 * 
 * Verifies that custom types can be encoded correctly when they contain
 * builtin types (String, Int32, DateTime, arrays, etc.).
 * 
 * @see Phase 7: User Story 5 - Extensible Codec Registration (T340)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { CodecFacade } from '../../../src/codec/facade.js';
import {
  ApplicationDescription,
  ApplicationType,
  createApplicationDescription,
  registerApplicationDescription,
} from '../../fixtures/types/application-description.js';

describe('Recursive Encoding - Custom Types with Builtins', () => {
  let facade: CodecFacade;

  beforeEach(() => {
    facade = new CodecFacade();
    registerApplicationDescription(facade);
  });

  describe('String Fields', () => {
    it('should encode ApplicationDescription with String fields', () => {
      const app = createApplicationDescription({
        applicationUri: 'urn:recursive:string:test',
        productUri: 'urn:product:string',
        applicationName: 'String Field Test',
        applicationType: ApplicationType.Server,
        gatewayServerUri: 'opc.tcp://gateway:4840',
        discoveryUrls: [],
      });

      const buffer = facade.encode(app, 'i=298');
      const decoded = facade.decode<ApplicationDescription>(buffer, 'i=298');

      // All string fields should be preserved
      expect(decoded.applicationUri).toBe(app.applicationUri);
      expect(decoded.productUri).toBe(app.productUri);
      expect(decoded.applicationName).toBe(app.applicationName);
      expect(decoded.gatewayServerUri).toBe(app.gatewayServerUri);
    });

    it('should handle null/empty strings in custom type', () => {
      const app = createApplicationDescription({
        applicationUri: '',
        productUri: '',
        applicationName: 'Empty Strings',
        applicationType: ApplicationType.Client,
        gatewayServerUri: '',
        discoveryUrls: [],
      });

      const buffer = facade.encode(app, 'i=298');
      const decoded = facade.decode<ApplicationDescription>(buffer, 'i=298');

      expect(decoded.applicationUri).toBe('');
      expect(decoded.productUri).toBe('');
      expect(decoded.gatewayServerUri).toBe('');
    });
  });

  describe('Int32 Fields', () => {
    it('should encode ApplicationDescription with Int32 enum field', () => {
      const testCases = [
        ApplicationType.Server,
        ApplicationType.Client,
        ApplicationType.ClientAndServer,
        ApplicationType.DiscoveryServer,
      ];

      for (const type of testCases) {
        const app = createApplicationDescription({
          applicationName: `Type ${type}`,
          applicationType: type,
        });

        const buffer = facade.encode(app, 'i=298');
        const decoded = facade.decode<ApplicationDescription>(buffer, 'i=298');

        expect(decoded.applicationType).toBe(type);
      }
    });

    it('should handle Int32 boundary values in custom type', () => {
      // ApplicationType is Int32, test with explicit numeric values
      const app = createApplicationDescription({
        applicationName: 'Boundary Test',
        applicationType: 2147483647 as ApplicationType, // Int32.MaxValue
      });

      const buffer = facade.encode(app, 'i=298');
      const decoded = facade.decode<ApplicationDescription>(buffer, 'i=298');

      expect(decoded.applicationType).toBe(2147483647);
    });
  });

  describe('Array Fields', () => {
    it('should encode ApplicationDescription with String array', () => {
      const urls = [
        'opc.tcp://server1:4840',
        'opc.tcp://server2:4840',
        'opc.tcp://server3:4840',
        'https://server4:443/opcua',
      ];

      const app = createApplicationDescription({
        applicationName: 'Array Test',
        applicationType: ApplicationType.Server,
        discoveryUrls: urls,
      });

      const buffer = facade.encode(app, 'i=298');
      const decoded = facade.decode<ApplicationDescription>(buffer, 'i=298');

      expect(decoded.discoveryUrls).toHaveLength(urls.length);
      expect(decoded.discoveryUrls).toEqual(urls);
    });

    it('should handle empty arrays in custom type', () => {
      const app = createApplicationDescription({
        applicationName: 'Empty Array Test',
        applicationType: ApplicationType.Server,
        discoveryUrls: [],
      });

      const buffer = facade.encode(app, 'i=298');
      const decoded = facade.decode<ApplicationDescription>(buffer, 'i=298');

      expect(decoded.discoveryUrls).toEqual([]);
    });

    it('should handle single-element arrays in custom type', () => {
      const app = createApplicationDescription({
        applicationName: 'Single Element Array',
        applicationType: ApplicationType.Server,
        discoveryUrls: ['opc.tcp://single:4840'],
      });

      const buffer = facade.encode(app, 'i=298');
      const decoded = facade.decode<ApplicationDescription>(buffer, 'i=298');

      expect(decoded.discoveryUrls).toHaveLength(1);
      expect(decoded.discoveryUrls[0]).toBe('opc.tcp://single:4840');
    });

    it('should handle large arrays (100+ elements) in custom type', () => {
      const urls: string[] = [];
      for (let i = 0; i < 150; i++) {
        urls.push(`opc.tcp://server${i}.example.com:4840`);
      }

      const app = createApplicationDescription({
        applicationName: 'Large Array Test',
        applicationType: ApplicationType.Server,
        discoveryUrls: urls,
      });

      const buffer = facade.encode(app, 'i=298');
      const decoded = facade.decode<ApplicationDescription>(buffer, 'i=298');

      expect(decoded.discoveryUrls).toHaveLength(150);
      expect(decoded.discoveryUrls).toEqual(urls);
    });
  });

  describe('Mixed Builtin Types', () => {
    it('should encode custom type with multiple builtin types', () => {
      const app = createApplicationDescription({
        applicationUri: 'urn:mixed:test',           // String
        productUri: 'urn:product:v1.0',             // String
        applicationName: 'Mixed Types Test',         // String
        applicationType: ApplicationType.ClientAndServer, // Int32 (enum)
        gatewayServerUri: 'opc.tcp://gateway:4840', // String
        discoveryUrls: [                             // String[]
          'opc.tcp://url1:4840',
          'opc.tcp://url2:4840',
        ],
      });

      const buffer = facade.encode(app, 'i=298');
      const decoded = facade.decode<ApplicationDescription>(buffer, 'i=298');

      // Verify all fields are correctly preserved
      expect(decoded.applicationUri).toBe(app.applicationUri);
      expect(decoded.productUri).toBe(app.productUri);
      expect(decoded.applicationName).toBe(app.applicationName);
      expect(decoded.applicationType).toBe(app.applicationType);
      expect(decoded.gatewayServerUri).toBe(app.gatewayServerUri);
      expect(decoded.discoveryUrls).toEqual(app.discoveryUrls);
    });

    it('should handle all fields set to non-default values', () => {
      const app = createApplicationDescription({
        applicationUri: 'urn:full:test:12345',
        productUri: 'urn:product:full:v2.5.1',
        applicationName: 'Full Field Test Application Name',
        applicationType: ApplicationType.DiscoveryServer,
        gatewayServerUri: 'opc.tcp://gateway.full.test.com:4840/path/to/endpoint',
        discoveryUrls: [
          'opc.tcp://disc1.test.com:4840',
          'opc.tcp://disc2.test.com:4841',
          'opc.tcp://disc3.test.com:4842',
          'https://disc4.test.com:443/opcua',
        ],
      });

      const buffer = facade.encode(app, 'i=298');
      const decoded = facade.decode<ApplicationDescription>(buffer, 'i=298');

      expect(decoded).toEqual(app);
    });
  });

  describe('Encoding Order', () => {
    it('should encode fields in the correct order', () => {
      // The binary encoding order matters for correct decoding
      const app = createApplicationDescription({
        applicationUri: 'urn:order:test',
        productUri: 'urn:product:order',
        applicationName: 'Order Test',
        applicationType: ApplicationType.Server,
        gatewayServerUri: 'gateway',
        discoveryUrls: ['url1', 'url2'],
      });

      const buffer1 = facade.encode(app, 'i=298');
      
      // Encode same data again - should produce identical buffer
      const buffer2 = facade.encode(app, 'i=298');
      
      expect(buffer1).toEqual(buffer2);
    });

    it('should decode fields in the correct order', () => {
      const app = createApplicationDescription({
        applicationUri: 'field1',
        productUri: 'field2',
        applicationName: 'field3',
        applicationType: ApplicationType.Client,
        gatewayServerUri: 'field5',
        discoveryUrls: ['field6a', 'field6b'],
      });

      const buffer = facade.encode(app, 'i=298');
      const decoded = facade.decode<ApplicationDescription>(buffer, 'i=298');

      // All fields should be in correct positions
      expect(decoded.applicationUri).toBe('field1');
      expect(decoded.productUri).toBe('field2');
      expect(decoded.applicationName).toBe('field3');
      expect(decoded.applicationType).toBe(ApplicationType.Client);
      expect(decoded.gatewayServerUri).toBe('field5');
      expect(decoded.discoveryUrls).toEqual(['field6a', 'field6b']);
    });
  });

  describe('Special Characters in Strings', () => {
    it('should handle Unicode characters in String fields', () => {
      const app = createApplicationDescription({
        applicationUri: 'urn:unicode:测试',
        productUri: 'urn:продукт:日本語',
        applicationName: '应用程序 🌍 Application',
        applicationType: ApplicationType.Server,
        gatewayServerUri: 'opc.tcp://服务器:4840',
        discoveryUrls: ['opc.tcp://サーバー:4840', 'opc.tcp://сервер:4840'],
      });

      const buffer = facade.encode(app, 'i=298');
      const decoded = facade.decode<ApplicationDescription>(buffer, 'i=298');

      expect(decoded.applicationUri).toBe(app.applicationUri);
      expect(decoded.productUri).toBe(app.productUri);
      expect(decoded.applicationName).toBe(app.applicationName);
      expect(decoded.gatewayServerUri).toBe(app.gatewayServerUri);
      expect(decoded.discoveryUrls).toEqual(app.discoveryUrls);
    });

    it('should handle special characters in String fields', () => {
      const app = createApplicationDescription({
        applicationUri: 'urn:special:<>&"\'',
        productUri: 'urn:product:\n\r\t',
        applicationName: 'App\x00Name', // Null byte
        applicationType: ApplicationType.Server,
        gatewayServerUri: 'opc.tcp://host:4840/?param=value&other=test',
        discoveryUrls: ['url?query=1&test=2', 'url#fragment'],
      });

      const buffer = facade.encode(app, 'i=298');
      const decoded = facade.decode<ApplicationDescription>(buffer, 'i=298');

      expect(decoded.applicationUri).toBe(app.applicationUri);
      expect(decoded.productUri).toBe(app.productUri);
      expect(decoded.applicationName).toBe(app.applicationName);
      expect(decoded.discoveryUrls).toEqual(app.discoveryUrls);
    });
  });

  describe('Performance with Builtin Types', () => {
    it('should efficiently encode custom type with many String fields', () => {
      const longString = 'a'.repeat(1000);
      const app = createApplicationDescription({
        applicationUri: longString,
        productUri: longString,
        applicationName: longString,
        applicationType: ApplicationType.Server,
        gatewayServerUri: longString,
        discoveryUrls: Array(50).fill(longString),
      });

      const start = Date.now();
      const buffer = facade.encode(app, 'i=298');
      const decoded = facade.decode<ApplicationDescription>(buffer, 'i=298');
      const duration = Date.now() - start;

      expect(decoded.discoveryUrls).toHaveLength(50);
      expect(duration).toBeLessThan(50); // Should complete quickly
    });
  });
});
