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
   * Validate if this XmlElement contains valid XML
   * 
   * Note: This is a simple check, not a full XML validator.
   * For production use, consider using a proper XML parser.
   * 
   * @returns true if the string appears to be valid XML
   * 
   * @example
   * ```typescript
   * const xml = new XmlElement("<root></root>");
   * xml.isValid(); // true
   * ```
   */
  public isValid(): boolean {
    if (this.content.length === 0) {
      return false;
    }

    // Check if string starts with '<' and ends with '>'
    const trimmed = this.content.trim();
    if (!trimmed.startsWith('<') || !trimmed.endsWith('>')) {
      return false;
    }

    // Try to parse with DOMParser in browser, or basic validation in Node.js
    // Check if we're in a browser environment with DOMParser available
    try {
      if (typeof globalThis !== 'undefined' && 'DOMParser' in globalThis) {
        const DOMParserConstructor = (globalThis as any).DOMParser;
        const parser = new DOMParserConstructor();
        const doc = parser.parseFromString(this.content, 'text/xml');
        const parserError = doc.querySelector('parsererror');
        return parserError === null;
      }
    } catch {
      // Fall through to basic validation
    }

    // In Node.js environment, do basic tag matching
    return XmlElement.checkBasicXmlStructure(trimmed);
  }

  /**
   * Basic XML structure validation (for Node.js environment)
   * Checks for matching opening and closing tags
   */
  private static checkBasicXmlStructure(xml: string): boolean {
    const tagStack: string[] = [];
    const tagRegex = /<\/?([a-zA-Z][\w:-]*)[^>]*>/g;
    let match: RegExpExecArray | null;

    while ((match = tagRegex.exec(xml)) !== null) {
      const fullTag = match[0];
      const tagName = match[1];

      if (fullTag.startsWith('</')) {
        // Closing tag
        if (tagStack.length === 0 || tagStack.pop() !== tagName) {
          return false;
        }
      } else if (!fullTag.endsWith('/>')) {
        // Opening tag (not self-closing)
        tagStack.push(tagName);
      }
      // Self-closing tags (ending with '/>')  don't affect the stack
    }

    return tagStack.length === 0;
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
