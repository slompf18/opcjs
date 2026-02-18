/**
 * OPC UA ByteString Type
 * 
 * ByteString represents a sequence of bytes.
 * 
 * @module bytestring
 */

/**
 * OPC UA ByteString class
 * 
 * A ByteString is a sequence of bytes wrapped in a class with utility methods.
 * 
 * @example
 * ```typescript
 * import { ByteString } from '@opcua/types';
 * 
 * const bytes = new ByteString(new Uint8Array([0x01, 0x02, 0x03]));
 * console.log(bytes.length); // 3
 * 
 * // Convert from base64
 * const fromBase64 = ByteString.fromBase64("AQIDBA==");
 * 
 * // Convert to base64
 * const base64 = bytes.toBase64();
 * ```
 */
export class ByteString {
  /**
   * The internal byte data
   */
  private readonly data: Uint8Array;

  /**
   * Create a new ByteString
   * 
   * @param data - The byte data as Uint8Array
   */
  constructor(data: Uint8Array = new Uint8Array(0)) {
    this.data = data;
  }

  /**
   * Get the underlying Uint8Array
   * 
   * @returns The byte data
   */
  public toUint8Array(): Uint8Array {
    return this.data;
  }

  /**
   * Get the length of the ByteString
   * 
   * @returns The number of bytes
   */
  public get length(): number {
    return this.data.length;
  }

  /**
   * Get a byte at a specific index
   * 
   * @param index - The index
   * @returns The byte value
   */
  public at(index: number): number | undefined {
    return this.data[index];
  }

  /**
   * Create a ByteString from a base64 encoded string
   * 
   * @param base64 - Base64 encoded string
   * @returns ByteString
   * 
   * @example
   * ```typescript
   * const bytes = ByteString.fromBase64("AQIDBA==");
   * ```
   */
  public static fromBase64(base64: string): ByteString {
    // Handle both Node.js and browser environments
    if (typeof Buffer !== 'undefined') {
      return new ByteString(new Uint8Array(Buffer.from(base64, 'base64')));
    } else {
      // Browser environment
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return new ByteString(bytes);
    }
  }

  /**
   * Convert this ByteString to a base64 encoded string
   * 
   * @returns Base64 encoded string
   * 
   * @example
   * ```typescript
   * const bytes = new ByteString(new Uint8Array([1, 2, 3, 4]));
   * const base64 = bytes.toBase64(); // "AQIDBA=="
   * ```
   */
  public toBase64(): string {
    // Handle both Node.js and browser environments
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(this.data).toString('base64');
    } else {
      // Browser environment
      let binary = '';
      for (let i = 0; i < this.data.length; i++) {
        binary += String.fromCharCode(this.data[i]);
      }
      return btoa(binary);
    }
  }

  /**
   * Create a ByteString from a hex encoded string
   * 
   * @param hex - Hex encoded string (e.g., "01020304")
   * @returns ByteString
   * 
   * @example
   * ```typescript
   * const bytes = ByteString.fromHex("01020304");
   * ```
   */
  public static fromHex(hex: string): ByteString {
    const cleanHex = hex.replace(/[^0-9a-fA-F]/g, '');
    if (cleanHex.length % 2 !== 0) {
      throw new Error('Hex string must have an even number of characters');
    }
    
    const bytes = new Uint8Array(cleanHex.length / 2);
    for (let i = 0; i < cleanHex.length; i += 2) {
      bytes[i / 2] = parseInt(cleanHex.substring(i, i + 2), 16);
    }
    return new ByteString(bytes);
  }

  /**
   * Convert this ByteString to a hex encoded string
   * 
   * @returns Hex encoded string
   * 
   * @example
   * ```typescript
   * const bytes = new ByteString(new Uint8Array([1, 2, 3, 4]));
   * const hex = bytes.toHex(); // "01020304"
   * ```
   */
  public toHex(): string {
    return Array.from(this.data)
      .map((b: number) => b.toString(16).padStart(2, '0'))
      .join('');
  }

  /**
   * Check if this ByteString equals another
   * 
   * @param other - The other ByteString
   * @returns true if both ByteStrings contain the same bytes
   */
  public equals(other: ByteString): boolean {
    if (this.data.length !== other.data.length) {
      return false;
    }
    return this.data.every((value: number, index: number) => value === other.data[index]);
  }

  /**
   * Convert to string representation
   * 
   * @returns String representation
   */
  public toString(): string {
    return `ByteString(${this.data.length} bytes)`;
  }

  /**
   * Create an empty ByteString
   * 
   * @returns Empty ByteString
   */
  public static empty(): ByteString {
    return new ByteString(new Uint8Array(0));
  }
}
