/**
 * @fileoverview LocalizedText type definition and encoder/decoder
 * @module codec/complex/localized-text
 * 
 * LocalizedText represents human-readable text with an optional locale.
 * 
 * @see OPC 10000-6 Section 5.2.2.14 - LocalizedText
 * @see OPC 10000-3 Section 7.19 - LocalizedText
 * @see FR-013 - Support LocalizedText with/without locale
 */

import { IEncoder } from '../interfaces/encoder.js';
import { IDecoder } from '../interfaces/decoder.js';
import { CodecFacade } from '../facade.js';
import { EncodingFormat } from '../types.js';
import { LocalizedText } from '../../types/src/index.js';

export { LocalizedText };

/**
 * LocalizedText encoding mask bits per OPC 10000-6 Table 9
 */
const enum LocalizedTextMask {
  LocaleFlag = 0x01,    // Bit 0: Locale is present
  TextFlag = 0x02       // Bit 1: Text is present
}

/**
 * Encode a LocalizedText in Binary format.
 * 
 * Encoding format:
 * - EncodingMask: Byte (bit 0 = Locale present, bit 1 = Text present)
 * - Locale: String (if flag set)
 * - Text: String (if flag set)
 * 
 * @param encoder The binary encoder
 * @param value The LocalizedText to encode
 * 
 * @see OPC 10000-6 Table 9 - LocalizedText encoding
 */
export function encodeBinary(encoder: IEncoder, value: LocalizedText): void {
  // Calculate encoding mask
  let encodingMask = 0;
  
  if (value.locale !== undefined && value.locale !== '') {
    encodingMask |= LocalizedTextMask.LocaleFlag;
  }
  
  if (value.text !== '') {
    encodingMask |= LocalizedTextMask.TextFlag;
  }
  
  // Write encoding mask
  encoder.writeByte(encodingMask);
  
  // Write Locale if present
  if (encodingMask & LocalizedTextMask.LocaleFlag) {
    encoder.writeString(value.locale!);
  }
  
  // Write Text if present
  if (encodingMask & LocalizedTextMask.TextFlag) {
    encoder.writeString(value.text);
  }
}

/**
 * Decode a LocalizedText from Binary format.
 * 
 * @param decoder The binary decoder
 * @returns The decoded LocalizedText
 * 
 * @see OPC 10000-6 Table 9 - LocalizedText encoding
 */
export function decodeBinary(decoder: IDecoder): LocalizedText {
  // Read encoding mask
  const encodingMask = decoder.readByte();
  
  // Read Locale if present
  let locale: string | undefined = undefined;
  if (encodingMask & LocalizedTextMask.LocaleFlag) {
    locale = decoder.readString() || undefined;
  }
  
  // Read Text if present
  let text = '';
  if (encodingMask & LocalizedTextMask.TextFlag) {
    text = decoder.readString() || '';
  }
  
  return new LocalizedText(locale, text);
}

/**
 * Register LocalizedText type with CodecFacade.
 */
export function registerLocalizedText(facade: CodecFacade): void {
  facade.registerType('LocalizedText', 'i=21', EncodingFormat.Binary, encodeBinary, decodeBinary);
}

/**
 * Helper function to create a LocalizedText.
 */
export function localizedText(locale: string | null | undefined, text: string | null): LocalizedText {
  return new LocalizedText(
    locale || undefined,
    text || ''
  );
}
