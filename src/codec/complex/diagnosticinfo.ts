/**
 * @fileoverview DiagnosticInfo type definition and encoder/decoder
 * @module codec/complex/diagnosticinfo
 * 
 * DiagnosticInfo represents detailed diagnostic information for errors.
 * This is a recursive structure with optional fields controlled by an encoding mask.
 * 
 * @see OPC 10000-6 Section 5.2.2.12 - DiagnosticInfo
 * @see OPC 10000-4 Section 7.12 - DiagnosticInfo
 * @see FR-020 - DiagnosticInfo encoding mask
 */

import { IEncoder } from '../interfaces/encoder.js';
import { IDecoder } from '../interfaces/decoder.js';
import { CodecFacade } from '../facade.js';
import { EncodingFormat } from '../types.js';
import { StatusCode } from './statuscode.js';
import { DiagnosticInfo } from '../../types/src/index.js';

export { DiagnosticInfo, StatusCode };

/**
 * DiagnosticInfo encoding mask bits per OPC 10000-6 Table 24
 */
export const enum DiagnosticInfoMask {
  SymbolicId = 0x01,          // Bit 0: SymbolicId is present
  NamespaceUri = 0x02,        // Bit 1: NamespaceUri is present
  LocalizedText = 0x04,       // Bit 2: LocalizedText is present
  Locale = 0x08,              // Bit 3: Locale is present
  AdditionalInfo = 0x10,      // Bit 4: AdditionalInfo is present
  InnerStatusCode = 0x20,     // Bit 5: InnerStatusCode is present
  InnerDiagnosticInfo = 0x40  // Bit 6: InnerDiagnosticInfo is present
}

/**
 * Encode a DiagnosticInfo in Binary format.
 * 
 * Encoding format per OPC 10000-6 Table 24:
 * - EncodingMask: Byte
 * - SymbolicId: Int32 (if bit 0 set)
 * - NamespaceUri: Int32 (if bit 1 set)
 * - LocalizedText: Int32 (if bit 2 set)
 * - Locale: Int32 (if bit 3 set)
 * - AdditionalInfo: String (if bit 4 set)
 * - InnerStatusCode: StatusCode (if bit 5 set)
 * - InnerDiagnosticInfo: DiagnosticInfo (if bit 6 set, recursive)
 * 
 * @param encoder The binary encoder
 * @param value The DiagnosticInfo to encode
 * 
 * @see OPC 10000-6 Table 24 - DiagnosticInfo encoding
 * @see FR-020 - DiagnosticInfo encoding mask
 */
export function encodeBinary(
  encoder: IEncoder,
  value: DiagnosticInfo
): void {
  // Calculate encoding mask
  let encodingMask = 0;
  
  if (value.symbolicId !== null) {
    encodingMask |= DiagnosticInfoMask.SymbolicId;
  }
  
  if (value.namespaceUri !== null) {
    encodingMask |= DiagnosticInfoMask.NamespaceUri;
  }
  
  if (value.localizedText !== null) {
    encodingMask |= DiagnosticInfoMask.LocalizedText;
  }
  
  if (value.locale !== null) {
    encodingMask |= DiagnosticInfoMask.Locale;
  }
  
  if (value.additionalInfo !== null) {
    encodingMask |= DiagnosticInfoMask.AdditionalInfo;
  }
  
  if (value.innerStatusCode !== null) {
    encodingMask |= DiagnosticInfoMask.InnerStatusCode;
  }
  
  if (value.innerDiagnosticInfo !== null) {
    encodingMask |= DiagnosticInfoMask.InnerDiagnosticInfo;
  }
  
  // Write encoding mask
  encoder.writeByte(encodingMask);
  
  // Write SymbolicId if present
  if (encodingMask & DiagnosticInfoMask.SymbolicId) {
    encoder.writeInt32(value.symbolicId!);
  }
  
  // Write NamespaceUri if present
  if (encodingMask & DiagnosticInfoMask.NamespaceUri) {
    encoder.writeInt32(value.namespaceUri!);
  }
  
  // Write LocalizedText if present
  if (encodingMask & DiagnosticInfoMask.LocalizedText) {
    encoder.writeInt32(value.localizedText!);
  }
  
  // Write Locale if present
  if (encodingMask & DiagnosticInfoMask.Locale) {
    encoder.writeInt32(value.locale!);
  }
  
  // Write AdditionalInfo if present
  if (encodingMask & DiagnosticInfoMask.AdditionalInfo) {
    encoder.writeString(value.additionalInfo!);
  }
  
  // Write InnerStatusCode if present
  if (encodingMask & DiagnosticInfoMask.InnerStatusCode) {
    encoder.writeUInt32(value.innerStatusCode!.getValue());
  }
  
  // Write InnerDiagnosticInfo if present (recursive)
  if (encodingMask & DiagnosticInfoMask.InnerDiagnosticInfo) {
    encodeBinary(encoder, value.innerDiagnosticInfo!);
  }
}

