/**
 * @fileoverview Tests for custom type registration with CodecFacade
 * @module tests/codec/extensibility/registration
 * 
 * These tests verify that the unified registration API works for custom
 * types (like ApplicationDescription) in the same way as builtin types.
 * 
 * @see Phase 7: User Story 5 - Extensible Codec Registration (T337)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { CodecFacade } from '../../../src/codec/facade.js';
import { EncodingFormat } from '../../../src/codec/types.js';
import {
  ApplicationDescription,
  ApplicationType,
  createApplicationDescription,
  registerApplicationDescription,
} from '../../fixtures/types/application-description.js';

describe('Custom Type Registration', () => {
  let facade: CodecFacade;

  beforeEach(() => {
    facade = new CodecFacade();
  });

  describe('Registration API', () => {
    it('should register ApplicationDescription type', () => {
      registerApplicationDescription(facade);

      // Verify encoding IDs were registered
      const binaryId = facade.getEncodingId('ApplicationDescription', EncodingFormat.Binary);
      expect(binaryId).toBe('i=298');

      const xmlId = facade.getEncodingId('ApplicationDescription', EncodingFormat.Xml);
      expect(xmlId).toBe('i=299');

      const jsonId = facade.getEncodingId('ApplicationDescription', EncodingFormat.Json);
      expect(jsonId).toBe('i=15634');
    });

    it('should retrieve type name from encoding ID', () => {
      registerApplicationDescription(facade);

      const typeName = facade.getTypeName('i=298');
      expect(typeName).toBe('ApplicationDescription');
    });

    it('should retrieve format from encoding ID', () => {
      registerApplicationDescription(facade);

      const format = facade.getFormat('i=298');
      expect(format).toBe(EncodingFormat.Binary);
    });

    it('should return null for unregistered encoding ID', () => {
      const typeName = facade.getTypeName('i=999999');
      expect(typeName).toBeNull();

      const format = facade.getFormat('i=999999');
      expect(format).toBeNull();
    });

    it('should return null for unregistered type', () => {
      const encodingId = facade.getEncodingId('UnknownType', EncodingFormat.Binary);
      expect(encodingId).toBeNull();
    });
  });

  describe('Encoding via Facade', () => {
    beforeEach(() => {
      registerApplicationDescription(facade);
    });

    it('should encode ApplicationDescription using Binary encoding ID', () => {
      const app = createApplicationDescription({
        applicationUri: 'urn:example:app',
        productUri: 'urn:example:product',
        applicationName: 'Test Application',
        applicationType: ApplicationType.Server,
        gatewayServerUri: '',
        discoveryUrls: ['opc.tcp://localhost:4840'],
      });

      const buffer = facade.encode(app, 'i=298'); // Binary encoding ID
      expect(Buffer.isBuffer(buffer)).toBe(true);
      expect(buffer.length).toBeGreaterThan(0);
    });

    it('should encode ApplicationDescription using XML encoding ID', () => {
      const app = createApplicationDescription({
        applicationUri: 'urn:example:app',
        productUri: 'urn:example:product',
        applicationName: 'Test Application',
        applicationType: ApplicationType.ClientAndServer,
      });

      const xml = facade.encode(app, 'i=299'); // XML encoding ID
      expect(typeof xml).toBe('string');
      expect(xml).toContain('<ApplicationDescription>');
    });

    it('should encode ApplicationDescription using JSON encoding ID', () => {
      const app = createApplicationDescription({
        applicationUri: 'urn:example:app',
        productUri: 'urn:example:product',
        applicationName: 'Test Application',
        applicationType: ApplicationType.Client,
      });

      const json = facade.encode(app, 'i=15634'); // JSON encoding ID
      expect(typeof json).toBe('string');
      const parsed = JSON.parse(json as string);
      expect(parsed.ApplicationUri).toBe('urn:example:app');
    });

    it('should throw error for unregistered encoding ID', () => {
      const app = createApplicationDescription();
      expect(() => facade.encode(app, 'i=999999')).toThrow();
    });
  });

  describe('Decoding via Facade', () => {
    beforeEach(() => {
      registerApplicationDescription(facade);
    });

    it('should decode ApplicationDescription from Binary', () => {
      const original = createApplicationDescription({
        applicationUri: 'urn:test:app',
        productUri: 'urn:test:product',
        applicationName: 'Decoded Application',
        applicationType: ApplicationType.DiscoveryServer,
        gatewayServerUri: 'opc.tcp://gateway:4840',
        discoveryUrls: ['opc.tcp://server1:4840', 'opc.tcp://server2:4840'],
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

    it('should decode ApplicationDescription from XML', () => {
      const original = createApplicationDescription({
        applicationUri: 'urn:xml:test',
        applicationName: 'XML Test App',
        applicationType: ApplicationType.Server,
      });

      const xml = facade.encode(original, 'i=299');
      const decoded = facade.decode<ApplicationDescription>(xml, 'i=299');

      expect(decoded.applicationUri).toBe(original.applicationUri);
      expect(decoded.applicationName).toBe(original.applicationName);
    });

    it('should decode ApplicationDescription from JSON', () => {
      const original = createApplicationDescription({
        applicationUri: 'urn:json:test',
        applicationName: 'JSON Test App',
        applicationType: ApplicationType.Client,
        discoveryUrls: ['opc.tcp://localhost:4840'],
      });

      const json = facade.encode(original, 'i=15634');
      const decoded = facade.decode<ApplicationDescription>(json, 'i=15634');

      expect(decoded.applicationUri).toBe(original.applicationUri);
      expect(decoded.applicationName).toBe(original.applicationName);
      expect(decoded.discoveryUrls).toEqual(original.discoveryUrls);
    });

    it('should throw error for unregistered encoding ID', () => {
      const buffer = Buffer.from([0x01, 0x02, 0x03]);
      expect(() => facade.decode(buffer, 'i=999999')).toThrow();
    });
  });

  describe('Round-trip Encoding', () => {
    beforeEach(() => {
      registerApplicationDescription(facade);
    });

    it('should round-trip ApplicationDescription through Binary', () => {
      const original = createApplicationDescription({
        applicationUri: 'urn:roundtrip:binary',
        productUri: 'urn:product:v1',
        applicationName: 'Round-trip Binary Test',
        applicationType: ApplicationType.ClientAndServer,
        gatewayServerUri: 'opc.tcp://gateway:4840',
        discoveryUrls: [
          'opc.tcp://server1:4840',
          'opc.tcp://server2:4841',
          'opc.tcp://server3:4842',
        ],
      });

      const buffer = facade.encode(original, 'i=298');
      const decoded = facade.decode<ApplicationDescription>(buffer, 'i=298');

      expect(decoded).toEqual(original);
    });

    it('should round-trip ApplicationDescription through XML', () => {
      const original = createApplicationDescription({
        applicationUri: 'urn:roundtrip:xml',
        applicationName: 'Round-trip XML Test',
        applicationType: ApplicationType.Server,
      });

      const xml = facade.encode(original, 'i=299');
      const decoded = facade.decode<ApplicationDescription>(xml, 'i=299');

      expect(decoded.applicationUri).toBe(original.applicationUri);
      expect(decoded.applicationName).toBe(original.applicationName);
    });

    it('should round-trip ApplicationDescription through JSON', () => {
      const original = createApplicationDescription({
        applicationUri: 'urn:roundtrip:json',
        applicationName: 'Round-trip JSON Test',
        applicationType: ApplicationType.DiscoveryServer,
        discoveryUrls: ['opc.tcp://discovery:4840'],
      });

      const json = facade.encode(original, 'i=15634');
      const decoded = facade.decode<ApplicationDescription>(json, 'i=15634');

      expect(decoded.applicationUri).toBe(original.applicationUri);
      expect(decoded.applicationName).toBe(original.applicationName);
      expect(decoded.applicationType).toBe(original.applicationType);
      expect(decoded.discoveryUrls).toEqual(original.discoveryUrls);
    });
  });
});
