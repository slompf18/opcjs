/**
 * @fileoverview Decoder interface for OPC UA data decoding
 * @module codec/interfaces/decoder
 */

import { NodeId } from '../../types/nodeId.js';
import { ExpandedNodeId } from '../../types/expandedNodeId.js';
import { StatusCode } from '../../types/statusCode.js';
import { QualifiedName } from '../../types/qualifiedName.js';
import { LocalizedText } from '../../types/localizedText.js';
import { ExtensionObject } from '../../types/extensionObject.js';
import { DataValue } from '../../types/dataValue.js';
import { Variant } from '../../types/variant.js';
import { DiagnosticInfo } from '../../types/diagnosticInfo.js';
import { Decoder } from '../decoder.js';
import { UaString } from '../../types/primitives.js';

/**
 * IReader defines the low-level decoding operations for all OPC UA built-in types.
 * Concrete implementations (BinaryDecoder, XmlDecoder, JsonDecoder) 
 * implement this interface with format-specific logic.
 * 
 * @see OPC 10000-6 Part 6 Section 5 - Data Encoding
 * @see FR-022 - IReader interface with low-level primitive operations
 */
export interface IReader {
  /**
   * Decode a Boolean value.
   * Binary: 1 byte (0x00=false, 0x01=true, other values treated as true)
   * @returns The boolean value
   */
  readBoolean(): boolean;

  /**
   * Decode a Byte value (unsigned 8-bit integer).
   * Binary: 1 byte
   * @returns The byte value (0-255)
   */
  readByte(): number;

  /**
   * Decode an SByte value (signed 8-bit integer).
   * Binary: 1 byte (two's complement)
   * @returns The signed byte value (-128 to 127)
   */
  readSByte(): number;

  /**
   * Decode an Int16 value (signed 16-bit integer).
   * Binary: 2 bytes, little-endian
   * @returns The int16 value (-32768 to 32767)
   */
  readInt16(): number;

  /**
   * Decode a UInt16 value (unsigned 16-bit integer).
   * Binary: 2 bytes, little-endian
   * @returns The uint16 value (0 to 65535)
   */
  readUInt16(): number;

  /**
   * Decode an Int32 value (signed 32-bit integer).
   * Binary: 4 bytes, little-endian
   * @returns The int32 value
   */
  readInt32(): number;

  /**
   * Decode a UInt32 value (unsigned 32-bit integer).
   * Binary: 4 bytes, little-endian
   * @returns The uint32 value
   */
  readUInt32(): number;

  /**
   * Decode an Int64 value (signed 64-bit integer).
   * Binary: 8 bytes, little-endian
   * @returns The int64 value as BigInt
   */
  readInt64(): bigint;

  /**
   * Decode a UInt64 value (unsigned 64-bit integer).
   * Binary: 8 bytes, little-endian
   * @returns The uint64 value as BigInt
   */
  readUInt64(): bigint;

  /**
   * Decode a Float value (32-bit IEEE 754 floating point).
   * Binary: 4 bytes, little-endian
   * @returns The float value (including NaN, Infinity, -Infinity)
   */
  readFloat(): number;

  /**
   * Decode a Double value (64-bit IEEE 754 floating point).
   * Binary: 8 bytes, little-endian
   * @returns The double value (including NaN, Infinity, -Infinity)
   */
  readDouble(): number;

  /**
   * Decode a String value (UTF-8 encoded).
   * Binary: Int32 length prefix + UTF-8 bytes (-1 indicates null)
   * @returns The string value, or null if the length prefix is -1 (OPC UA null)
   */
  readString(): UaString;

  /**
   * Decode a DateTime value.
   * Binary: Int64 representing 100-nanosecond intervals since January 1, 1601 UTC
   * @returns The date value
   */
  readDateTime(): Date;

  /**
   * Decode a Guid value (UUID/RFC 4122).
   * Binary: 16 bytes (Data1 UInt32, Data2 UInt16, Data3 UInt16, Data4 Byte[8])
   * @returns The GUID as string (lowercase with hyphens)
   */
  readGuid(): string;

  /**
   * Decode a ByteString value.
   * Binary: Int32 length prefix + bytes (-1 indicates null)
   * @returns The byte array, or null if the length prefix is -1 (OPC UA null)
   */
  readByteString(): Uint8Array | null;

  /**
   * Decode an XmlElement value.
   * Binary: Int32 length prefix + UTF-8 encoded XML (-1 indicates null)
   * @returns The XML string (undefined if length is -1)
   */
  readXmlElement(): string | undefined;

  /**
   * Decode an array with Int32 length prefix.
   * Binary: Int32 length where -1=null, 0=empty, positive=count
   * @param decodeElement Function to decode each element
   * @returns The decoded array or undefined
   * @see OPC 10000-6 Section 5.2.5 - Arrays
   * @see FR-011 - Int32 length prefix for arrays
   * @see FR-019 - Validate array length during decode
   */
  readArray<T>(decodeElement: (decoder: this) => T): T[] | undefined;

  // ── Complex types ──────────────────────────────────────────────────────────

  /**
   * Decode a NodeId value.
   * @see OPC 10000-6 Section 5.2.2.9 - NodeId
   */
  readNodeId(): NodeId;

  /**
   * Decode an ExpandedNodeId value.
   * @see OPC 10000-6 Section 5.2.2.10 - ExpandedNodeId
   */
  readExpandedNodeId(): ExpandedNodeId;

  /**
   * Decode a StatusCode value.
   * Binary: UInt32
   * @see OPC 10000-6 Section 5.2.2.11 - StatusCode
   */
  readStatusCode(): StatusCode;

  /**
   * Decode a QualifiedName value.
   * @see OPC 10000-6 Section 5.2.2.13 - QualifiedName
   */
  readQualifiedName(): QualifiedName;

  /**
   * Decode a LocalizedText value.
   * @see OPC 10000-6 Section 5.2.2.14 - LocalizedText
   */
  readLocalizedText(): LocalizedText;

  /**
   * Decode an ExtensionObject value.
   * @see OPC 10000-6 Section 5.2.2.15 - ExtensionObject
   */
  readExtensionObject(decoder: Decoder): ExtensionObject;

  /**
   * Decode a DataValue value.
   * @see OPC 10000-6 Section 5.2.2.17 - DataValue
   */
  readDataValue(decoder: Decoder): DataValue;

  /**
   * Decode a Variant value.
   * @see OPC 10000-6 Section 5.2.2.16 - Variant
   */
  readVariant(decoder: Decoder): Variant;

  /**
   * Decode a DiagnosticInfo value.
   * @see OPC 10000-6 Section 5.2.2.12 - DiagnosticInfo
   */
  readDiagnosticInfo(): DiagnosticInfo;
}
