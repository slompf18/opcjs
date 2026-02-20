/**
 * JSON Encoder for OPC UA Builtin Types
 * 
 * Encodes OPC UA builtin types to JSON format according to OPC 10000-6 Section 5.4.
 * Produces RFC 8259 compliant JSON output per FR-030.
 * Uses proper JSON data types per FR-031.
 * 
 * Note: This is a standalone JSON encoder, not implementing IEncoder interface
 * which is designed for Binary encoding. JSON encoding requires different methods.
 * 
 * @module codec/json/encoder
 */

import { CodecError } from '../errors';

/**
 * JSON Encoder for OPC UA types.
 * Uses object building to construct JSON documents.
 * 
 * Features:
 * - Native JSON types (number, string, boolean, null, object, array)
 * - RFC 8259 compliant output
 * - Proper handling of special values (NaN, Infinity)
 * - Null value support per FR-033
 */
export class JsonEncoder {
  private json: any;
  private root: any;
  private stack: any[];

  constructor() {
    this.json = null;
    this.root = null;
    this.stack = [];
  }

  /**
   * Get the resulting JSON string.
   * @returns The complete JSON document as string
   */
  getJson(): string {
    return JSON.stringify(this.json);
  }

  /**
   * Get the JSON object (before serialization).
   * @returns The JSON object
   */
  getObject(): any {
    return this.json;
  }

  /**
   * Start a JSON object.
   * @param name - Optional object name (for nested objects)
   */
  startObject(name?: string): void {
    const obj: any = {};
    if (this.json === null) {
      this.json = obj;
      this.root = obj;
    } else if (name && typeof this.root === 'object') {
      this.root[name] = obj;
      this.stack.push(this.root);
      this.root = obj;
    }
  }

  /**
   * End the current JSON object.
   */
  endObject(): void {
    if (this.stack.length > 0) {
      this.root = this.stack.pop();
    }
  }

  /**
   * Set the root JSON value (for primitive types).
   * @param value - JSON value
   */
  setValue(value: any): void {
    this.json = value;
  }

  /**
   * Encode a Boolean value.
   * JSON: boolean type (true/false)
   * 
   * @param value - Boolean to encode
   * @see OPC 10000-6 Section 5.4.2.1 - Boolean
   * @see FR-030 - JSON  number, string, boolean, null types
   */
  encodeBoolean(value: boolean): void {
    this.setValue(value);
  }

  /**
   * Encode a Byte value (UInt8).
   * JSON: number type (0-255)
   * 
   * @param value - Byte to encode
   * @see OPC 10000-6 Section 5.4.2.2 - Byte
   */
  encodeByte(value: number): void {
    if (value < 0 || value > 255) {
      throw new CodecError(`Byte value ${value} out of range [0, 255]`, { format: 'JSON', typeName: 'Byte' });
    }
    this.setValue(value);
  }

  /**
   * Encode an SByte value (Int8).
   * JSON: number type (-128 to 127)
   * 
   * @param value - SByte to encode
   * @see OPC 10000-6 Section 5.4.2.2 - SByte
   */
  encodeSByte(value: number): void {
    if (value < -128 || value > 127) {
      throw new CodecError(`SByte value ${value} out of range [-128, 127]`, { format: 'JSON', typeName: 'SByte' });
    }
    this.setValue(value);
  }

  /**
   * Encode an Int16 value.
   * JSON: number type (-32768 to 32767)
   * 
   * @param value - Int16 to encode
   * @see OPC 10000-6 Section 5.4.2.2 - Int16
   */
  encodeInt16(value: number): void {
    if (value < -32768 || value > 32767) {
      throw new CodecError(`Int16 value ${value} out of range  [-32768, 32767]`, { format: 'JSON', typeName: 'Int16' });
    }
    this.setValue(value);
  }

  /**
   * Encode a UInt16 value.
   * JSON: number type (0 to 65535)
   * 
   * @param value - UInt16 to encode
   * @see OPC 10000-6 Section 5.4.2.2 - UInt16
   */
  encodeUInt16(value: number): void {
    if (value < 0 || value > 65535) {
      throw new CodecError(`UInt16 value ${value} out of range [0, 65535]`, { format: 'JSON', typeName: 'UInt16' });
    }
    this.setValue(value);
  }

  /**
   * Encode an Int32 value.
   * JSON: number type (-2^31 to 2^31-1)
   * 
   * @param value - Int32 to encode
   * @see OPC 10000-6 Section 5.4.2.2 - Int32
   */
  encodeInt32(value: number): void {
    if (value < -2147483648 || value > 2147483647) {
      throw new CodecError(`Int32 value ${value} out of range [-2147483648, 2147483647]`, { format: 'JSON', typeName: 'Int32' });
    }
    this.setValue(value);
  }

  /**
   * Encode a UInt32 value.
   * JSON: number type (0 to 2^32-1)
   * 
   * @param value - UInt32 to encode
   * @see OPC 10000-6 Section 5.4.2.2 - UInt32
   */
  encodeUInt32(value: number): void {
    if (value < 0 || value > 4294967295) {
      throw new CodecError(`UInt32 value ${value} out of range [0, 4294967295]`, { format: 'JSON', typeName: 'UInt32' });
    }
    this.setValue(value);
  }

