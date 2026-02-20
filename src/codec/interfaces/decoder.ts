/**
 * @fileoverview Decoder interface for OPC UA data decoding
 * @module codec/interfaces/decoder
 */

/**
 * IDecoder defines the low-level primitive decoding operations.
 * Concrete implementations (BinaryDecoder, XmlDecoder, JsonDecoder) 
 * implement this interface with format-specific logic.
 * 
 * @see OPC 10000-6 Part 6 Section 5 - Data Encoding
 * @see FR-022 - IDecoder interface with low-level primitive operations
 */
export interface IDecoder {
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
   * @returns The string value (null if length is -1)
   */
  readString(): string | null;

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
   * @returns The byte array (null if length is -1)
   */
  readByteString(): Buffer | null;

  /**
   * Decode an XmlElement value.
   * Binary: Int32 length prefix + UTF-8 encoded XML (-1 indicates null)
   * @returns The XML string (null if length is -1)
   */
  readXmlElement(): string | null;

  /**
   * Decode an array with Int32 length prefix.
   * Binary: Int32 length where -1=null, 0=empty, positive=count
   * @param decodeElement Function to decode each element
   * @returns The decoded array or null
   * @see OPC 10000-6 Section 5.2.5 - Arrays
   * @see FR-011 - Int32 length prefix for arrays
   * @see FR-019 - Validate array length during decode
   */
  readArray<T>(decodeElement: (decoder: this) => T): T[] | null;

  /**
   * Get the current read position in the buffer.
   * @returns The number of bytes read
   */
  getPosition(): number;

  /**
   * Get the total buffer length.
   * @returns The buffer length in bytes
   */
  getLength(): number;
  
  /**
   * Get the underlying buffer being decoded.
   * @returns The buffer
   */
  getBuffer(): Buffer;
}
