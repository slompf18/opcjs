/**
 * @fileoverview Binary decoder implementation for OPC UA Binary decoding
 * @module codec/binary/decoder
 */

import { IDecoder } from '../interfaces/decoder.js';
import { CodecError } from '../errors.js';

/**
 * OPC UA DateTime epoch: January 1, 1601 00:00:00 UTC
 * JavaScript Date epoch: January 1, 1970 00:00:00 UTC
 * Difference in milliseconds
 */
const EPOCH_DIFF_MS = 11644473600000n;
const TICKS_PER_MS = 10000n;

/**
 * BinaryDecoder implements OPC UA Binary decoding per OPC 10000-6 Section 5.2.
 * Uses little-endian byte order and IEEE 754 floating point representation.
 * Validates buffer boundaries per FR-018 and FR-019.
 * 
 * @see OPC 10000-6 Part 6 Section 5.2 - UA Binary
 * @see FR-018 - Validate buffer boundaries during decode operations
 * @see FR-019 - Validate array length values during decode
 */
export class BinaryDecoder implements IDecoder {
  private buffer: Buffer;
  private position: number;

  constructor(buffer: Buffer) {
    this.buffer = buffer;
    this.position = 0;
  }

  /**
   * Validate that we can read the specified number of bytes.
   * @throws {CodecError} if insufficient data available
   */
  private checkBounds(bytesNeeded: number): void {
    if (this.position + bytesNeeded > this.buffer.length) {
      throw new CodecError(
        `Buffer underflow: need ${bytesNeeded} bytes at position ${this.position}, but only ${this.buffer.length - this.position} bytes available`,
        { format: 'Binary', suggestedAction: 'Ensure buffer contains complete encoded data' }
      );
    }
  }

  readBoolean(): boolean {
    this.checkBounds(1);
    const value = this.buffer.readUInt8(this.position);
    this.position += 1;
    return value !== 0;
  }

  readByte(): number {
    this.checkBounds(1);
    const value = this.buffer.readUInt8(this.position);
    this.position += 1;
    return value;
  }

  readSByte(): number {
    this.checkBounds(1);
    const value = this.buffer.readInt8(this.position);
    this.position += 1;
    return value;
  }

  readInt16(): number {
    this.checkBounds(2);
    const value = this.buffer.readInt16LE(this.position);
    this.position += 2;
    return value;
  }

  readUInt16(): number {
    this.checkBounds(2);
    const value = this.buffer.readUInt16LE(this.position);
    this.position += 2;
    return value;
  }

  readInt32(): number {
    this.checkBounds(4);
    const value = this.buffer.readInt32LE(this.position);
    this.position += 4;
    return value;
  }

  readUInt32(): number {
    this.checkBounds(4);
    const value = this.buffer.readUInt32LE(this.position);
    this.position += 4;
    return value;
  }

  readInt64(): bigint {
    this.checkBounds(8);
    const value = this.buffer.readBigInt64LE(this.position);
    this.position += 8;
    return value;
  }

  readUInt64(): bigint {
    this.checkBounds(8);
    const value = this.buffer.readBigUInt64LE(this.position);
    this.position += 8;
    return value;
  }

  readFloat(): number {
    this.checkBounds(4);
    const value = this.buffer.readFloatLE(this.position);
    this.position += 4;
    return value;
  }

  readDouble(): number {
    this.checkBounds(8);
    const value = this.buffer.readDoubleLE(this.position);
    this.position += 8;
    return value;
  }

  readString(): string | null {
    const length = this.readInt32();
    
    if (length === -1) {
      return null;
    }

    // FR-019: Validate string length before allocation
    if (length < 0) {
      throw new CodecError(
        `Invalid string length: ${length} (must be -1 for null or >= 0)`,
        { format: 'Binary', suggestedAction: 'Check encoded data for corruption' }
      );
    }

    if (length > 16777216) {
      throw new CodecError(
        `String length ${length} exceeds maximum allowed length of 16,777,216 bytes`,
        { format: 'Binary', suggestedAction: 'Reject malformed or malicious input' }
      );
    }

    if (length === 0) {
      return '';
    }

    this.checkBounds(length);
    const value = this.buffer.toString('utf8', this.position, this.position + length);
    this.position += length;
    return value;
  }

