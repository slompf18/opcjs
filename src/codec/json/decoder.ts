/**
 * JSON Decoder for OPC UA Builtin Types
 * 
 * Decodes OPC UA builtin types from JSON format according to OPC 10000-6 Section 5.4.
 * Parses RFC 8259 compliant JSON input per FR-030.
 * Validates JSON structure and types per FR-035.
 * 
 * Note: This is a standalone JSON decoder, not implementing IDecoder interface
 * which is designed for Binary encoding. JSON decoding requires different methods.
 * 
 * @module codec/json/decoder
 */

import { CodecError } from '../errors';

/**
 * JSON Decoder for OPC UA types.
 * Uses JSON.parse to decode JSON documents.
 * 
 * Features:
 * - Native JSON type parsing
 * - Type validation and conversion
 * - Special value handling (NaN, Infinity)
 * - Null value support per FR-033
 * - Error reporting per FR-035
 */
export class JsonDecoder {
  private json: any;
  private current: any;

  /**
   * Create a JSON decoder.
   * @param jsonString - JSON string to decode
   * @throws CodecError if JSON is malformed
   */
  constructor(jsonString: string) {
    try {
      this.json = JSON.parse(jsonString);
      this.current = this.json;
    } catch (error) {
      throw new CodecError(
        `Malformed JSON: ${error instanceof Error ? error.message : String(error)}`,
        { format: 'JSON', typeName: 'parse' }
      );
    }
  }

  /**
   * Get the current JSON value.
   * @returns Current value
   */
  getValue(): any {
    return this.current;
  }

  /**
   * Navigate to a nested property.
   * @param name - Property name
   */
  navigate(name: string): void {
    if (typeof this.current !== 'object' || this.current === null) {
      throw new CodecError(`Cannot navigate to property '${name}' - current value is not an object`, { format: 'JSON', typeName: name });
    }
    if (!(name in this.current)) {
      throw new CodecError(`Property '${name}' not found in JSON object`, { format: 'JSON', typeName: name });
    }
    this.current = this.current[name];
  }

  /**
   * Decode a Boolean value.
   * JSON: boolean type (true/false)
   * 
   * @returns Decoded boolean
   * @throws CodecError if value is not boolean
   * @see OPC 10000-6 Section 5.4.2.1 - Boolean
   */
  decodeBoolean(): boolean {
    if (typeof this.current !== 'boolean') {
      throw new CodecError(`Expected boolean, got ${typeof this.current}`, { format: 'JSON', typeName: 'Boolean' });
    }
    return this.current;
  }

  /**
   * Decode a Byte value (UInt8).
   * JSON: number type (0-255)
   * 
   * @returns Decoded byte
   * @throws CodecError if value is not in range
   * @see OPC 10000-6 Section 5.4.2.2 - Byte
   */
  decodeByte(): number {
    if (typeof this.current !== 'number') {
      throw new CodecError(`Expected number, got ${typeof this.current}`, { format: 'JSON', typeName: 'Byte' });
    }
    if (this.current < 0 || this.current > 255 || !Number.isInteger(this.current)) {
      throw new CodecError(`Byte value ${this.current} out of range [0, 255]`, { format: 'JSON', typeName: 'Byte' });
    }
    return this.current;
  }

  /**
   * Decode an SByte value (Int8).
   * JSON: number type (-128 to 127)
   * 
   * @returns Decoded sbyte
   * @throws CodecError if value is not in range
   * @see OPC 10000-6 Section 5.4.2.2 - SByte
   */
  decodeSByte(): number {
    if (typeof this.current !== 'number') {
      throw new CodecError(`Expected number, got ${typeof this.current}`, { format: 'JSON', typeName: 'SByte' });
    }
    if (this.current < -128 || this.current > 127 || !Number.isInteger(this.current)) {
      throw new CodecError(`SByte value ${this.current} out of range [-128, 127]`, { format: 'JSON', typeName: 'SByte' });
    }
    return this.current;
  }

  /**
   * Decode an Int16 value.
   * JSON: number type (-32768 to 32767)
   * 
   * @returns Decoded int16
   * @throws CodecError if value is not in range
   * @see OPC 10000-6 Section 5.4.2.2 - Int16
   */
  decodeInt16(): number {
    if (typeof this.current !== 'number') {
      throw new CodecError(`Expected number, got ${typeof this.current}`, { format: 'JSON', typeName: 'Int16' });
    }
    if (this.current < -32768 || this.current > 32767 || !Number.isInteger(this.current)) {
      throw new CodecError(`Int16 value ${this.current} out of range [-32768, 32767]`, { format: 'JSON', typeName: 'Int16' });
    }
    return this.current;
  }

  /**
   * Decode a UInt16 value.
   * JSON: number type (0 to 65535)
   * 
   * @returns Decoded uint16
   * @throws CodecError if value is not in range
   * @see OPC 10000-6 Section 5.4.2.2 - UInt16
   */
  decodeUInt16(): number {
    if (typeof this.current !== 'number') {
      throw new CodecError(`Expected number, got ${typeof this.current}`, { format: 'JSON', typeName: 'UInt16' });
    }
    if (this.current < 0 || this.current > 65535 || !Number.isInteger(this.current)) {
      throw new CodecError(`UInt16 value ${this.current} out of range [0, 65535]`, { format: 'JSON', typeName: 'UInt16' });
    }
    return this.current;
  }

