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
  Xml = 2
}
