/**
 * @fileoverview Byte and SByte primitive type encoders/decoders
 * @module codec/primitives/byte
 */

import { IEncoder } from '../interfaces/encoder.js';
import { IDecoder } from '../interfaces/decoder.js';
import { CodecFacade } from '../facade.js';
import { EncodingFormat } from '../types.js';

/**
 * Encode a Byte value (unsigned 8-bit integer).
 * Binary: 1 byte (0-255)
 * 
 * @see OPC 10000-6 Section 5.2.2.1 - Byte
 */
export function encodeByteAsBinary(encoder: IEncoder, value: number): void {
  encoder.writeByte(value);
}

/**
 * Decode a Byte value.
 * Binary: 1 byte (0-255)
 * 
 * @see OPC 10000-6 Section 5.2.2.1 - Byte
 */
export function decodeByteFromBinary(decoder: IDecoder): number {
  return decoder.readByte();
}

/**
 * Encode an SByte value (signed 8-bit integer).
 * Binary: 1 byte (-128 to 127)
 * 
 * @see OPC 10000-6 Section 5.2.2.1 - SByte
 */
export function encodeSByteAsBinary(encoder: IEncoder, value: number): void {
  encoder.writeSByte(value);
}

/**
 * Decode an SByte value.
 * Binary: 1 byte (-128 to 127)
 * 
 * @see OPC 10000-6 Section 5.2.2.1 - SByte
 */
export function decodeSByteFromBinary(decoder: IDecoder): number {
  return decoder.readSByte();
}

/**
 * Register Byte type with CodecFacade.
 */
export function registerByte(facade: CodecFacade): void {
  facade.registerType('Byte', 'i=3', EncodingFormat.Binary, encodeByteAsBinary, decodeByteFromBinary);
}

/**
 * Register SByte type with CodecFacade.
 */
export function registerSByte(facade: CodecFacade): void {
  facade.registerType('SByte', 'i=2', EncodingFormat.Binary, encodeSByteAsBinary, decodeSByteFromBinary);
}
