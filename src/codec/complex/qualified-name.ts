/**
 * @fileoverview QualifiedName type definition and encoder/decoder
 * @module codec/complex/qualified-name
 * 
 * QualifiedName represents a name qualified by a namespace index.
 * 
 * @see OPC 10000-6 Section 5.2.2.13 - QualifiedName
 * @see OPC 10000-3 Section 7.18 - QualifiedName
 */

import { IEncoder } from '../interfaces/encoder.js';
import { IDecoder } from '../interfaces/decoder.js';
import { CodecFacade } from '../facade.js';
import { EncodingFormat } from '../types.js';
import { CodecError } from '../errors.js';
import { QualifiedName } from '../../types/src/index.js';

export { QualifiedName };

/**
 * Encode a QualifiedName in Binary format.
 * 
 * Encoding format:
 * - NamespaceIndex: UInt16
 * - Name: String
 * 
 * @param encoder The binary encoder
 * @param value The QualifiedName to encode
 * 
 * @see OPC 10000-6 Table 8 - QualifiedName
 */
export function encodeBinary(encoder: IEncoder, value: QualifiedName): void {
  encoder.writeUInt16(value.namespaceIndex);
  encoder.writeString(value.name);
}

/**
 * Decode a QualifiedName from Binary format.
 * 
 * @param decoder The binary decoder
 * @returns The decoded QualifiedName
 * 
 * @see OPC 10000-6 Table 8 - QualifiedName
 */
export function decodeBinary(decoder: IDecoder): QualifiedName {
  const namespaceIndex = decoder.readUInt16();
  const name = decoder.readString();
  
  if (name === null) {
    throw new CodecError('QualifiedName name cannot be null');
  }
  
  return new QualifiedName(namespaceIndex, name);
}

/**
 * Register QualifiedName type with CodecFacade.
 */
export function registerQualifiedName(facade: CodecFacade): void {
  facade.registerType('QualifiedName', 'i=20', EncodingFormat.Binary, encodeBinary, decodeBinary);
}

/**
 * Helper function to create a QualifiedName.
 */
export function qualifiedName(namespaceIndex: number, name: string): QualifiedName {
  return new QualifiedName(namespaceIndex, name);
}
