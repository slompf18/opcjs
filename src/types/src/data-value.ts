/**
 * OPC UA DataValue Type (i=23)
 * 
 * A DataValue contains a value along with associated quality information
 * (StatusCode) and timestamp information (source and server timestamps).
 * 
 * @see OPC UA Part 4, Section 7.11
 */

import type { Variant } from './variant.js';
import { StatusCode } from './status-code.js';

/**
 * Represents an OPC UA DataValue.
 * 
 * A DataValue wraps a Variant value and adds quality and timestamp metadata.
 * This is the primary container for values read from or written to OPC UA servers.
 * 
 * @example
 * ```typescript
 * import { DataValue, Variant, VariantType } from '@opcua/types';
 * 
 * // Create a DataValue with all fields
 * const value = new Variant(VariantType.Double, 25.5);
 * const dataValue = new DataValue(
 *   value,
 *   0, // Good status code
 *   new Date(), // Source timestamp
 *   new Date()  // Server timestamp
 * );
 * 
 * // Check if value is good
 * if (dataValue.isGood()) {
 *   console.log('Value:', dataValue.value?.value);
 * }
 * ```
 */
export class DataValue {
  /**
   * The value wrapped in a Variant.
   * Null if no value is present.
   */
  public readonly value: Variant | null;

  /**
   * The quality of the value.
   * StatusCode.Good (0x00000000) indicates Good quality.
   * Null if no status code is present.
   */
  public readonly statusCode: StatusCode | null;

  /**
   * The timestamp from the data source.
   * Null if no source timestamp is present.
   */
  public readonly sourceTimestamp: Date | null;

  /**
   * The timestamp from the server.
   * Null if no server timestamp is present.
   */
  public readonly serverTimestamp: Date | null;

  /**
   * Additional precision for the source timestamp (picoseconds).
   * Range: 0-9999 (added to the millisecond precision of sourceTimestamp).
   * Null if not present.
   */
  public readonly sourcePicoseconds: number | null;

  /**
   * Additional precision for the server timestamp (picoseconds).
   * Range: 0-9999 (added to the millisecond precision of serverTimestamp).
   * Null if not present.
   */
  public readonly serverPicoseconds: number | null;

  /**
   * Creates a new DataValue.
   * 
   * @param value - The variant value (null if not present)
   * @param statusCode - The status code (null if not present)
   * @param sourceTimestamp - The source timestamp (null if not present)
   * @param serverTimestamp - The server timestamp (null if not present)
   * @param sourcePicoseconds - Additional source timestamp precision (null if not present)
   * @param serverPicoseconds - Additional server timestamp precision (null if not present)
   */
  constructor(
    value: Variant | null = null,
    statusCode: StatusCode | null = null,
    sourceTimestamp: Date | null = null,
    serverTimestamp: Date | null = null,
    sourcePicoseconds: number | null = null,
    serverPicoseconds: number | null = null
  ) {
    this.value = value;
    this.statusCode = statusCode;
    this.sourceTimestamp = sourceTimestamp;
    this.serverTimestamp = serverTimestamp;
    this.sourcePicoseconds = sourcePicoseconds;
    this.serverPicoseconds = serverPicoseconds;
  }

  /**
   * Creates an empty DataValue with no fields set.
   * 
   * @returns A new DataValue with all fields null
   */
  public static createEmpty(): DataValue {
    return new DataValue(null, null, null, null, null, null);
  }

  /**
   * Creates a DataValue with just a value.
   * 
   * @param value - The variant value
   * @returns A new DataValue with only the value set
   */
  public static fromValue(value: Variant): DataValue {
    return new DataValue(value, null, null, null, null, null);
  }

  /**
   * Checks if the status code indicates good quality.
   * 
   * @returns True if statusCode is Good or null (unknown)
   */
  public isGood(): boolean {
    return this.statusCode === null || this.statusCode.isGood();
  }

  /**
   * Checks if the status code indicates bad quality.
   * 
   * @returns True if statusCode indicates an error
   */
  public isBad(): boolean {
    if (this.statusCode === null) {
      return false;
    }
    return this.statusCode.isBad();
  }

  /**
   * Checks if the status code indicates uncertain quality.
   * 
   * @returns True if statusCode indicates uncertain quality
   */
  public isUncertain(): boolean {
    if (this.statusCode === null) {
      return false;
    }
    return this.statusCode.isUncertain();
  }

  /**
   * Gets the severity of the status code.
   * 
   * @returns 'Good', 'Uncertain', 'Bad', or 'Unknown'
   */
  public getSeverity(): 'Good' | 'Uncertain' | 'Bad' | 'Unknown' {
    if (this.statusCode === null) {
      return 'Unknown';
    }
    if (this.statusCode.isBad()) {
      return 'Bad';
    }
    if (this.statusCode.isUncertain()) {
      return 'Uncertain';
    }
    return 'Good';
  }

  /**
   * Checks if this DataValue has a value.
   * 
   * @returns True if value is not null
   */
  public hasValue(): boolean {
    return this.value !== null;
  }

  /**
   * Checks if this DataValue has a source timestamp.
   * 
   * @returns True if sourceTimestamp is not null
   */
  public hasSourceTimestamp(): boolean {
    return this.sourceTimestamp !== null;
  }

  /**
   * Checks if this DataValue has a server timestamp.
   * 
   * @returns True if serverTimestamp is not null
   */
  public hasServerTimestamp(): boolean {
    return this.serverTimestamp !== null;
  }

  /**
   * Converts the DataValue to a string representation.
   * 
   * @returns A string representation
   */
  public toString(): string {
    const parts: string[] = [];

    if (this.value !== null) {
      parts.push(`value: ${this.value.toString()}`);
    }

    if (this.statusCode !== null) {
      parts.push(`statusCode: ${this.statusCode.toString()}`);
    }

    if (this.sourceTimestamp !== null) {
      parts.push(`sourceTimestamp: ${this.sourceTimestamp.toISOString()}`);
    }

    if (this.serverTimestamp !== null) {
      parts.push(`serverTimestamp: ${this.serverTimestamp.toISOString()}`);
    }

    if (parts.length === 0) {
      return 'DataValue(empty)';
    }

    return `DataValue(${parts.join(', ')})`;
  }

  /**
   * Checks equality with another DataValue.
   * 
   * @param other - The DataValue to compare with
   * @returns True if equal
   */
  public equals(other: DataValue): boolean {
    // Compare values
    if (this.value !== null && other.value !== null) {
      if (!this.value.equals(other.value)) {
        return false;
      }
    } else if (this.value !== other.value) {
      return false;
    }

    // Compare status codes
    if (this.statusCode !== other.statusCode) {
      return false;
    }

    // Compare timestamps
    if (this.sourceTimestamp?.getTime() !== other.sourceTimestamp?.getTime()) {
      return false;
    }

    if (this.serverTimestamp?.getTime() !== other.serverTimestamp?.getTime()) {
      return false;
    }

    if (this.sourcePicoseconds !== other.sourcePicoseconds) {
      return false;
    }

    if (this.serverPicoseconds !== other.serverPicoseconds) {
      return false;
    }

    return true;
  }
}
