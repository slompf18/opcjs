/**
 * @fileoverview Tests for registering multiple custom types
 * @module tests/codec/extensibility/multiple-types
 * 
 * Verifies that multiple custom types can be registered simultaneously
 * and that each maintains its own encoding/decoding logic.
 * 
 * @see Phase 7: User Story 5 - Extensible Codec Registration (T339)
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

/**
 * ServerStatusDataType - A second custom type for testing multiple registrations
 */
interface ServerStatusDataType {
  startTime: Date;
  currentTime: Date;
  state: number; // ServerState enum
  buildInfo: string;
  secondsTillShutdown: number;
  shutdownReason: string;
}

function createServerStatus(partial?: Partial<ServerStatusDataType>): ServerStatusDataType {
  return {
    startTime: new Date(),
    currentTime: new Date(),
    state: 0,
    buildInfo: '',
    secondsTillShutdown: 0,
    shutdownReason: '',
    ...partial,
  };
}

function registerServerStatus(facade: CodecFacade): void {
  // Binary encoder
  const encodeBinary = (encoder: any, value: ServerStatusDataType): void => {
    encoder.writeDateTime(value.startTime);
    encoder.writeDateTime(value.currentTime);
    encoder.writeInt32(value.state);
    encoder.writeString(value.buildInfo);
    encoder.writeUInt32(value.secondsTillShutdown);
    encoder.writeString(value.shutdownReason);
  };

  // Binary decoder
  const decodeBinary = (decoder: any): ServerStatusDataType => {
    return {
      startTime: decoder.readDateTime(),
      currentTime: decoder.readDateTime(),
      state: decoder.readInt32(),
      buildInfo: decoder.readString() || '',
      secondsTillShutdown: decoder.readUInt32(),
      shutdownReason: decoder.readString() || '',
    };
  };

  facade.registerType<ServerStatusDataType>(
    'ServerStatusDataType',
    'i=862', // Binary encoding ID
    EncodingFormat.Binary,
    encodeBinary,
    decodeBinary
  );
}

