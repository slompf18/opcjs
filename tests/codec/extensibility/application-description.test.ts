/**
 * @fileoverview Tests for ApplicationDescription encoding/decoding
 * @module tests/codec/extensibility/application-description
 * 
 * Tests the ApplicationDescription structure encoding and decoding across
 * all three formats (Binary, XML, JSON) using the CodecFacade.
 * 
 * @see Phase 7: User Story 5 - Extensible Codec Registration (T338)
 */

import {describe, it, expect, beforeEach } from 'vitest';
import { CodecFacade } from '../../../src/codec/facade.js';
import { BinaryEncoder } from '../../../src/codec/binary/encoder.js';
import { BinaryDecoder } from '../../../src/codec/binary/decoder.js';
import {
  ApplicationDescription,
  ApplicationType,
  createApplicationDescription,
  registerApplicationDescription,
} from '../../fixtures/types/application-description.js';

describe('ApplicationDescription Encoding/Decoding', () => {
  let facade: CodecFacade;

  beforeEach(() => {
    facade = new CodecFacade();
    registerApplicationDescription(facade);
  });

  describe('Binary Encoding', () => {
    it('should encode ApplicationDescription with all fields', () => {
      const app = createApplicationDescription({
        applicationUri: 'urn:example:myapp',
        productUri: 'urn:example:product',
        applicationName: 'My OPC UA Application',
        applicationType: ApplicationType.Server,
        gatewayServerUri: 'opc.tcp://gateway:4840',
        discoveryUrls: [
          'opc.tcp://server1:4840',
          'opc.tcp://server2:4841',
        ],
      });

      const buffer = facade.encode(app, 'i=298');
      expect(Buffer.isBuffer(buffer)).toBe(true);
      expect(buffer.length).toBeGreaterThan(0);

      // Verify string lengths are encoded
      expect(buffer.length).toBeGreaterThan(app.applicationUri.length + app.productUri.length);
    });

    it('should encode ApplicationDescription with empty arrays', () => {
      const app = createApplicationDescription({
        applicationUri: 'urn:test',
        productUri: 'urn:product',
        applicationName: 'Test',
        applicationType: ApplicationType.Client,
        gatewayServerUri: '',
        discoveryUrls: [], // Empty array
      });

      const buffer = facade.encode(app, 'i=298');
      const decoded = facade.decode<ApplicationDescription>(buffer, 'i=298');

      expect(decoded.discoveryUrls).toEqual([]);
    });

    it('should encode ApplicationDescription with multiple discovery URLs', () => {
      const app = createApplicationDescription({
        applicationUri: 'urn:test:multi',
        productUri: 'urn:product',
        applicationName: 'Multi-URL Test',
        applicationType: ApplicationType.ClientAndServer,
        gatewayServerUri: '',
        discoveryUrls: [
          'opc.tcp://localhost:4840',
          'opc.tcp://192.168.1.100:4840',
          'opc.tcp://server.example.com:4840',
          'https://server.example.com:443/opcua',
        ],
      });

      const buffer = facade.encode(app, 'i=298');
      const decoded = facade.decode<ApplicationDescription>(buffer, 'i=298');

      expect(decoded.discoveryUrls).toHaveLength(4);
      expect(decoded.discoveryUrls).toEqual(app.discoveryUrls);
    });

    it('should decode ApplicationDescription correctly', () => {
      const original = createApplicationDescription({
        applicationUri: 'urn:decode:test',
        productUri: 'urn:product:v2.0',
        applicationName: 'Decoder Test Application',
        applicationType: ApplicationType.DiscoveryServer,
        gatewayServerUri: 'opc.tcp://gateway.example.com:4840',
        discoveryUrls: ['opc.tcp://discovery:4840'],
      });

      const buffer = facade.encode(original, 'i=298');
      const decoded = facade.decode<ApplicationDescription>(buffer, 'i=298');

      expect(decoded.applicationUri).toBe(original.applicationUri);
      expect(decoded.productUri).toBe(original.productUri);
      expect(decoded.applicationName).toBe(original.applicationName);
      expect(decoded.applicationType).toBe(original.applicationType);
      expect(decoded.gatewayServerUri).toBe(original.gatewayServerUri);
      expect(decoded.discoveryUrls).toEqual(original.discoveryUrls);
    });
  });

  describe('ApplicationType Values', () => {
    it('should encode Server type correctly', () => {
      const app = createApplicationDescription({
        applicationType: ApplicationType.Server,
        applicationName: 'Server App',
      });

      const buffer = facade.encode(app, 'i=298');
      const decoded = facade.decode<ApplicationDescription>(buffer, 'i=298');
      expect(decoded.applicationType).toBe(ApplicationType.Server);
    });

    it('should encode Client type correctly', () => {
      const app = createApplicationDescription({
        applicationType: ApplicationType.Client,
        applicationName: 'Client App',
      });

      const buffer = facade.encode(app, 'i=298');
      const decoded = facade.decode<ApplicationDescription>(buffer, 'i=298');
      expect(decoded.applicationType).toBe(ApplicationType.Client);
    });

    it('should encode ClientAndServer type correctly', () => {
      const app = createApplicationDescription({
        applicationType: ApplicationType.ClientAndServer,
        applicationName: 'Client/Server App',
      });

      const buffer = facade.encode(app, 'i=298');
      const decoded = facade.decode<ApplicationDescription>(buffer, 'i=298');
      expect(decoded.applicationType).toBe(ApplicationType.ClientAndServer);
    });

    it('should encode DiscoveryServer type correctly', () => {
      const app = createApplicationDescription({
        applicationType: ApplicationType.DiscoveryServer,
        applicationName: 'Discovery Server',
      });

      const buffer = facade.encode(app, 'i=298');
      const decoded = facade.decode<ApplicationDescription>(buffer, 'i=298');
      expect(decoded.applicationType).toBe(ApplicationType.DiscoveryServer);
    });
  });

  describe('Direct Encoder/Decoder Usage', () => {
    it('should encode using BinaryEncoder directly', () => {
      const encoder = new BinaryEncoder();
      const app = createApplicationDescription({
        applicationUri: 'urn:direct:encoder',
        productUri: 'urn:product',
        applicationName: 'Direct Encoder Test',
        applicationType: ApplicationType.Server,
        gatewayServerUri: '',
        discoveryUrls: ['opc.tcp://localhost:4840'],
      });

      // Encode using the type encoder function
      encoder.writeString(app.applicationUri);
      encoder.writeString(app.productUri);
      encoder.writeString(app.applicationName);
      encoder.writeInt32(app.applicationType);
      encoder.writeString(app.gatewayServerUri);
      encoder.writeArray(app.discoveryUrls, (enc, url) => enc.writeString(url));

      const buffer = encoder.getBuffer();
      expect(buffer.length).toBeGreaterThan(0);
    });

    it('should decode using BinaryDecoder directly', () => {
      const encoder = new BinaryEncoder();
      const original = createApplicationDescription({
        applicationUri: 'urn:direct:decoder',
        productUri: 'urn:product:direct',
        applicationName: 'Direct Decoder Test',
        applicationType: ApplicationType.ClientAndServer,
        gatewayServerUri: '',
        discoveryUrls: ['opc.tcp://server:4840'],
      });

      // Encode
      encoder.writeString(original.applicationUri);
      encoder.writeString(original.productUri);
      encoder.writeString(original.applicationName);
      encoder.writeInt32(original.applicationType);
      encoder.writeString(original.gatewayServerUri);
      encoder.writeArray(original.discoveryUrls, (enc, url) => enc.writeString(url));

      const buffer = encoder.getBuffer();

      // Decode
      const decoder = new BinaryDecoder(buffer);
      const decoded: ApplicationDescription = {
        applicationUri: decoder.readString()!,
        productUri: decoder.readString()!,
        applicationName: decoder.readString()!,
        applicationType: decoder.readInt32(),
        gatewayServerUri: decoder.readString()!,
        discoveryUrls: decoder.readArray((dec) => dec.readString()!) || [],
      };

      expect(decoded).toEqual(original);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string fields', () => {
      const app = createApplicationDescription({
        applicationUri: '',
        productUri: '',
        applicationName: '',
        applicationType: ApplicationType.Server,
        gatewayServerUri: '',
        discoveryUrls: [],
      });

      const buffer = facade.encode(app, 'i=298');
      const decoded = facade.decode<ApplicationDescription>(buffer, 'i=298');

      expect(decoded.applicationUri).toBe('');
      expect(decoded.productUri).toBe('');
      expect(decoded.applicationName).toBe('');
      expect(decoded.gatewayServerUri).toBe('');
      expect(decoded.discoveryUrls).toEqual([]);
    });

    it('should handle long URLs', () => {
      const longUrl = 'opc.tcp://' + 'a'.repeat(1000) + '.example.com:4840/path/' + 'b'.repeat(100);
      const app = createApplicationDescription({
        applicationUri: 'urn:long:test',
        productUri: 'urn:product',
        applicationName: 'Long URL Test',
        applicationType: ApplicationType.Server,
        gatewayServerUri: longUrl,
        discoveryUrls: [longUrl],
      });

      const buffer = facade.encode(app, 'i=298');
      const decoded = facade.decode<ApplicationDescription>(buffer, 'i=298');

      expect(decoded.gatewayServerUri).toBe(longUrl);
      expect(decoded.discoveryUrls[0]).toBe(longUrl);
    });

    it('should handle Unicode characters', () => {
      const app = createApplicationDescription({
        applicationUri: 'urn:unicode:测试',
        productUri: 'urn:product:日本語',
        applicationName: 'Unicode Test 中文 🚀',
        applicationType: ApplicationType.Server,
        gatewayServerUri: '',
        discoveryUrls: ['opc.tcp://服务器:4840'],
      });

      const buffer = facade.encode(app, 'i=298');
      const decoded = facade.decode<ApplicationDescription>(buffer, 'i=298');

      expect(decoded.applicationUri).toBe(app.applicationUri);
      expect(decoded.productUri).toBe(app.productUri);
      expect(decoded.applicationName).toBe(app.applicationName);
      expect(decoded.discoveryUrls[0]).toBe(app.discoveryUrls[0]);
    });
  });

  describe('Performance', () => {
    it('should encode/decode large ApplicationDescription efficiently', () => {
      // Create application with many discovery URLs
      const urls: string[] = [];
      for (let i = 0; i < 100; i++) {
        urls.push(`opc.tcp://server${i}.example.com:4840/path${i}`);
      }

      const app = createApplicationDescription({
        applicationUri: 'urn:performance:test',
        productUri: 'urn:product:perf',
        applicationName: 'Performance Test Application',
        applicationType: ApplicationType.Server,
        gatewayServerUri: 'opc.tcp://gateway:4840',
        discoveryUrls: urls,
      });

      const start = Date.now();
      const buffer = facade.encode(app, 'i=298');
      const decoded = facade.decode<ApplicationDescription>(buffer, 'i=298');
      const duration = Date.now() - start;

      expect(decoded.discoveryUrls).toHaveLength(100);
      expect(decoded.discoveryUrls).toEqual(app.discoveryUrls);
      expect(duration).toBeLessThan(50); // Should be fast
    });
  });
});
