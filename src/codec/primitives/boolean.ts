/**
 * @fileoverview Boolean primitive type encoder/decoder
 * @module codec/primitives/boolean
 */

import { IEncoder } from '../interfaces/encoder.js';
import { IDecoder } from '../interfaces/decoder.js';
import { CodecFacade } from '../facade.js';
import { EncodingFormat } from '../types.js';

/**
 * Encode a Boolean value.
 * Binary: 1 byte (0x00=false, 0x01=true)
 * 
 * @see OPC 10000-6 Section 5.2.2.1 - Boolean
 */
export function encodeBinary(encoder: IEncoder, value: boolean): void {
  encoder.writeBoolean(value);
}

/**
 * Decode a Boolean value.
 * Binary: 1 byte (0x00=false, any other value=true)
 * 
 * @see OPC 10000-6 Section 5.2.2.1 - Boolean
 */
export function decodeBinary(decoder: IDecoder): boolean {
  return decoder.readBoolean();
}

/**
 * Register Boolean type with CodecFacade.
 * This demonstrates the unified registration API.
 * 
 * @param facade The codec facade
 * 
 * @see FR-041 - Unified registration API for all types
 */
export function registerBoolean(facade: CodecFacade): void {
  // Binary format
  facade.registerType('Boolean', 'i=1', EncodingFormat.Binary, encodeBinary, decodeBinary);
  
  // XML format (TODO)
  // facade.registerType('Boolean', 'i=1_xml', EncodingFormat.Xml, encodeXml, decodeXml);
  
  // JSON format (TODO)
  // facade.registerType('Boolean', 'i=1_json', EncodingFormat.Json, encodeJson, decodeJson);
}
