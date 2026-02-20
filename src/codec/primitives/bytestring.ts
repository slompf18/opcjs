/**
 * @fileoverview ByteString primitive type encoder/decoder
 * @module codec/primitives/bytestring
 */

import { IEncoder } from '../interfaces/encoder.js';
import { IDecoder } from '../interfaces/decoder.js';
import { CodecFacade } from '../facade.js';
import { EncodingFormat } from '../types.js';

/**
 * Encode a ByteString value.
 * Binary: Int32 length prefix + bytes (-1 for null, 0 for empty)
 * 
 * @param encoder The encoder instance
 * @param value The byte array (null encoded as length -1)
 * 
 * @see OPC 10000-6 Section 5.2.2.6 - ByteString
 * @see FR-019 - ByteString length validation (max 16,777,216 bytes)
 */
export function encodeBinary(encoder: IEncoder, value: Buffer | Uint8Array | null): void {
  encoder.writeByteString(value);
}

/**
 * Decode a ByteString value.
 * Binary: Int32 length prefix + bytes (-1 for null)
 * 
 * @param decoder The decoder instance
 * @returns The byte array (null if length is -1)
 * 
 * @see OPC 10000-6 Section 5.2.2.6 - ByteString
 */
export function decodeBinary(decoder: IDecoder): Buffer | null {
  return decoder.readByteString();
}

/**
 * Register ByteString type with CodecFacade.
 */
export function registerByteString(facade: CodecFacade): void {
  facade.registerType('ByteString', 'i=15', EncodingFormat.Binary, encodeBinary, decodeBinary);
}
