/**
 * @fileoverview XmlElement primitive type encoder/decoder
 * @module codec/primitives/xmlelement
 */

import { IEncoder } from '../interfaces/encoder.js';
import { IDecoder } from '../interfaces/decoder.js';
import { CodecFacade } from '../facade.js';
import { EncodingFormat } from '../types.js';

/**
 * Encode an XmlElement value.
 * Binary: Int32 length prefix + UTF-8 encoded XML (-1 for null)
 * 
 * @param encoder The encoder instance
 * @param value The XML string (null encoded as length -1)
 * 
 * @see OPC 10000-6 Section 5.2.2.7 - XmlElement
 */
export function encodeBinary(encoder: IEncoder, value: string | null): void {
  encoder.writeXmlElement(value);
}

/**
 * Decode an XmlElement value.
 * Binary: Int32 length prefix + UTF-8 encoded XML (-1 for null)
 * 
 * @param decoder The decoder instance
 * @returns The XML string (null if length is -1)
 * 
 * @see OPC 10000-6 Section 5.2.2.7 - XmlElement
 */
export function decodeBinary(decoder: IDecoder): string | null {
  return decoder.readXmlElement();
}

/**
 * Register XmlElement type with CodecFacade.
 */
export function registerXmlElement(facade: CodecFacade): void {
  facade.registerType('XmlElement', 'i=16', EncodingFormat.Binary, encodeBinary, decodeBinary);
}
