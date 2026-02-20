/**
 * @fileoverview UInt32 primitive type encoder/decoder
 * @module codec/primitives/uint32
 */

import { IEncoder } from '../interfaces/encoder.js';
import { IDecoder } from '../interfaces/decoder.js';
import { CodecFacade } from '../facade.js';
import { EncodingFormat } from '../types.js';

/**
 * Encode a UInt32 value (unsigned 32-bit integer).
 * Binary: 4 bytes, little-endian
 * 
 * @see OPC 10000-6 Section 5.2.2.2 - UInt32
 * @see FR-008 - Little-endian byte order
 */
export function encodeBinary(encoder: IEncoder, value: number): void {
  encoder.writeUInt32(value);
}

/**
 * Decode a UInt32 value.
 * Binary: 4 bytes, little-endian
 * 
 * @see OPC 10000-6 Section 5.2.2.2 - UInt32
 */
export function decodeBinary(decoder: IDecoder): number {
  return decoder.readUInt32();
}

/**
 * Register UInt32 type with CodecFacade.
 */
export function registerUInt32(facade: CodecFacade): void {
  facade.registerType('UInt32', 'i=7', EncodingFormat.Binary, encodeBinary, decodeBinary);
}
