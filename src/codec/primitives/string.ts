/**
 * @fileoverview String primitive type encoder/decoder
 * @module codec/primitives/string
 */

import { IEncoder } from '../interfaces/encoder.js';
import { IDecoder } from '../interfaces/decoder.js';
import { CodecFacade } from '../facade.js';
import { EncodingFormat } from '../types.js';

/**
 * Encode a String value.
 * Binary: Int32 length prefix + UTF-8 bytes (-1 for null, 0 for empty)
 * 
 * @see OPC 10000-6 Section 5.2.2.4 - String
 * @see FR-010 - String values as length-prefixed UTF-8
 */
export function encodeBinary(encoder: IEncoder, value: string | null): void {
  encoder.writeString(value);
}

/**
 * Decode a String value.
 * Binary: Int32 length prefix + UTF-8 bytes (-1 for null)
 * 
 * @see OPC 10000-6 Section 5.2.2.4 - String
 */
export function decodeBinary(decoder: IDecoder): string | null {
  return decoder.readString();
}

/**
 * Register String type with CodecFacade.
 * This demonstrates the unified registration API.
 * 
 * @param facade The codec facade
 * 
 * @see FR-041 - Unified registration API for all types
 */
export function registerString(facade: CodecFacade): void {
  // Binary format
  facade.registerType('String', 'i=12', EncodingFormat.Binary, encodeBinary, decodeBinary);
  
  // XML format (TODO)
  // facade.registerType('String', 'i=12_xml', EncodingFormat.Xml, encodeXml, decodeXml);
  
  // JSON format (TODO)
  // facade.registerType('String', 'i=12_json', EncodingFormat.Json, encodeJson, decodeJson);
}
