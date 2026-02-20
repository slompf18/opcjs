/**
 * @fileoverview Int16 and UInt16 primitive type encoders/decoders
 * @module codec/primitives/int16
 */

import { IEncoder } from '../interfaces/encoder.js';
import { IDecoder } from '../interfaces/decoder.js';
import { CodecFacade } from '../facade.js';
import { EncodingFormat } from '../types.js';

/**
 * Encode an Int16 value (signed 16-bit integer).
 * Binary: 2 bytes, little-endian
 * 
 * @see OPC 10000-6 Section 5.2.2.2 - Int16
 * @see FR-008 - Little-endian byte order
 */
export function encodeInt16AsBinary(encoder: IEncoder, value: number): void {
  encoder.writeInt16(value);
}

/**
 * Decode an Int16 value.
 * Binary: 2 bytes, little-endian
 * 
 * @see OPC 10000-6 Section 5.2.2.2 - Int16
 */
export function decodeInt16FromBinary(decoder: IDecoder): number {
  return decoder.readInt16();
}

/**
 * Encode a UInt16 value (unsigned 16-bit integer).
 * Binary: 2 bytes, little-endian
 * 
 * @see OPC 10000-6 Section 5.2.2.2 - UInt16
 * @see FR-008 - Little-endian byte order
 */
export function encodeUInt16AsBinary(encoder: IEncoder, value: number): void {
  encoder.writeUInt16(value);
}

/**
 * Decode a UInt16 value.
 * Binary: 2 bytes, little-endian
 * 
 * @see OPC 10000-6 Section 5.2.2.2 - UInt16
 */
export function decodeUInt16FromBinary(decoder: IDecoder): number {
  return decoder.readUInt16();
}

/**
 * Register Int16 type with CodecFacade.
 */
export function registerInt16(facade: CodecFacade): void {
  facade.registerType('Int16', 'i=4', EncodingFormat.Binary, encodeInt16AsBinary, decodeInt16FromBinary);
}

/**
 * Register UInt16 type with CodecFacade.
 */
export function registerUInt16(facade: CodecFacade): void {
  facade.registerType('UInt16', 'i=5', EncodingFormat.Binary, encodeUInt16AsBinary, decodeUInt16FromBinary);
}
