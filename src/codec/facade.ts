/**
 * @fileoverview CodecFacade - Central registry and router for OPC UA codecs
 * @module codec/facade
 */

import { EncodingFormat, TypeEncoder, TypeDecoder, EncodingMetadata } from './types.js';
import { CodecError } from './errors.js';
import { IEncoder } from './interfaces/encoder.js';
import { IDecoder } from './interfaces/decoder.js';
import { BinaryEncoder } from './binary/encoder.js';
import { BinaryDecoder } from './binary/decoder.js';
import { XmlEncoder } from './xml/encoder.js';
import { XmlDecoder } from './xml/decoder.js';
import { JsonEncoder } from './json/encoder.js';
import { JsonDecoder } from './json/decoder.js';
import { ITelemetryContext, NoOpTelemetryContext } from './telemetry.js';

/**
 * CodecFacade provides the central registry and routing for OPC UA encoding/decoding.
 * Implements FR-036 to FR-045 - facade with encoding ID routing and type registration.
 * 
 * @see FR-036 - Codec facade that accepts encoding ID and routes to appropriate encoder/decoder
 * @see FR-041 - Support registration of custom encoder/decoder strategies
 * @see FR-042 - Allow generated types to register multiple encoding IDs
 * @see FR-043 - Provide lookup function to retrieve encoding ID
 * @see FR-044 - Return error with encoding ID, format, and suggested action
 */
export class CodecFacade {
  private readonly encodingMap = new Map<string, EncodingMetadata>();
  private readonly typeFormatMap = new Map<string, Map<EncodingFormat, string>>();
  private readonly telemetry: ITelemetryContext;
  private readonly logger;

  constructor(telemetry?: ITelemetryContext) {
    this.telemetry = telemetry || new NoOpTelemetryContext();
    this.logger = this.telemetry.createLogger('CodecFacade');
  }

  /**
   * Register a type with its encoder and decoder for a specific format.
   * This is the unified registration API used by both primitives and generated types.
   * 
   * @param typeName The type name (e.g., 'Int32', 'NodeId')
   * @param encodingId The encoding ID as NodeId string (e.g., 'i=24')
   * @param format The encoding format
   * @param encoder The encoder function
   * @param decoder The decoder function
   * 
   * @see FR-041 - Support registration of custom encoder/decoder strategies
   */
  registerType<T>(
    typeName: string,
    encodingId: string,
    format: EncodingFormat,
    encoder: TypeEncoder<T>,
    decoder: TypeDecoder<T>
  ): void {
    const metadata: EncodingMetadata = {
      typeName,
      encodingId,
      format,
      encoder,
      decoder,
    };

    this.encodingMap.set(encodingId, metadata);

    // Also maintain type->format->encodingId mapping for lookup
    if (!this.typeFormatMap.has(typeName)) {
      this.typeFormatMap.set(typeName, new Map());
    }
    this.typeFormatMap.get(typeName)!.set(format, encodingId);

    this.logger.debug('Registered type', {
      typeName,
      encodingId,
      format,
    });
  }

  /**
   * Register an encoding ID (typically from NodeIds.csv).
   * This is used during initialization to map encoding IDs to types.
   * 
   * @param encodingId The encoding ID as NodeId string
   * @param typeName The type name
   * @param format The encoding format (detected from suffix or explicitly provided)
   * 
   * @see FR-037 - Parse NodeIds.csv to build mapping of encoding IDs
   */
  registerEncodingId(encodingId: string, typeName: string, format: EncodingFormat): void {
    // If encoder/decoder already registered for this type+format, link it
    const formatMap = this.typeFormatMap.get(typeName);
    if (formatMap && formatMap.has(format)) {
      const existingEncodingId = formatMap.get(format)!;
      const existingMetadata = this.encodingMap.get(existingEncodingId);
      if (existingMetadata) {
        // Create alias
        this.encodingMap.set(encodingId, existingMetadata);
        return;
      }
    }

    // Otherwise just remember the mapping for later
    if (!this.typeFormatMap.has(typeName)) {
      this.typeFormatMap.set(typeName, new Map());
    }
    this.typeFormatMap.get(typeName)!.set(format, encodingId);
  }

  /**
   * Get encoding ID for a type and format.
   * 
   * @param typeName The type name
   * @param format The encoding format
   * @returns The encoding ID, or null if not found
   * 
   * @see FR-043 - Provide lookup function to retrieve encoding ID
   */
  getEncodingId(typeName: string, format: EncodingFormat): string | null {
    const formatMap = this.typeFormatMap.get(typeName);
    if (!formatMap) {
      return null;
    }
    return formatMap.get(format) || null;
  }

  /**
   * Get type name from encoding ID.
   * 
   * @param encodingId The encoding ID
   * @returns The type name, or null if not found
   * 
   * @see FR-043 - Provide lookup function
   */
  getTypeName(encodingId: string): string | null {
    const metadata = this.encodingMap.get(encodingId);
    return metadata ? metadata.typeName : null;
  }

