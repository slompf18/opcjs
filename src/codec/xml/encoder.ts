/**
 * XML Encoder for OPC UA Builtin Types
 * 
 * Encodes OPC UA builtin types to XML format according to OPC 10000-6 Section 5.3.
 * Produces well-formed XML 1.0 compliant output per FR-022.
 * Uses proper XML element names per FR-023 and escapes special characters per FR-024.
 * 
 * Note: This is a standalone XML encoder, not implementing IEncoder interface
 * which is designed for Binary encoding. XML encoding requires different methods.
 * 
 * @module codec/xml/encoder
 */

import { CodecError } from '../errors';

/**
 * XML Encoder for OPC UA types.
 * Uses string building to construct XML documents.
 * 
 * Features:
 * - String building for efficient XML construction
 * - XML escaping for special characters (&, <, >, ", ')
 * - Well-formed XML output per XML 1.0 specification
 * - Proper element naming per OPC UA XML schema
 */
export class XmlEncoder {
  private xml: string;
  private elementStack: string[];

  constructor() {
    this.xml = '';
    this.elementStack = [];
  }

  /**
   * Get the resulting XML string.
   * @returns The complete XML document
   */
  getXml(): string {
    return this.xml;
  }

  /**
   * Start an XML element.
   * @param name - Element name
   */
  startElement(name: string): void {
    this.xml += `<${name}>`;
    this.elementStack.push(name);
  }

  /**
   * End the current XML element.
   */
  endElement(): void {
    const name = this.elementStack.pop();
    if (!name) {
      throw new CodecError('No element to close in XML encoder');
    }
    this.xml += `</${name}>`;
  }

  /**
   * Write an empty element (self-closing for null values).
   * @param name - Element name
   */
  writeEmptyElement(name: string): void {
    this.xml += `<${name}/>`;
  }

