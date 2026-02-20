/**
 * @fileoverview Int32 primitive type encoder/decoder
 * @module codec/primitives/int32
 */

import { IEncoder } from '../interfaces/encoder.js';
import { IDecoder } from '../interfaces/decoder.js';
import { CodecFacade } from '../facade.js';
import { EncodingFormat } from '../types.js';

/**
 * Encode an Int32 value.
 * Binary: 4 bytes, little-endian, two's complement for negative values
 * 
 * @see OPC 10000-6 Section 5.2.2.2 - Int32
 * @see FR-008 - Little-endian byte order
 */
export function encodeBinary(encoder: IEncoder, value: number): void {
  encoder.writeInt32(value);
}

/**
 * Decode an Int32 value.
 * Binary: 4 bytes, little-endian
 * 
 * @see OPC 10000-6 Section 5.2.2.2 - Int32
 */
export function decodeBinary(decoder: IDecoder): number {
  return decoder.readInt32();
}

/**
 * Register Int32 type with CodecFacade.
 * This demonstrates the unified registration API.
 * 
 * @param facade The codec facade
 * 
 * @see FR-041 - Unified registration API for all types
 */
export function registerInt32(facade: CodecFacade): void {
  // Binary format
  facade.registerType('Int32', 'i=6', EncodingFormat.Binary, encodeBinary, decodeBinary);
  
  // XML format (TODO)
  // facade.registerType('Int32', 'i=6_xml', EncodingFormat.Xml, encodeXml, decodeXml);
  
  // JSON format (TODO)
  // facade.registerType('Int32', 'i=6_json', EncodingFormat.Json, encodeJson, decodeJson);
}