  readDateTime(): Date {
    // Read OPC UA DateTime (100-nanosecond ticks since 1601-01-01 UTC)
    const opcTimestamp = this.readInt64();
    const jsTimestamp = Number(opcTimestamp / TICKS_PER_MS - EPOCH_DIFF_MS);
    return new Date(jsTimestamp);
  }

  readGuid(): string {
    this.checkBounds(16);

    // Data1 (UInt32, bytes 0-3)
    const data1 = this.buffer.readUInt32LE(this.position);
    
    // Data2 (UInt16, bytes 4-5)
    const data2 = this.buffer.readUInt16LE(this.position + 4);
    
    // Data3 (UInt16, bytes 6-7)
    const data3 = this.buffer.readUInt16LE(this.position + 6);
    
    // Data4 (Byte[8], bytes 8-15)
    const data4 = [];
    for (let i = 0; i < 8; i++) {
      data4.push(this.buffer.readUInt8(this.position + 8 + i));
    }

    this.position += 16;

    // Format as standard GUID string
    const hex = (value: number, width: number) => 
      value.toString(16).padStart(width, '0');
    
    return `${hex(data1, 8)}-${hex(data2, 4)}-${hex(data3, 4)}-${hex(data4[0], 2)}${hex(data4[1], 2)}-${data4.slice(2).map(b => hex(b, 2)).join('')}`;
  }

  readByteString(): Buffer | null {
    const length = this.readInt32();
    
    if (length === -1) {
      return null;
    }

    // FR-019: Validate ByteString length before allocation
    if (length < 0) {
      throw new CodecError(
        `Invalid ByteString length: ${length} (must be -1 for null or >= 0)`,
        { format: 'Binary', suggestedAction: 'Check encoded data for corruption' }
      );
    }

    if (length > 16777216) {
      throw new CodecError(
        `ByteString length ${length} exceeds maximum allowed length of 16,777,216 bytes`,
        { format: 'Binary', suggestedAction: 'Reject malformed or malicious input' }
      );
    }

    if (length === 0) {
      return Buffer.allocUnsafe(0);
    }

    this.checkBounds(length);
    const value = this.buffer.slice(this.position, this.position + length);
    this.position += length;
    return value;
  }

  readXmlElement(): string | null {
    // XmlElement is encoded as string in binary format
    return this.readString();
  }

  /**
   * Read an array with Int32 length prefix.
   * Per FR-011: -1 = null, 0 = empty, positive = element count
   * Per FR-019: Validate array length is within reasonable bounds
   * 
   * @param decodeElement Function to decode each element
   * @returns The decoded array or null
   * @throws {CodecError} if array length is invalid
   * @see OPC 10000-6 Section 5.2.5 - Arrays
   */
  readArray<T>(decodeElement: (decoder: this) => T): T[] | null {
    const length = this.readInt32();

    // FR-011: -1 indicates null array
    if (length === -1) {
      return null;
    }

    // FR-019: Validate array length
    if (length < 0) {
      throw new CodecError(
        `Invalid array length ${length}: must be -1 (null) or non-negative`,
        { format: 'Binary', suggestedAction: 'Check encoded data integrity' }
      );
    }

    // FR-019: Reject unreasonably large arrays (would exceed memory)
    if (length > 100000000) {
      throw new CodecError(
        `Array length ${length} exceeds maximum safe length of 100,000,000 elements`,
        { format: 'Binary', suggestedAction: 'Check encoded data or increase limits' }
      );
    }

    const array: T[] = [];
    for (let i = 0; i < length; i++) {
      array.push(decodeElement(this));
    }

    return array;
  }

  getPosition(): number {
    return this.position;
  }

  getLength(): number {
    return this.buffer.length;
  }
  
  getBuffer(): Buffer {
    return this.buffer;
  }
}