  /**
   * Escape XML special characters per FR-024.
   * Escapes: & < > " '
   * @param value - String to escape
   * @returns Escaped string
   */
  private escapeXml(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  /**
   * Write a text node with proper XML escaping.
   * @param value - Text content
   */
  writeText(value: string): void {
    this.xml += this.escapeXml(value);
  }

  /**
   * Write a complete element with text content.
   * @param name - Element name
   * @param value - Text content
   */
  writeElementString(name: string, value: string): void {
    this.xml += `<${name}>${this.escapeXml(value)}</${name}>`;
  }

  /**
   * Encode Boolean as XML (xs:boolean).
   * Format: "true" or "false"
   * @param value - Boolean value to encode
   */
  encodeBoolean(value: boolean): void {
    this.writeText(value ? 'true' : 'false');
  }

  /**
   * Encode Byte as XML (xs:unsignedByte).
   * Format: Base-10 integer 0-255
   * @param value - Byte value to encode
   */
  encodeByte(value: number): void {
    if (value < 0 || value > 255) {
      throw new CodecError(`Byte value ${value} out of range [0, 255]`);
    }
    this.writeText(value.toString());
  }

  /**
   * Encode SByte as XML (xs:byte).
   * Format: Base-10 integer -128 to 127
   * @param value - SByte value to encode
   */
  encodeSByte(value: number): void {
    if (value < -128 || value > 127) {
      throw new CodecError(`SByte value ${value} out of range [-128, 127]`);
    }
    this.writeText(value.toString());
  }

  /**
   * Encode Int16 as XML (xs:short).
   * Format: Base-10 integer
   * @param value - Int16 value to encode
   */
  encodeInt16(value: number): void {
    if (value < -32768 || value > 32767) {
      throw new CodecError(`Int16 value ${value} out of range [-32768, 32767]`);
    }
    this.writeText(value.toString());
  }

  /**
   * Encode UInt16 as XML (xs:unsignedShort).
   * Format: Base-10 integer
   * @param value - UInt16 value to encode
   */
  encodeUInt16(value: number): void {
    if (value < 0 || value > 65535) {
      throw new CodecError(`UInt16 value ${value} out of range [0, 65535]`);
    }
    this.writeText(value.toString());
  }

  /**
   * Encode Int32 as XML (xs:int).
   * Format: Base-10 integer
   * @param value - Int32 value to encode
   */
  encodeInt32(value: number): void {
    if (value < -2147483648 || value > 2147483647) {
      throw new CodecError(`Int32 value ${value} out of range [-2147483648, 2147483647]`);
    }
    this.writeText(value.toString());
  }

  /**
   * Encode UInt32 as XML (xs:unsignedInt).
   * Format: Base-10 integer
   * @param value - UInt32 value to encode
   */
  encodeUInt32(value: number): void {
    if (value < 0 || value > 4294967295) {
      throw new CodecError(`UInt32 value ${value} out of range [0, 4294967295]`);
    }
    this.writeText(value.toString());
  }

  /**
   * Encode Int64 as XML (xs:long).
   * Format: Base-10 integer string
   * @param value - Int64 value to encode (BigInt)
   */
  encodeInt64(value: bigint): void {
    this.writeText(value.toString());
  }

  /**
   * Encode UInt64 as XML (xs:unsignedLong).
   * Format: Base-10 integer string
   * @param value - UInt64 value to encode (BigInt)
   */
  encodeUInt64(value: bigint): void {
    if (value < 0n) {
      throw new CodecError(`UInt64 value ${value} cannot be negative`);
    }
    this.writeText(value.toString());
  }

  /**
   * Encode Float as XML (xs:float).
   * Format: IEEE 754 string representation
   * Supports: INF, -INF, NaN
   * @param value - Float value to encode
   */
  encodeFloat(value: number): void {
    if (Number.isNaN(value)) {
      this.writeText('NaN');
    } else if (value === Infinity) {
      this.writeText('INF');
    } else if (value === -Infinity) {
      this.writeText('-INF');
    } else {
      this.writeText(value.toString());
    }
  }

  /**
   * Encode Double as XML (xs:double).
   * Format: IEEE 754 string representation
   * Supports: INF, -INF, NaN
   * @param value - Double value to encode
   */
  encodeDouble(value: number): void {
    if (Number.isNaN(value)) {
      this.writeText('NaN');
    } else if (value === Infinity) {
      this.writeText('INF');
    } else if (value === -Infinity) {
      this.writeText('-INF');
    } else {
      this.writeText(value.toString());
    }
  }

  /**
   * Encode String as XML.
   * Format: UTF-8 text with XML escaping
   * Null strings: empty element
   * @param value - String value to encode (null for empty)
   */
  encodeString(value: string | null): void {
    if (value === null) {
      // Null strings represented as empty text
      return;
    }
    this.writeText(value);
  }

  /**
   * Encode DateTime as XML (xs:dateTime ISO 8601).
   * Format: YYYY-MM-DDTHH:mm:ss.fffZ
   * @param value - Date to encode
   */
  encodeDateTime(value: Date): void {
    // ISO 8601 format with UTC
    this.writeText(value.toISOString());
  }

  /**
   * Encode Guid as XML (RFC 4122 format).
   * Format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   * @param value - UUID string
   */
  encodeGuid(value: string): void {
    // Validate basic UUID format
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)) {
      throw new CodecError(`Invalid Guid format: ${value}`);
    }
    this.writeText(value);
  }

  /**
   * Encode ByteString as XML (Base64).
   * Format: Base64-encoded binary data
   * Null: empty element
   * @param value - Buffer to encode (null for empty)
   */
  encodeByteString(value: Buffer | null): void {
    if (value === null) {
      return;
    }
    this.writeText(value.toString('base64'));
  }

  /**
   * Encode XmlElement as XML.
   * Format: Embedded XML content (already well-formed)
   * @param value - XML string to embed
   */
  encodeXmlElement(value: string | null): void {
    if (value === null) {
      return;
    }
    // XmlElement is already XML, write it directly without escaping
    this.xml += value;
  }

  /**
   * Encode an array using ListOf container pattern.
   * Per OPC UA XML schema: arrays use <ListOf{TypeName}> container with repeated <{TypeName}> elements
   * 
   * @param array - Array to encode (null for null array)
   * @param elementName - Element name for each array item
   * @param encodeElement - Function to encode each element
   * @example
   * encoder.encodeArray([10, 20, 30], 'Int32', (enc, val) => enc.encodeInt32(val));
   * // Result: <ListOfInt32><Int32>10</Int32><Int32>20</Int32><Int32>30</Int32></ListOfInt32>
   */
  encodeArray<T>(
    array: T[] | null,
    elementName: string,
    encodeElement: (encoder: this, value: T) => void
  ): void {
    const containerName = `ListOf${elementName}`;
    
    if (array === null) {
      // Null array: use self-closing element
      this.writeEmptyElement(containerName);
      return;
    }

    // Start container
    this.startElement(containerName);
    
    // Encode each element
    for (const item of array) {
      this.startElement(elementName);
      encodeElement(this, item);
      this.endElement();
    }
    
    // End container
    this.endElement();
  }
}
