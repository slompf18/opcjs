/**
 * @fileoverview DateTime primitive type encoder/decoder
 * @module codec/primitives/datetime
 */

import { IEncoder } from '../interfaces/encoder.js';
import { IDecoder } from '../interfaces/decoder.js';
import { CodecFacade } from '../facade.js';
import { EncodingFormat } from '../types.js';

/**
 * Encode a DateTime value.
 * Binary: Int64 representing 100-nanosecond intervals since January 1, 1601 UTC
 * Valid range: January 1, 1601 to December 31, 9999 (per FR-016)
 * 
 * @see OPC 10000-6 Section 5.2.2.5 - DateTime
 * @see FR-016 - DateTime as Int64 ticks since 1601-01-01 UTC, valid range 1601-9999
 */
export function encodeBinary(encoder: IEncoder, value: Date): void {
  encoder.writeDateTime(value);
}

/**
 * Decode a DateTime value.
 * Binary: Int64 representing 100-nanosecond intervals since January 1, 1601 UTC
 * 
 * @see OPC 10000-6 Section 5.2.2.5 - DateTime
 */
export function decodeBinary(decoder: IDecoder): Date {
  return decoder.readDateTime();
}

/**
 * Register DateTime type with CodecFacade.
 */
export function registerDateTime(facade: CodecFacade): void {
  facade.registerType('DateTime', 'i=13', EncodingFormat.Binary, encodeBinary, decodeBinary);
}
