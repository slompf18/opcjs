/**
 * @fileoverview Guid primitive type encoder/decoder
 * @module codec/primitives/guid
 */

import { IEncoder } from '../interfaces/encoder.js';
import { IDecoder } from '../interfaces/decoder.js';
import { CodecFacade } from '../facade.js';
import { EncodingFormat } from '../types.js';

/**
 * Encode a Guid value (UUID/RFC 4122).
 * Binary: 16 bytes (Data1 UInt32, Data2 UInt16, Data3 UInt16, Data4 Byte[8])
 * 
 * @param encoder The encoder instance
 * @param value The GUID as string (e.g., "550e8400-e29b-41d4-a716-446655440000")
 * 
 * @see OPC 10000-6 Table 2 - Guid
 * @see FR-017 - Guid as 16 bytes in RFC 4122 format
 */
export function encodeBinary(encoder: IEncoder, value: string): void {
  encoder.writeGuid(value);
}

/**
 * Decode a Guid value.
 * Binary: 16 bytes (Data1 UInt32, Data2 UInt16, Data3 UInt16, Data4 Byte[8])
 * 
 * @param decoder The decoder instance
 * @returns The GUID as string (lowercase with hyphens)
 * 
 * @see OPC 10000-6 Table 2 - Guid
 */
export function decodeBinary(decoder: IDecoder): string {
  return decoder.readGuid();
}

/**
 * Register Guid type with CodecFacade.
 */
export function registerGuid(facade: CodecFacade): void {
  facade.registerType('Guid', 'i=14', EncodingFormat.Binary, encodeBinary, decodeBinary);
}
