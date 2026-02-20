/**
 * XML Decoder for OPC UA Builtin Types
 * 
 * Decodes OPC UA builtin types from XML format according to OPC 10000-6 Section 5.3.
 * Validates XML structure per FR-027 and handles namespaces per FR-028.
 * 
 * Note: This is a standalone XML decoder, not implementing IDecoder interface
 * which is designed for Binary decoding. XML decoding requires different methods.
 * 
 * @module codec/xml/decoder
 */

import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import { CodecError } from '../errors';

/**
 * XML Decoder for OPC UA types.
 * Uses fast-xml-parser for XML parsing.
 * 
 * Features:
 * - Fast XML parsing with validation
 * - XML namespace handling
 * - Automatic type conversion
 * - Error reporting for malformed XML
 */
export class XmlDecoder {
  private parser: XMLParser;
  private currentElement: any;
  private elementStack: any[];

  constructor(xmlString: string) {
    // Configure parser per OPC UA requirements
    this.parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      textNodeName: '#text',
      parseTagValue: false, // We'll handle type conversion manually
      parseAttributeValue: false,
      trimValues: true,
      removeNSPrefix: false, // Keep namespace prefixes per FR-028
      allowBooleanAttributes: false,
      preserveOrder: false,
    });

    try {
      const parsed = this.parser.parse(xmlString);
      if (!parsed || Object.keys(parsed).length === 0) {
        throw new CodecError('Malformed XML: empty or invalid document');
      }
      this.currentElement = parsed;
      this.elementStack = [];
    } catch (error) {
      if (error instanceof CodecError) {
        throw error;
      }
      throw new CodecError(`Malformed XML: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Navigate to a child element.
   * @param name - Element name to navigate to
   */
  startElement(name: string): void {
    // Handle case where element doesn't exist or is undefined
    if (typeof this.currentElement[name] === 'undefined') {
      throw new CodecError(`Element '${name}' not found in XML`);
    }
    this.elementStack.push(this.currentElement);
    this.currentElement = this.currentElement[name];
  }

  /**
   * Navigate back to parent element.
   */
  endElement(): void {
    if (this.elementStack.length === 0) {
      throw new CodecError('Cannot end element: no parent element in stack');
    }
    this.currentElement = this.elementStack.pop();
  }

  /**
   * Get text content of current element.
   * @returns Text content or empty string
   */
  private getTextContent(): string {
    if (typeof this.currentElement === 'string') {
      return this.currentElement;
    }
    if (this.currentElement['#text']) {
      return this.currentElement['#text'];
    }
    return '';
  }

  /**
   * Get the name of the current element.
   * For Variant decoding, finds the first child element name.
   * @returns Element name or null
   */
  getCurrentElementName(): string | null {
    if (typeof this.currentElement !== 'object' || this.currentElement === null) {
      return null;
    }
    
    const keys = Object.keys(this.currentElement).filter(key => !key.startsWith('@_') && key !== '#text');
    return keys.length > 0 ? keys[0] : null;
  }

  /**
   * Get child elements of a specific type.
   * Returns an array of child elements matching the given name.
   * @param name - Element name to find
   * @returns Array of elements (empty if none found)
   */
  getChildElements(name: string): any[] {
    if (typeof this.currentElement !== 'object' || this.currentElement === null) {
      return [];
    }
    
    const child = this.currentElement[name];
    if (typeof child === 'undefined') {
      return [];
    }
    
    // fast-xml-parser returns single element as object, multiple as array
    return Array.isArray(child) ? child : [child];
  }

  /**
   * Decode Boolean from XML (xs:boolean).
   * Format: "true" or "false" or "1" or "0"
   * @returns Boolean value
   */
  decodeBoolean(): boolean {
    const text = this.getTextContent().toLowerCase().trim();
    if (text === 'true' || text === '1') {
      return true;
    }
    if (text === 'false' || text === '0') {
      return false;
    }
    throw new CodecError(`Invalid Boolean value: ${text}`);
  }

  /**
   * Decode Byte from XML (xs:unsignedByte).
   * Format: Base-10 integer 0-255
   * @returns Byte value
   */
  decodeByte(): number {
    const text = this.getTextContent().trim();
    const value = parseInt(text, 10);
    if (isNaN(value) || value < 0 || value > 255) {
      throw new CodecError(`Invalid Byte value: ${text}`);
    }
    return value;
  }

  /**
   * Decode SByte from XML (xs:byte).
   * Format: Base-10 integer -128 to 127
   * @returns SByte value
   */
  decodeSByte(): number {
    const text = this.getTextContent().trim();
    const value = parseInt(text, 10);
    if (isNaN(value) || value < -128 || value > 127) {
      throw new CodecError(`Invalid SByte value: ${text}`);
    }
    return value;
  }

  /**
   * Decode Int16 from XML (xs:short).
   * Format: Base-10 integer
   * @returns Int16 value
   */
  decodeInt16(): number {
    const text = this.getTextContent().trim();
    const value = parseInt(text, 10);
    if (isNaN(value) || value < -32768 || value > 32767) {
      throw new CodecError(`Invalid Int16 value: ${text}`);
    }
    return value;
  }

  /**
   * Decode UInt16 from XML (xs:unsignedShort).
   * Format: Base-10 integer
   * @returns UInt16 value
   */
  decodeUInt16(): number {
    const text = this.getTextContent().trim();
    const value = parseInt(text, 10);
    if (isNaN(value) || value < 0 || value > 65535) {
      throw new CodecError(`Invalid UInt16 value: ${text}`);
    }
    return value;
  }

  /**
   * Decode Int32 from XML (xs:int).
   * Format: Base-10 integer
   * @returns Int32 value
   */
  decodeInt32(): number {
    const text = this.getTextContent().trim();
    const value = parseInt(text, 10);
    if (isNaN(value) || value < -2147483648 || value > 2147483647) {
      throw new CodecError(`Invalid Int32 value: ${text}`);
    }
    return value;
  }

  /**
   * Decode UInt32 from XML (xs:unsignedInt).
   * Format: Base-10 integer
   * @returns UInt32 value
   */
  decodeUInt32(): number {
    const text = this.getTextContent().trim();
    const value = parseInt(text, 10);
    if (isNaN(value) || value < 0 || value > 4294967295) {
      throw new CodecError(`Invalid UInt32 value: ${text}`);
    }
    return value;
  }

  /**
   * Decode Int64 from XML (xs:long).
   * Format: Base-10 integer string
   * @returns Int64 value (BigInt)
   */
  decodeInt64(): bigint {
    const text = this.getTextContent().trim();
    try {
      return BigInt(text);
    } catch {
      throw new CodecError(`Invalid Int64 value: ${text}`);
    }
  }

  /**
   * Decode UInt64 from XML (xs:unsignedLong).
   * Format: Base-10 integer string
   * @returns UInt64 value (BigInt)
   */
  decodeUInt64(): bigint {
    const text = this.getTextContent().trim();
    try {
      const value = BigInt(text);
      if (value < 0n) {
        throw new CodecError(`UInt64 cannot be negative: ${text}`);
      }
      return value;
    } catch {
      throw new CodecError(`Invalid UInt64 value: ${text}`);
    }
  }

  /**
   * Decode Float from XML (xs:float).
   * Format: IEEE 754 string representation
   * Supports: INF, -INF, NaN
   * @returns Float value
   */
  decodeFloat(): number {
    const text = this.getTextContent().trim();
    if (text === 'NaN') {
      return NaN;
    }
    if (text === 'INF') {
      return Infinity;
    }
    if (text === '-INF') {
      return -Infinity;
    }
    // Empty string should not return NaN through parseFloat, it's an error
    if (text === '') {
      throw new CodecError('Invalid Float value: empty string');
    }
    const value = parseFloat(text);
    if (isNaN(value)) {
      throw new CodecError(`Invalid Float value: ${text}`);
    }
    return value;
  }

  /**
   * Decode Double from XML (xs:double).
   * Format: IEEE 754 string representation
   * Supports: INF, -INF, NaN
   * @returns Double value
   */
  decodeDouble(): number {
    const text = this.getTextContent().trim();
    if (text === 'NaN') {
      return NaN;
    }
    if (text === 'INF') {
      return Infinity;
    }
    if (text === '-INF') {
      return -Infinity;
    }
    const value = parseFloat(text);
    if (isNaN(value)) {
      throw new CodecError(`Invalid Double value: ${text}`);
    }
    return value;
  }

  /**
   * Decode String from XML.
   * Format: UTF-8 text (XML-unescaped by parser)
   * Empty element: null
   * @returns String value or null
   */
  decodeString(): string | null {
    const text = this.getTextContent();
    if (text === '') {
      // Empty element = null string per FR-026
      return null;
    }
    return text;
  }

  /**
   * Decode DateTime from XML (xs:dateTime ISO 8601).
   * Format: YYYY-MM-DDTHH:mm:ss.fffZ
   * @returns Date object
   */
  decodeDateTime(): Date {
    const text = this.getTextContent().trim();
    const date = new Date(text);
    if (isNaN(date.getTime())) {
      throw new CodecError(`Invalid DateTime value: ${text}`);
    }
    return date;
  }

  /**
   * Decode Guid from XML (RFC 4122 format).
   * Format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   * @returns UUID string
   */
  decodeGuid(): string {
    const text = this.getTextContent().trim();
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(text)) {
      throw new CodecError(`Invalid Guid format: ${text}`);
    }
    return text;
  }

  /**
   * Decode ByteString from XML (Base64).
   * Format: Base64-encoded binary data
   * Empty element: null
   * @returns Buffer or null
   */
  decodeByteString(): Buffer | null {
    const text = this.getTextContent();
    if (text === '') {
      return null;
    }
    try {
      return Buffer.from(text, 'base64');
    } catch {
      throw new CodecError(`Invalid Base64 ByteString: ${text}`);
    }
  }

  /**
   * Decode XmlElement from XML.
   * Format: Embedded XML content
   * @returns XML string or null
   */
  decodeXmlElement(): string | null {
    const text = this.getTextContent();
    if (text === '') {
      return null;
    }
    return text;
  }

  /**
   * Decode an array from ListOf container pattern.
   * Per OPC UA XML schema: arrays use <ListOf{TypeName}> container with repeated <{TypeName}> elements
   * 
   * @param containerName - Container element name (e.g., 'ListOfInt32')
   * @param elementName - Element name for each array item (e.g., 'Int32')
   * @param decodeElement - Function to decode each element
   * @returns Decoded array or null
   * @example
   * const values = decoder.decodeArray('ListOfInt32', 'Int32', (dec) => dec.decodeInt32());
   * // For: <ListOfInt32><Int32>10</Int32><Int32>20</Int32></ListOfInt32>
   * // Returns: [10, 20, 30]
   */
  decodeArray<T>(
    containerName: string,
    elementName: string,
    decodeElement: (decoder: this) => T
  ): T[] | null {
    // Check if container exists
    if (typeof this.currentElement[containerName] === 'undefined') {
      throw new CodecError(`Array container '${containerName}' not found in XML`);
    }

    // Navigate to container
    this.startElement(containerName);
    
    // Check for null array (self-closing or empty)
    if (typeof this.currentElement[elementName] === 'undefined') {
      this.endElement();
      return null;
    }

    // Get element(s) - fast-xml-parser converts repeated elements to arrays
    const elements = this.currentElement[elementName];
    
    // Handle single element (not an array)
    if (!Array.isArray(elements)) {
      const savedCurrent = this.currentElement;
      this.currentElement = elements;
      const value = decodeElement(this);
      this.currentElement = savedCurrent;
      this.endElement();
      return [value];
    }

    // Handle array of elements
    const result: T[] = [];
    for (const element of elements) {
      const savedCurrent = this.currentElement;
      this.currentElement = element;
      result.push(decodeElement(this));
      this.currentElement = savedCurrent;
    }
    
    this.endElement();
    return result;
  }
}
