/**
 * OPC UA XmlElement Type
 * 
 * XmlElement represents an XML fragment as a UTF-8 encoded string.
 * 
 * @module xml-element
 */

/**
 * OPC UA XmlElement class
 * 
 * An XmlElement represents a UTF-8 encoded XML fragment.
 * 
 * @example
 * ```typescript
 * import { XmlElement } from '@opcua/types';
 * 
 * const xml = XmlElement.create("Temperature", "25.5", { unit: "C" });
 * 
 * // Validate XML
 * if (xml.isValid()) {
 *   console.log("Valid XML");
 * }
 * ```
 */
export class XmlElement {
  /**
   * The XML string content
   */
  private readonly content: string;

  /**
   * Create a new XmlElement
   * 
   * @param content - The XML string content
   */
  constructor(content: string = '') {
    this.content = content;
  }

  /**
   * Get the XML string content
   * 
   * @returns The XML string
   */
  public toString(): string {
    return this.content;
  }

  /**
   * Get the length of the XML string
   * 
   * @returns The number of characters
   */
  public get length(): number {
    return this.content.length;
  }

  /**
   * Escape special XML characters in text content
   * 
   * @param text - Text to escape
   * @returns Escaped text safe for use in XML
   * 
   * @example
   * ```typescript
   * XmlElement.escape("Hello & <World>"); // "Hello &amp; &lt;World&gt;"
   * ```
   */
  public static escape(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  /**
   * Unescape XML entities to plain text
   * 
   * @param xml - XML text with entities
   * @returns Unescaped text
   * 
   * @example
   * ```typescript
   * XmlElement.unescape("Hello &amp; &lt;World&gt;"); // "Hello & <World>"
   * ```
   */
  public static unescape(xml: string): string {
    return xml
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&amp;/g, '&');
  }

  /**
   * Create a simple XML element
   * 
   * @param tagName - The XML tag name
   * @param content - The text content (will be escaped)
   * @param attributes - Optional attributes object
   * @returns XmlElement
   * 
   * @example
   * ```typescript
   * const xml = XmlElement.create("Temperature", "25.5", { unit: "C" });
   * // "<Temperature unit=\"C\">25.5</Temperature>"
   * ```
   */
  public static create(
    tagName: string,
    content: string = '',
    attributes?: Record<string, string>
  ): XmlElement {
    let attrStr = '';
    if (attributes) {
      attrStr = Object.entries(attributes)
        .map(([key, value]: [string, string]) => ` ${key}="${XmlElement.escape(value)}"`)
        .join('');
    }

    const escapedContent = XmlElement.escape(content);
    const xmlString = `<${tagName}${attrStr}>${escapedContent}</${tagName}>`;
    return new XmlElement(xmlString);
  }

  /**
   * Create an empty XmlElement
   * 
   * @returns Empty XmlElement
   */
  public static empty(): XmlElement {
    return new XmlElement('');
  }

  /**
   * Check equality with another XmlElement
   * 
   * @param other - The other XmlElement
   * @returns true if both contain the same XML string
   */
  public equals(other: XmlElement): boolean {
    return this.content === other.content;
  }
}