/**
 * Decode a DiagnosticInfo from Binary format.
 * 
 * @param decoder The binary decoder
 * @returns The decoded DiagnosticInfo
 * 
 * @see OPC 10000-6 Table 24 - DiagnosticInfo encoding
 */
export function decodeBinary(decoder: IDecoder): DiagnosticInfo {
  // Read encoding mask
  const encodingMask = decoder.readByte();
  
  // Read SymbolicId if present
  let symbolicId: number | null = null;
  if (encodingMask & DiagnosticInfoMask.SymbolicId) {
    symbolicId = decoder.readInt32();
  }
  
  // Read NamespaceUri if present
  let namespaceUri: number | null = null;
  if (encodingMask & DiagnosticInfoMask.NamespaceUri) {
    namespaceUri = decoder.readInt32();
  }
  
  // Read LocalizedText if present
  let localizedText: number | null = null;
  if (encodingMask & DiagnosticInfoMask.LocalizedText) {
    localizedText = decoder.readInt32();
  }
  
  // Read Locale if present
  let locale: number | null = null;
  if (encodingMask & DiagnosticInfoMask.Locale) {
    locale = decoder.readInt32();
  }
  
  // Read AdditionalInfo if present
  let additionalInfo: string | null = null;
  if (encodingMask & DiagnosticInfoMask.AdditionalInfo) {
    additionalInfo = decoder.readString();
  }
  
  // Read InnerStatusCode if present
  let innerStatusCode: StatusCode | null = null;
  if (encodingMask & DiagnosticInfoMask.InnerStatusCode) {
    const code = decoder.readUInt32();
    innerStatusCode = new StatusCode(code);
  }
  
  // Read InnerDiagnosticInfo if present (recursive)
  let innerDiagnosticInfo: DiagnosticInfo | null = null;
  if (encodingMask & DiagnosticInfoMask.InnerDiagnosticInfo) {
    innerDiagnosticInfo = decodeBinary(decoder);
  }
  
  return new DiagnosticInfo({
    symbolicId,
    namespaceUri,
    localizedText,
    locale,
    additionalInfo,
    innerStatusCode,
    innerDiagnosticInfo
  });
}

/**
 * Register DiagnosticInfo type with CodecFacade.
 */
export function registerDiagnosticInfo(facade: CodecFacade): void {
  facade.registerType('DiagnosticInfo', 'i=25', EncodingFormat.Binary, encodeBinary, decodeBinary);
}

/**
 * Helper function to create a DiagnosticInfo with all optional fields.
 */
export function diagnosticInfo(
  symbolicId: number | null = null,
  namespaceUri: number | null = null,
  localizedText: number | null = null,
  locale: number | null = null,
  additionalInfo: string | null = null,
  innerStatusCode: StatusCode | null = null,
  innerDiagnosticInfo: DiagnosticInfo | null = null
): DiagnosticInfo {
  return new DiagnosticInfo({
    symbolicId,
    namespaceUri,
    localizedText,
    locale,
    additionalInfo,
    innerStatusCode,
    innerDiagnosticInfo
  });
}

/**
 * Helper function to create a simple DiagnosticInfo with just additionalInfo.
 */
export function simpleDiagnosticInfo(additionalInfo: string): DiagnosticInfo {
  return diagnosticInfo(null, null, null, null, additionalInfo, null, null);
}

/**
 * Helper function to create a DiagnosticInfo with innerStatusCode.
 */
export function diagnosticInfoWithStatus(
  additionalInfo: string,
  innerStatusCode: StatusCode
): DiagnosticInfo {
  return diagnosticInfo(null, null, null, null, additionalInfo, innerStatusCode, null);
}

/**
 * Helper function to create a nested DiagnosticInfo.
 */
export function nestedDiagnosticInfo(
  additionalInfo: string,
  inner: DiagnosticInfo
): DiagnosticInfo {
  return diagnosticInfo(null, null, null, null, additionalInfo, null, inner);
}