  /**
   * Decode an Int32 value.
   * JSON: number type (-2^31 to 2^31-1)
   * 
   * @returns Decoded int32
   * @throws CodecError if value is not in range
   * @see OPC 10000-6 Section 5.4.2.2 - Int32
   */
  decodeInt32(): number {
    if (typeof this.current !== 'number') {
      throw new CodecError(`Expected number, got ${typeof this.current}`, { format: 'JSON', typeName: 'Int32' });
    }
    if (this.current < -2147483648 || this.current > 2147483647 || !Number.isInteger(this.current)) {
      throw new CodecError(`Int32 value ${this.current} out of range [-2147483648, 2147483647]`, { format: 'JSON', typeName: 'Int32' });
    }
    return this.current;
  }

  /**
   * Decode a UInt32 value.
   * JSON: number type (0 to 2^32-1)
   * 
   * @returns Decoded uint32
   * @throws CodecError if value is not in range
   * @see OPC 10000-6 Section 5.4.2.2 - UInt32
   */
  decodeUInt32(): number {
    if (typeof this.current !== 'number') {
      throw new CodecError(`Expected number, got ${typeof this.current}`, { format: 'JSON', typeName: 'UInt32' });
    }
    if (this.current < 0 || this.current > 4294967295 || !Number.isInteger(this.current)) {
      throw new CodecError(`UInt32 value ${this.current} out of range [0, 4294967295]`, { format: 'JSON', typeName: 'UInt32' });
    }
    return this.current;
  }

  /**
   * Decode an Int64 value.
   * JSON: string type (JavaScript number loses precision beyond 2^53)
   * 
   * @returns Decoded int64 as bigint
   * @throws CodecError if value is not a valid int64 string
   * @see OPC 10000-6 Section 5.4.2.2 - Int64
   * @see FR-031 - Int64/UInt64 as strings in JSON
   */
  decodeInt64(): bigint {
    if (typeof this.current !== 'string') {
      throw new CodecError(`Expected string for Int64, got ${typeof this.current}`, { format: 'JSON', typeName: 'Int64' });
    }
    try {
      return BigInt(this.current);
    } catch (error) {
      throw new CodecError(`Invalid Int64 string: ${this.current}`, { format: 'JSON', typeName: 'Int64' });
    }
  }

  /**
   * Decode a UInt64 value.
   * JSON: string type (JavaScript number loses precision beyond 2^53)
   * 
   * @returns Decoded uint64 as bigint
   * @throws CodecError if value is not a valid uint64 string
   * @see OPC 10000-6 Section 5.4.2.2 - UInt64
   * @see FR-031 - Int64/UInt64 as strings in JSON
   */
  decodeUInt64(): bigint {
    if (typeof this.current !== 'string') {
      throw new CodecError(`Expected string for UInt64, got ${typeof this.current}`, { format: 'JSON', typeName: 'UInt64' });
    }
    try {
      const value = BigInt(this.current);
      if (value < 0n) {
        throw new CodecError(`UInt64 value ${this.current} cannot be negative`, { format: 'JSON', typeName: 'UInt64' });
      }
      return value;
    } catch (error) {
      // Check if it's our negative value error
      if (error instanceof CodecError) {
        throw error;
      }
      // Otherwise it's an invalid BigInt string
      throw new CodecError(`Invalid UInt64 string: ${this.current}`, { format: 'JSON', typeName: 'UInt64' });
    }
  }

  /**
   * Decode a Float value (32-bit IEEE 754).
   * JSON: number type, or string for special values.
   * Special values: "NaN" → NaN, "Infinity" → Infinity, "-Infinity" → -Infinity
   * 
   * @returns Decoded float
   * @throws CodecError if value is not number or special string
   * @see OPC 10000-6 Section 5.4.2.2 - Float
   * @see FR-031 - Special float values as strings
   */
  decodeFloat(): number {
    if (typeof this.current === 'number') {
      return this.current;
    }
    if (typeof this.current === 'string') {
      if (this.current === 'NaN') return NaN;
      if (this.current === 'Infinity') return Infinity;
      if (this.current === '-Infinity') return -Infinity;
      throw new CodecError(`Invalid Float string: ${this.current}`, { format: 'JSON', typeName: 'Float' });
    }
    throw new CodecError(`Expected number or special float string, got ${typeof this.current}`, { format: 'JSON', typeName: 'Float' });
  }

