/**
 * @fileoverview Binary encoder implementation for OPC UA Binary encoding
 * @module codec/binary/encoder
 */

import { IEncoder } from '../interfaces/encoder.js';
import { CodecError } from '../errors.js';

/**
 * OPC UA DateTime epoch: January 1, 1601 00:00:00 UTC
 * JavaScript Date epoch: January 1, 1970 00:00:00 UTC
 * Difference in milliseconds
 */
const EPOCH_DIFF_MS = 11644473600000n;
const TICKS_PER_MS = 10000n;

/**
 * BinaryEncoder implements OPC UA Binary encoding per OPC 10000-6 Section 5.2.
 * Uses little-endian byte order and IEEE 754 floating point representation.
 * 
 * @see OPC 10000-6 Part 6 Section 5.2 - UA Binary
 * @see FR-008 - Little-endian byte order for multi-byte numeric values
 * @see FR-009 - IEEE 754 binary representation for Float and Double
 * @see FR-010 - String values as length-prefixed UTF-8
 */
export class BinaryEncoder implements IEncoder {
  private buffer: Buffer;
  private position: number;

  constructor(initialSize: number = 1024) {
    this.buffer = Buffer.allocUnsafe(initialSize);
    this.position = 0;
  }

  /**
   * Ensure buffer has enough capacity, growing if necessary.
   */
  private ensureCapacity(additionalBytes: number): void {
    const required = this.position + additionalBytes;
    if (required > this.buffer.length) {
      const newSize = Math.max(required, this.buffer.length * 2);
      const newBuffer = Buffer.allocUnsafe(newSize);
      this.buffer.copy(newBuffer, 0, 0, this.position);
      this.buffer = newBuffer;
    }
  }

  writeBoolean(value: boolean): void {
    this.ensureCapacity(1);
    this.buffer.writeUInt8(value ? 1 : 0, this.position);
    this.position += 1;
  }

  writeByte(value: number): void {
    if (value < 0 || value > 255) {
      throw new CodecError(`Byte value ${value} out of range [0, 255]`);
    }
    this.ensureCapacity(1);
    this.buffer.writeUInt8(value, this.position);
    this.position += 1;
  }

  writeSByte(value: number): void {
    if (value < -128 || value > 127) {
      throw new CodecError(`SByte value ${value} out of range [-128, 127]`);
    }
    this.ensureCapacity(1);
    this.buffer.writeInt8(value, this.position);
    this.position += 1;
  }

  writeInt16(value: number): void {
    if (value < -32768 || value > 32767) {
      throw new CodecError(`Int16 value ${value} out of range [-32768, 32767]`);
    }
    this.ensureCapacity(2);
    this.buffer.writeInt16LE(value, this.position);
    this.position += 2;
  }

  writeUInt16(value: number): void {
    if (value < 0 || value > 65535) {
      throw new CodecError(`UInt16 value ${value} out of range [0, 65535]`);
    }
    this.ensureCapacity(2);
    this.buffer.writeUInt16LE(value, this.position);
    this.position += 2;
  }

  writeInt32(value: number): void {
    if (!Number.isInteger(value) || value < -2147483648 || value > 2147483647) {
      throw new CodecError(`Int32 value ${value} out of range [-2147483648, 2147483647]`);
    }
    this.ensureCapacity(4);
    this.buffer.writeInt32LE(value, this.position);
    this.position += 4;
  }

  writeUInt32(value: number): void {
    if (!Number.isInteger(value) || value < 0 || value > 4294967295) {
      throw new CodecError(`UInt32 value ${value} out of range [0, 4294967295]`);
    }
    this.ensureCapacity(4);
    this.buffer.writeUInt32LE(value, this.position);
    this.position += 4;
  }

  writeInt64(value: bigint): void {
    this.ensureCapacity(8);
    this.buffer.writeBigInt64LE(value, this.position);
    this.position += 8;
  }

  writeUInt64(value: bigint): void {
    this.ensureCapacity(8);
    this.buffer.writeBigUInt64LE(value, this.position);
    this.position += 8;
  }

  writeFloat(value: number): void {
    this.ensureCapacity(4);
    this.buffer.writeFloatLE(value, this.position);
    this.position += 4;
  }