  /**
   * Encode an Int64 value.
   * JSON: string type (JavaScript number loses precision beyond 2^53)
   * 
   * @param value - Int64 to encode as bigint
   * @see OPC 10000-6 Section 5.4.2.2 - Int64
   * @see FR-031 - Int64/UInt64 as strings in JSON
   */
  encodeInt64(value: bigint): void {
    this.setValue(value.toString());
  }

  /**
   * Encode a UInt64 value.
   * JSON: string type (JavaScript number loses precision beyond 2^53)
   * 
   * @param value - UInt64 to encode as bigint
   * @see OPC 10000-6 Section 5.4.2.2 - UInt64
   * @see FR-031 - Int64/UInt64 as strings in JSON
   */
  encodeUInt64(value: bigint): void {
    if (value < 0n) {
      throw new CodecError(`UInt64 value ${value} cannot be negative`, { format: 'JSON', typeName: 'UInt64' });
    }
    this.setValue(value.toString());
  }

  /**
   * Encode a Float value (32-bit IEEE 754).
   * JSON: number type, or string for special values.
   * Special values: NaN → "NaN", Infinity → "Infinity", -Infinity → "-Infinity"
   * 
   * @param value - Float to encode
   * @see OPC 10000-6 Section 5.4.2.2 - Float
   * @see FR-031 - Special float values as strings
   */
  encodeFloat(value: number): void {
    if (Number.isNaN(value)) {
      this.setValue("NaN");
    } else if (value === Infinity) {
      this.setValue("Infinity");
    } else if (value === -Infinity) {
      this.setValue("-Infinity");
    } else {
      this.setValue(value);
    }
  }

  /**
   * Encode a Double value (64-bit IEEE 754).
   * JSON: number type, or string for special values.
   * Special values: NaN → "NaN", Infinity → "Infinity", -Infinity → "-Infinity"
   * 
   * @param value - Double to encode
   * @see OPC 10000-6 Section 5.4.2.2 - Double
   * @see FR-031 - Special float values as strings
   */
  encodeDouble(value: number): void {
    if (Number.isNaN(value)) {
      this.setValue("NaN");
    } else if (value === Infinity) {
      this.setValue("Infinity");
    } else if (value === -Infinity) {
      this.setValue("-Infinity");
    } else {
      this.setValue(value);
    }
  }

  /**
   * Encode a String value.
   * JSON: string type (UTF-8, RFC 8259 escaping)
   * Null: null
   * 
   * @param value - String to encode (null allowed per FR-033)
   * @see OPC 10000-6 Section 5.4.2.3 - String
   * @see FR-033 - Null value handling
   */
  encodeString(value: string | null): void {
    if (value === null) {
      this.setValue(null);
    } else {
      this.setValue(value);
    }
  }

  /**
   * Encode a DateTime value.
   * JSON: string type (ISO 8601 format: YYYY-MM-DDTHH:mm:ss.fffZ)
   * 
   * @param value - Date to encode
   * @see OPC 10000-6 Section 5.4.2.4 - DateTime
   * @see FR-031 - ISO 8601 format for DateTime
   */
  encodeDateTime(value: Date): void {
    this.setValue(value.toISOString());
  }

  /**
   * Encode a Guid value.
   * JSON: string type (RFC 4122 format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
   * 
   * @param value - GUID string to encode
   * @see OPC 10000-6 Section 5.4.2.5 - Guid
   */
  encodeGuid(value: string): void {
    // Validate GUID format
    const guidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!guidPattern.test(value)) {
      throw new CodecError(`Invalid GUID format: ${value}`, { format: 'JSON', typeName: 'Guid' });
    }
    this.setValue(value);
  }

  /**
   * Encode a ByteString value.
   * JSON: string type (Base64 encoding)
   * Null: null
   * 
   * @param value - Byte array to encode (null allowed per FR-033)
   * @see OPC 10000-6 Section 5.4.2.6 - ByteString
   * @see FR-033 - Null value handling
   */
  encodeByteString(value: Uint8Array | null): void {
    if (value === null) {
      this.setValue(null);
    } else {
      // Convert to Base64
      const base64 = Buffer.from(value).toString('base64');
      this.setValue(base64);
    }
  }

  /**
   * Encode an XmlElement value.
   * JSON: string type (XML as string)
   * 
   * @param value - XML string to encode
   * @see OPC 10000-6 Section 5.4.2.7 - XmlElement
   */
  encodeXmlElement(value: string): void {
    this.setValue(value);
  }

  /**
   * Encode an array using native JSON array syntax.
   * JSON: native array [element1, element2, ...]
   * Null arrays encoded as null, empty arrays as []
   * 
   * @param array - Array to encode (null for null array)
   * @param encodeElement - Function to encode each element
   * @returns The encoded array (for chaining or direct use)
   * @example
   * encoder.encodeArray([10, 20, 30], (enc, val) => enc.encodeInt32(val));
   * // Result: [10, 20, 30]
   * @see OPC 10000-6 Section 5.4.5 - Arrays in JSON
   */
  encodeArray<T>(
    array: T[] | null,
    encodeElement: (encoder: this, value: T) => void
  ): any[] | null {
    if (array === null) {
      this.setValue(null);
      return null;
    }

    const result: any[] = [];
    for (const item of array) {
      // Create a temporary encoder for each element
      const tempEncoder = new JsonEncoder();
      encodeElement(tempEncoder as this, item);
      result.push(tempEncoder.getObject());
    }
    
    this.setValue(result);
    return result;
  }
}