  /**
   * Get format from encoding ID.
   * 
   * @param encodingId The encoding ID
   * @returns The encoding format, or null if not found
   * 
   * @see FR-043 - Provide lookup function
   */
  getFormat(encodingId: string): EncodingFormat | null {
    const metadata = this.encodingMap.get(encodingId);
    return metadata ? metadata.format : null;
  }

  /**
   * Encode a value using the registered encoder for the given encoding ID.
   * 
   * @param value The value to encode
   * @param encodingId The encoding ID
   * @returns The encoded buffer (Binary) or string (XML/JSON)
   * @throws {CodecError} if encoding ID not registered or encoding fails
   * 
   * @see FR-036 - Facade accepts encoding ID and routes to appropriate encoder
   * @see FR-044 - Return error with encoding ID, format, and suggested action
   */
  encode<T>(value: T, encodingId: string): Buffer | string {
    const metadata = this.encodingMap.get(encodingId);
    
    if (!metadata) {
      throw new CodecError(
        `Unregistered encoding ID: ${encodingId}`,
        {
          encodingId,
          suggestedAction: `Register encoder for encoding ID ${encodingId} or verify encoding ID is correct`,
        }
      );
    }

    const startTime = Date.now();
    
    try {
      // Create appropriate encoder based on format
      let encoder: any;
      let result: Buffer | string;
      
      switch (metadata.format) {
        case EncodingFormat.Binary:
          encoder = new BinaryEncoder();
          metadata.encoder(encoder, value);
          result = encoder.getBuffer();
          break;
        case EncodingFormat.Xml:
          encoder = new XmlEncoder();
          metadata.encoder(encoder, value);
          result = encoder.getXml();
          break;
        case EncodingFormat.Json:
          encoder = new JsonEncoder();
          metadata.encoder(encoder, value);
          result = encoder.getJson();
          break;
        default:
          throw new CodecError(`Unknown encoding format: ${metadata.format}`);
      }

      const duration = Date.now() - startTime;

      this.logger.info('Encoded value', {
        operationType: 'encode',
        typeName: metadata.typeName,
        encodingFormat: metadata.format,
        resultSize: typeof result === 'string' ? result.length : result.length,
        durationMs: duration,
      });

      return result;
    } catch (error) {
      this.logger.error('Encoding failed', error as Error, {
        operationType: 'encode',
        typeName: metadata.typeName,
        encodingId,
        encodingFormat: metadata.format,
      });
      
      throw error;
    }
  }

  /**
   * Decode a value using the registered decoder for the given encoding ID.
   * 
   * @param data The buffer (Binary) or string (XML/JSON) to decode
   * @param encodingId The encoding ID
   * @returns The decoded value
   * @throws {CodecError} if encoding ID not registered or decoding fails
   * 
   * @see FR-036 - Facade accepts encoding ID and routes to appropriate decoder
   * @see FR-044 - Return error with encoding ID, format, and suggested action
   */
  decode<T>(data: Buffer | string, encodingId: string): T {
    const metadata = this.encodingMap.get(encodingId);
    
    if (!metadata) {
      throw new CodecError(
        `Unregistered encoding ID: ${encodingId}`,
        {
          encodingId,
          suggestedAction: `Register decoder for encoding ID ${encodingId} or verify encoding ID is correct`,
        }
      );
    }

    const startTime = Date.now();
    
    try {
      // Create appropriate decoder based on format
      let decoder: any;
      let result: T;
      
      switch (metadata.format) {
        case EncodingFormat.Binary:
          if (typeof data === 'string') {
            throw new CodecError('Binary format requires Buffer, got string');
          }
          decoder = new BinaryDecoder(data);
          result = metadata.decoder(decoder);
          break;
        case EncodingFormat.Xml:
          if (Buffer.isBuffer(data)) {
            throw new CodecError('XML format requires string, got Buffer');
          }
          decoder = new XmlDecoder(data);
          result = metadata.decoder(decoder);
          break;
        case EncodingFormat.Json:
          if (Buffer.isBuffer(data)) {
            throw new CodecError('JSON format requires string, got Buffer');
          }
          decoder = new JsonDecoder(data);
          result = metadata.decoder(decoder);
          break;
        default:
          throw new CodecError(`Unknown encoding format: ${metadata.format}`);
      }

      const duration = Date.now() - startTime;

      this.logger.info('Decoded value', {
        operationType: 'decode',
        typeName: metadata.typeName,
        encodingFormat: metadata.format,
        durationMs: duration,
      });

      return result;
    } catch (error) {
      this.logger.error('Decoding failed', error as Error, {
        operationType: 'decode',
        typeName: metadata.typeName,
        encodingId,
        encodingFormat: metadata.format,
      });
      
      throw error;
    }
  }
}
