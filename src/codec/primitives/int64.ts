/**
 * @fileoverview Int64 and UInt64 primitive type encoders/decoders
 * @module codec/primitives/int64
 */

import { IEncoder } from '../interfaces/encoder.js';
import { IDecoder } from '../interfaces/decoder.js';
import { CodecFacade } from '../facade.js';
import { EncodingFormat } from '../types.js';

/**
 * Encode an Int64 value (signed 64-bit integer).
 * Binary: 8 bytes, little-endian
 * Note: JavaScript uses BigInt for 64-bit integers
 * 
 * @see OPC 10000-6 Section 5.2.2.2 - Int64
 * @see FR-008 - Little-endian byte order
 */
export function encodeInt64AsBinary(encoder: IEncoder, value: bigint): void {
  encoder.writeInt64(value);
}

/**
 * Decode an Int64 value.
 * Binary: 8 bytes, little-endian
 * 
 * @see OPC 10000-6 Section 5.2.2.2 - Int64
 */
export function decodeInt64FromBinary(decoder: IDecoder): bigint {
  return decoder.readInt64();
}

/**
 * Encode a UInt64 value (unsigned 64-bit integer).
 * Binary: 8 bytes, little-endian
 * 
 * @see OPC 10000-6 Section 5.2.2.2 - UInt64
 * @see FR-008 - Little-endian byte order
 */
export function encodeUInt64AsBinary(encoder: IEncoder, value: bigint): void {
  encoder.writeUInt64(value);
}

/**
 * Decode a UInt64 value.
 * Binary: 8 bytes, little-endian
 * 
 * @see OPC 10000-6 Section 5.2.2.2 - UInt64
 */
export function decodeUInt64FromBinary(decoder: IDecoder): bigint {
  return decoder.readUInt64();
}

/**
 * Register Int64 type with CodecFacade.
 */
export function registerInt64(facade: CodecFacade): void {
  facade.registerType('Int64', 'i=8', EncodingFormat.Binary, encodeInt64AsBinary, decodeInt64FromBinary);
}

/**
 * Register UInt64 type with CodecFacade.
 */
export function registerUInt64(facade: CodecFacade): void {
  facade.registerType('UInt64', 'i=9', EncodingFormat.Binary, encodeUInt64AsBinary, decodeUInt64FromBinary);
}
