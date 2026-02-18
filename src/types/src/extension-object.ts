/**
 * OPC UA ExtensionObject Type (i=22)
 * 
 * An ExtensionObject is a container for complex structures that cannot be
 * represented by any of the other builtin types. It contains a TypeId to
 * identify the structure type and an encoded body.
 * 
 * @see OPC UA Part 6, Section 5.2.2.15
 */

import { NodeId } from './nodeid.js';
import { ByteString } from './bytestring.js';
import { XmlElement } from './xml-element.js';

/**
 * Enumeration for ExtensionObject encoding types.
 */
export enum ExtensionObjectEncoding {
  /**
   * No body is encoded.
   */
  None = 0,

  /**
   * The body is encoded as a ByteString using the OPC UA binary encoding.
   */
  Binary = 1,

  /**
   * The body is encoded as an XmlElement.
   */
  Xml = 2,
}

/**
 * Represents an OPC UA ExtensionObject.
 * 
 * An ExtensionObject contains a complex data structure that is not
 * represented by any of the builtin types. The structure is identified
 * by its TypeId (a NodeId) and encoded in either binary or XML format.
 * 
 * @example
 * ```typescript
 * import { ExtensionObject, ExtensionObjectEncoding } from '@opcua/types';
 * import { NodeId } from '@opcua/types';
 * 
 * // Create an ExtensionObject with binary encoding
 * const typeId = new NodeId(2, 123); // Custom structure type
 * const body = new Uint8Array([0x01, 0x02, 0x03, 0x04]);
 * const extObj = new ExtensionObject(typeId, ExtensionObjectEncoding.Binary, body);
 * 
 * // Check encoding type
 * if (extObj.isBinaryEncoded()) {
 *   console.log('Binary body length:', extObj.body?.length);
 * }
 * ```
 */
export class ExtensionObject {
  /**
   * The NodeId that identifies the type of structure encoded in the body.
   */
  public readonly typeId: NodeId;

  /**
   * The encoding used for the body.
   */
  public readonly encoding: ExtensionObjectEncoding;

  /**
   * The encoded body.
   * - For Binary encoding, this is a ByteString
   * - For Xml encoding, this is an XmlElement
   * - For None encoding, this is null
   */
  public readonly body: ByteString | XmlElement | null;

  /**
   * Creates a new ExtensionObject.
   * 
   * @param typeId - The NodeId identifying the structure type
   * @param encoding - The encoding type
   * @param body - The encoded body (null for None encoding)
   */
  constructor(
    typeId: NodeId,
    encoding: ExtensionObjectEncoding = ExtensionObjectEncoding.None,
    body: ByteString | XmlElement | null = null
  ) {
    this.typeId = typeId;
    this.encoding = encoding;
    this.body = body;
  }

  /**
   * Creates an ExtensionObject with no body.
   * 
   * @param typeId - The NodeId identifying the structure type
   * @returns A new ExtensionObject with None encoding
   */
  public static createEmpty(typeId: NodeId): ExtensionObject {
    return new ExtensionObject(typeId, ExtensionObjectEncoding.None, null);
  }

  /**
   * Creates an ExtensionObject with binary encoding.
   * 
   * @param typeId - The NodeId identifying the structure type
   * @param body - The binary encoded body
   * @returns A new ExtensionObject with Binary encoding
   */
  public static createBinary(typeId: NodeId, body: ByteString): ExtensionObject {
    return new ExtensionObject(typeId, ExtensionObjectEncoding.Binary, body);
  }

  /**
   * Creates an ExtensionObject with XML encoding.
   * 
   * @param typeId - The NodeId identifying the structure type
   * @param body - The XML encoded body
   * @returns A new ExtensionObject with Xml encoding
   */
  public static createXml(typeId: NodeId, body: XmlElement): ExtensionObject {
    return new ExtensionObject(typeId, ExtensionObjectEncoding.Xml, body);
  }

  /**
   * Checks if the body is binary encoded.
   * 
   * @returns True if encoding is Binary
   */
  public isBinaryEncoded(): boolean {
    return this.encoding === ExtensionObjectEncoding.Binary;
  }

  /**
   * Checks if the body is XML encoded.
   * 
   * @returns True if encoding is Xml
   */
  public isXmlEncoded(): boolean {
    return this.encoding === ExtensionObjectEncoding.Xml;
  }

  /**
   * Checks if the ExtensionObject has no body.
   * 
   * @returns True if encoding is None or body is null
   */
  public isEmpty(): boolean {
    return this.encoding === ExtensionObjectEncoding.None || this.body === null;
  }

  /**
   * Gets the binary body.
   * 
   * @returns The body as ByteString, or null if not binary encoded
   */
  public getBinaryBody(): ByteString | null {
    if (this.isBinaryEncoded() && this.body instanceof ByteString) {
      return this.body;
    }
    return null;
  }

  /**
   * Gets the XML body.
   * 
   * @returns The body as XmlElement, or null if not XML encoded
   */
  public getXmlBody(): XmlElement | null {
    if (this.isXmlEncoded() && this.body instanceof XmlElement) {
      return this.body;
    }
    return null;
  }

  /**
   * Converts the ExtensionObject to a string representation.
   * 
   * @returns A string representation
   */
  public toString(): string {
    const encodingName = ExtensionObjectEncoding[this.encoding];
    
    if (this.isEmpty()) {
      return `ExtensionObject(${this.typeId.toString()}, ${encodingName})`;
    }

    let bodyInfo = '';
    if (this.isBinaryEncoded() && this.body instanceof ByteString) {
      bodyInfo = `, ${this.body.length} bytes`;
    } else if (this.isXmlEncoded() && this.body instanceof XmlElement) {
      bodyInfo = `, ${this.body.length} chars`;
    }

    return `ExtensionObject(${this.typeId.toString()}, ${encodingName}${bodyInfo})`;
  }

  /**
   * Checks equality with another ExtensionObject.
   * 
   * @param other - The ExtensionObject to compare with
   * @returns True if equal
   */
  public equals(other: ExtensionObject): boolean {
    if (!this.typeId.equals(other.typeId)) {
      return false;
    }

    if (this.encoding !== other.encoding) {
      return false;
    }

    if (this.body === null && other.body === null) {
      return true;
    }

    if (this.body === null || other.body === null) {
      return false;
    }

    if (this.body instanceof ByteString && other.body instanceof ByteString) {
      return this.body.equals(other.body);
    }

    if (this.body instanceof XmlElement && other.body instanceof XmlElement) {
      return this.body.equals(other.body);
    }

    return false;
  }
}