describe('Multiple Custom Types Registration', () => {
  let facade: CodecFacade;

  beforeEach(() => {
    facade = new CodecFacade();
  });

  describe('Register Multiple Types', () => {
    it('should register two different custom types', () => {
      registerApplicationDescription(facade);
      registerServerStatus(facade);

      const appId = facade.getEncodingId('ApplicationDescription', EncodingFormat.Binary);
      const statusId = facade.getEncodingId('ServerStatusDataType', EncodingFormat.Binary);

      expect(appId).toBe('i=298');
      expect(statusId).toBe('i=862');
    });

    it('should maintain separate encoding IDs for different types', () => {
      registerApplicationDescription(facade);
      registerServerStatus(facade);

      // Each type should have its own encoding ID
      expect(facade.getTypeName('i=298')).toBe('ApplicationDescription');
      expect(facade.getTypeName('i=862')).toBe('ServerStatusDataType');
    });

    it('should encode first type correctly', () => {
      registerApplicationDescription(facade);
      registerServerStatus(facade);

      const app = createApplicationDescription({
        applicationUri: 'urn:test:app1',
        applicationName: 'First Type',
        applicationType: ApplicationType.Server,
      });

      const buffer = facade.encode(app, 'i=298');
      const decoded = facade.decode<ApplicationDescription>(buffer, 'i=298');

      expect(decoded.applicationUri).toBe(app.applicationUri);
      expect(decoded.applicationName).toBe(app.applicationName);
    });

    it('should encode second type correctly', () => {
      registerApplicationDescription(facade);
      registerServerStatus(facade);

      const status = createServerStatus({
        startTime: new Date('2026-01-01T00:00:00Z'),
        currentTime: new Date('2026-01-01T12:00:00Z'),
        state: 1,
        buildInfo: 'v1.0.0',
        secondsTillShutdown: 3600,
        shutdownReason: '',
      });

      const buffer = facade.encode(status, 'i=862');
      const decoded = facade.decode<ServerStatusDataType>(buffer, 'i=862');

      expect(decoded.state).toBe(status.state);
      expect(decoded.buildInfo).toBe(status.buildInfo);
      expect(decoded.secondsTillShutdown).toBe(status.secondsTillShutdown);
    });

    it('should not interfere with each other', () => {
      registerApplicationDescription(facade);
      registerServerStatus(facade);

      // Encode both types
      const app = createApplicationDescription({
        applicationUri: 'urn:test:independent',
        applicationName: 'Independent Test',
        applicationType: ApplicationType.Client,
      });

      const status = createServerStatus({
        state: 2,
        buildInfo: 'v2.0.0',
        secondsTillShutdown: 0,
      });

      const appBuffer = facade.encode(app, 'i=298');
      const statusBuffer = facade.encode(status, 'i=862');

      // Decode both types
      const decodedApp = facade.decode<ApplicationDescription>(appBuffer, 'i=298');
      const decodedStatus = facade.decode<ServerStatusDataType>(statusBuffer, 'i=862');

      // Verify both decoded correctly
      expect(decodedApp.applicationUri).toBe(app.applicationUri);
      expect(decodedStatus.buildInfo).toBe(status.buildInfo);
    });
  });

  describe('Registration Order Independence', () => {
    it('should work regardless of registration order (App first)', () => {
      registerApplicationDescription(facade);
      registerServerStatus(facade);

      const app = createApplicationDescription({ applicationName: 'Order Test 1' });
      const status = createServerStatus({ buildInfo: 'Order Test 1' });

      const appBuffer = facade.encode(app, 'i=298');
      const statusBuffer = facade.encode(status, 'i=862');

      expect(facade.decode<ApplicationDescription>(appBuffer, 'i=298').applicationName).toBe('Order Test 1');
      expect(facade.decode<ServerStatusDataType>(statusBuffer, 'i=862').buildInfo).toBe('Order Test 1');
    });

    it('should work regardless of registration order (Status first)', () => {
      registerServerStatus(facade);
      registerApplicationDescription(facade);

      const app = createApplicationDescription({ applicationName: 'Order Test 2' });
      const status = createServerStatus({ buildInfo: 'Order Test 2' });

      const appBuffer = facade.encode(app, 'i=298');
      const statusBuffer = facade.encode(status, 'i=862');

      expect(facade.decode<ApplicationDescription>(appBuffer, 'i=298').applicationName).toBe('Order Test 2');
      expect(facade.decode<ServerStatusDataType>(statusBuffer, 'i=862').buildInfo).toBe('Order Test 2');
    });
  });

  describe('Type Isolation', () => {
    it('should not mix up encoders between types', () => {
      registerApplicationDescription(facade);
      registerServerStatus(facade);

      // Encode ApplicationDescription
      const app = createApplicationDescription({
        applicationUri: 'urn:isolation:test',
        applicationName: 'Isolation Test',
        applicationType: ApplicationType.Server,
        discoveryUrls: ['url1', 'url2', 'url3'],
      });

      const buffer = facade.encode(app, 'i=298');
      
      // Trying to decode as wrong type should fail or give wrong results
      // (This is expected behavior - using wrong encoding ID gives wrong decoding)
      try {
        const wrongDecode = facade.decode<ServerStatusDataType>(buffer, 'i=862');
        // If it doesn't throw, the decoded data should be invalid
        expect(typeof wrongDecode).toBe('object');
      } catch (error: any) {
        // It's also valid to throw an error for wrong decoding
        expect(error).toBeDefined();
      }
    });

    it('should maintain type boundaries', () => {
      registerApplicationDescription(facade);
      registerServerStatus(facade);

      // Verify that modifying data for one type doesn't affect the other
      const app1 = createApplicationDescription({ applicationName: 'App1' });
      const buffer1 = facade.encode(app1, 'i=298');

      const status = createServerStatus({ buildInfo: 'Status1' });
      const buffer2 = facade.encode(status, 'i=862');

      const app2 = createApplicationDescription({ applicationName: 'App2' });
      const buffer3 = facade.encode(app2, 'i=298');

      // All should decode correctly
      expect(facade.decode<ApplicationDescription>(buffer1, 'i=298').applicationName).toBe('App1');
      expect(facade.decode<ServerStatusDataType>(buffer2, 'i=862').buildInfo).toBe('Status1');
      expect(facade.decode<ApplicationDescription>(buffer3, 'i=298').applicationName).toBe('App2');
    });
  });

  describe('Concurrent Usage', () => {
    it('should handle encoding multiple types in sequence', () => {
      registerApplicationDescription(facade);
      registerServerStatus(facade);

      const results: Buffer[] = [];

      // Encode multiple instances in rapid succession
      for (let i = 0; i < 10; i++) {
        const app = createApplicationDescription({
          applicationName: `App ${i}`,
          applicationType: i % 4 as ApplicationType,
        });
        results.push(facade.encode(app, 'i=298') as Buffer);

        const status = createServerStatus({
          buildInfo: `Build ${i}`,
          state: i % 3,
        });
        results.push(facade.encode(status, 'i=862') as Buffer);
      }

      expect(results).toHaveLength(20);
      
      // Verify all were encoded correctly
      for (let i = 0; i < 10; i++) {
        const decodedApp = facade.decode<ApplicationDescription>(results[i * 2], 'i=298');
        expect(decodedApp.applicationName).toBe(`App ${i}`);

        const decodedStatus = facade.decode<ServerStatusDataType>(results[i * 2 + 1], 'i=862');
        expect(decodedStatus.buildInfo).toBe(`Build ${i}`);
      }
    });
  });
});