  /**
   * Decode a Double value (64-bit IEEE 754).
   * JSON: number type, or string for special values.
   * Special values: "NaN" → NaN, "Infinity" → Infinity, "-Infinity" → -Infinity
   * 
   * @returns Decoded double
   * @throws CodecError if value is not number or special string
   * @see OPC 10000-6 Section 5.4.2.2 - Double
   * @see FR-031 - Special float values as strings
   */
  decodeDouble(): number {
    if (typeof this.current === 'number') {
      return this.current;
    }
    if (typeof this.current === 'string') {
      if (this.current === 'NaN') return NaN;
      if (this.current === 'Infinity') return Infinity;
      if (this.current === '-Infinity') return -Infinity;
      throw new CodecError(`Invalid Double string: ${this.current}`, { format: 'JSON', typeName: 'Double' });
    }
    throw new CodecError(`Expected number or special float string, got ${typeof this.current}`, { format: 'JSON', typeName: 'Double' });
  }

  /**
   * Decode a String value.
   * JSON: string type (UTF-8) or null
   * 
   * @returns Decoded string or null
   * @see OPC 10000-6 Section 5.4.2.3 - String
   * @see FR-033 - Null value handling
   */
  decodeString(): string | null {
    if (this.current === null) {
      return null;
    }
    if (typeof this.current !== 'string') {
      throw new CodecError(`Expected string or null, got ${typeof this.current}`, { format: 'JSON', typeName: 'String' });
    }
    return this.current;
  }

  /**
   * Decode a DateTime value.
   * JSON: string type (ISO 8601 format: YYYY-MM-DDTHH:mm:ss.fffZ)
   * 
   * @returns Decoded Date object
   * @throws CodecError if value is not valid ISO 8601 string
   * @see OPC 10000-6 Section 5.4.2.4 - DateTime
   * @see FR-031 - ISO 8601 format for DateTime
   */
  decodeDateTime(): Date {
    if (typeof this.current !== 'string') {
      throw new CodecError(`Expected string for DateTime, got ${typeof this.current}`, { format: 'JSON', typeName: 'DateTime' });
    }
    const date = new Date(this.current);
    if (isNaN(date.getTime())) {
      throw new CodecError(`Invalid DateTime string: ${this.current}`, { format: 'JSON', typeName: 'DateTime' });
    }
    return date;
  }

  /**
   * Decode a Guid value.
   * JSON: string type (RFC 4122 format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
   * 
   * @returns Decoded GUID string
   * @throws CodecError if value is not valid GUID format
   * @see OPC 10000-6 Section 5.4.2.5 - Guid
   */
  decodeGuid(): string {
    if (typeof this.current !== 'string') {
      throw new CodecError(`Expected string for Guid, got ${typeof this.current}`, { format: 'JSON', typeName: 'Guid' });
    }
    const guidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!guidPattern.test(this.current)) {
      throw new CodecError(`Invalid GUID format: ${this.current}`, { format: 'JSON', typeName: 'Guid' });
    }
    return this.current;
  }

  /**
   * Decode a ByteString value.
   * JSON: string type (Base64 encoding) or null
   * 
   * @returns Decoded byte array or null
   * @throws CodecError if value is not valid Base64 string
   * @see OPC 10000-6 Section 5.4.2.6 - ByteString
   * @see FR-033 - Null value handling
   */
  decodeByteString(): Uint8Array | null {
    if (this.current === null) {
      return null;
    }
    if (typeof this.current !== 'string') {
      throw new CodecError(`Expected string or null for ByteString, got ${typeof this.current}`, { format: 'JSON', typeName: 'ByteString' });
    }
    try {
      // Decode from Base64
      const buffer = Buffer.from(this.current, 'base64');
      return new Uint8Array(buffer);
    } catch (error) {
      throw new CodecError(`Invalid Base64 string: ${this.current}`, { format: 'JSON', typeName: 'ByteString' });
    }
  }

  /**
   * Decode an XmlElement value.
   * JSON: string type (XML as string)
   * 
   * @returns Decoded XML string
   * @throws CodecError if value is not string
   * @see OPC 10000-6 Section 5.4.2.7 - XmlElement
   */
  decodeXmlElement(): string {
    if (typeof this.current !== 'string') {
      throw new CodecError(`Expected string for XmlElement, got ${typeof this.current}`, { format: 'JSON', typeName: 'XmlElement' });
    }
    return this.current;
  }

  /**
   * Decode an array using native JSON array syntax.
   * JSON: native array [element1, element2, ...]
   * Null returns null, empty array returns []
   * 
   * @param decodeElement - Function to decode each element
   * @returns Decoded array or null
   * @throws CodecError if current value is not an array or null
   * @example
   * const values = decoder.decodeArray((dec) => dec.decodeInt32());
   * // For: [10, 20, 30]
   * // Returns: [10, 20, 30]
   * @see OPC 10000-6 Section 5.4.5 - Arrays in JSON
   */
  decodeArray<T>(decodeElement: (decoder: this) => T): T[] | null {
    if (this.current === null) {
      return null;
    }

    if (!Array.isArray(this.current)) {
      throw new CodecError(
        `Expected array or null, got ${typeof this.current}`,
        { format: 'JSON', typeName: 'Array' }
      );
    }

    const result: T[] = [];
    for (const item of this.current) {
      // Create a temporary decoder for each element
      const tempDecoder = new JsonDecoder(JSON.stringify(item));
      result.push(decodeElement(tempDecoder as this));
    }

    return result;
  }
}
