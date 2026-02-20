/**
 * @fileoverview Float and Double primitive type encoders/decoders
 * @module codec/primitives/float
 */

import { IEncoder } from '../interfaces/encoder.js';
import { IDecoder } from '../interfaces/decoder.js';
import { CodecFacade } from '../facade.js';
import { EncodingFormat } from '../types.js';

/**
 * Encode a Float value (32-bit IEEE 754 floating point).
 * Binary: 4 bytes, little-endian
 * Preserves NaN, Infinity, -Infinity per FR-047
 * 
 * @see OPC 10000-6 Section 5.2.2.3 - Float
 * @see FR-009 - IEEE 754 binary representation
 * @see FR-047 - Preserve special values (NaN, Infinity, -Infinity)
 */
export function encodeFloatAsBinary(encoder: IEncoder, value: number): void {
  encoder.writeFloat(value);
}

/**
 * Decode a Float value.
 * Binary: 4 bytes, little-endian, IEEE 754
 * 
 * @see OPC 10000-6 Section 5.2.2.3 - Float
 */
export function decodeFloatFromBinary(decoder: IDecoder): number {
  return decoder.readFloat();
}

/**
 * Encode a Double value (64-bit IEEE 754 floating point).
 * Binary: 8 bytes, little-endian
 * Preserves NaN, Infinity, -Infinity per FR-047
 * 
 * @see OPC 10000-6 Section 5.2.2.3 - Double
 * @see FR-009 - IEEE 754 binary representation
 * @see FR-047 - Preserve special values (NaN, Infinity, -Infinity)
 */
export function encodeDoubleAsBinary(encoder: IEncoder, value: number): void {
  encoder.writeDouble(value);
}

/**
 * Decode a Double value.
 * Binary: 8 bytes, little-endian, IEEE 754
 * 
 * @see OPC 10000-6 Section 5.2.2.3 - Double
 */
export function decodeDoubleFromBinary(decoder: IDecoder): number {
  return decoder.readDouble();
}

/**
 * Register Float type with CodecFacade.
 */
export function registerFloat(facade: CodecFacade): void {
  facade.registerType('Float', 'i=10', EncodingFormat.Binary, encodeFloatAsBinary, decodeFloatFromBinary);
}

/**
 * Register Double type with CodecFacade.
 */
export function registerDouble(facade: CodecFacade): void {
  facade.registerType('Double', 'i=11', EncodingFormat.Binary, encodeDoubleAsBinary, decodeDoubleFromBinary);
}