  writeDouble(value: number): void {
    this.ensureCapacity(8);
    this.buffer.writeDoubleLE(value, this.position);
    this.position += 8;
  }

  writeString(value: string | null): void {
    if (value === null) {
      this.writeInt32(-1);
      return;
    }

    const utf8Bytes = Buffer.from(value, 'utf8');
    const length = utf8Bytes.length;

    // FR-019: Reject String length > 16,777,216 bytes
    if (length > 16777216) {
      throw new CodecError(
        `String length ${length} exceeds maximum allowed length of 16,777,216 bytes`,
        { format: 'Binary', suggestedAction: 'Reduce string length' }
      );
    }

    this.writeInt32(length);
    this.ensureCapacity(length);
    utf8Bytes.copy(this.buffer, this.position);
    this.position += length;
  }

  writeDateTime(value: Date): void {
    // Convert JavaScript Date to OPC UA DateTime (100-nanosecond ticks since 1601-01-01 UTC)
    const jsTimestamp = BigInt(value.getTime());
    const opcTimestamp = (jsTimestamp + EPOCH_DIFF_MS) * TICKS_PER_MS;
    this.writeInt64(opcTimestamp);
  }

  writeGuid(value: string): void {
    // Parse GUID string (e.g., "550e8400-e29b-41d4-a716-446655440000")
    const hex = value.replace(/-/g, '');
    if (hex.length !== 32) {
      throw new CodecError(`Invalid GUID format: ${value}`);
    }

    this.ensureCapacity(16);

    // Data1 (UInt32, bytes 0-3)
    const data1 = parseInt(hex.substr(0, 8), 16);
    this.buffer.writeUInt32LE(data1, this.position);

    // Data2 (UInt16, bytes 4-5)
    const data2 = parseInt(hex.substr(8, 4), 16);
    this.buffer.writeUInt16LE(data2, this.position + 4);

    // Data3 (UInt16, bytes 6-7)
    const data3 = parseInt(hex.substr(12, 4), 16);
    this.buffer.writeUInt16LE(data3, this.position + 6);

    // Data4 (Byte[8], bytes 8-15)
    for (let i = 0; i < 8; i++) {
      const byte = parseInt(hex.substr(16 + i * 2, 2), 16);
      this.buffer.writeUInt8(byte, this.position + 8 + i);
    }

    this.position += 16;
  }

  writeByteString(value: Buffer | Uint8Array | null): void {
    if (value === null) {
      this.writeInt32(-1);
      return;
    }

    const length = value.length;

    // FR-019: Reject ByteString length > 16,777,216 bytes
    if (length > 16777216) {
      throw new CodecError(
        `ByteString length ${length} exceeds maximum allowed length of 16,777,216 bytes`,
        { format: 'Binary', suggestedAction: 'Reduce ByteString length' }
      );
    }

    this.writeInt32(length);
    this.ensureCapacity(length);
    
    if (Buffer.isBuffer(value)) {
      value.copy(this.buffer, this.position);
    } else {
      this.buffer.set(value, this.position);
    }
    
    this.position += length;
  }

  writeXmlElement(value: string | null): void {
    // XmlElement is encoded as string in binary format
    this.writeString(value);
  }

  /**
   * Write an array with Int32 length prefix.
   * Per FR-011: -1 = null, 0 = empty, positive = element count
   * Per FR-019: Maximum array length is 2,147,483,647 elements
   * 
   * @param array The array to encode (null for null array)
   * @param encodeElement Function to encode each element
   * @throws {CodecError} if array length exceeds Int32 maximum
   * @see OPC 10000-6 Section 5.2.5 - Arrays
   */
  writeArray<T>(array: T[] | null, encodeElement: (encoder: this, value: T) => void): void {
    if (array === null) {
      this.writeInt32(-1);
      return;
    }

    const length = array.length;
    
    // FR-019: Validate array length
    if (length > 2147483647) {
      throw new CodecError(
        `Array length ${length} exceeds maximum allowed length of 2,147,483,647 elements`,
        { format: 'Binary', suggestedAction: 'Reduce array size' }
      );
    }

    this.writeInt32(length);
    
    for (const element of array) {
      encodeElement(this, element);
    }
  }

  getBuffer(): Buffer {
    return this.buffer.slice(0, this.position);
  }

  getPosition(): number {
    return this.position;
  }
}
