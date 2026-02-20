/**
 * OPC UA ExtensionObject type implementation (i=22).
 * 
 * An ExtensionObject is a container for encoded complex structures.
 * It contains a TypeId that identifies the structure type and an encoding
 * format indicator that specifies how the body is encoded.
 * 
 * Binary Encoding (OPC 10000-6 Section 5.2.2.15):
 * - TypeId (NodeId or ExpandedNodeId)
 * - Encoding byte (0x00=no body, 0x01=ByteString body, 0x02=XmlElement body)
 * - Body (depends on encoding byte)
 * 
 * @module codec/complex/extensionobject
 */

import { CodecError } from '../errors.js';
import type { IEncoder } from '../interfaces/encoder.js';
import type { IDecoder } from '../interfaces/decoder.js';
import { CodecFacade } from '../facade.js';
import { EncodingFormat } from '../types.js';
import { ExtensionObject, ExtensionObjectEncoding, ByteString, XmlElement } from '../../types/src/index.js';
import type { NodeId } from './nodeid.js';
import * as NodeIdCodec from './nodeid.js';
import type { ExpandedNodeId } from './expanded-nodeid.js';
import * as ExpandedNodeIdCodec from './expanded-nodeid.js';

export { ExtensionObject, ExtensionObjectEncoding };

/**
 * Check if a typeId is an ExpandedNodeId.
 * 
 * @param typeId - The type identifier
 * @returns True if it's an ExpandedNodeId
 */
function isExpandedNodeId(typeId: NodeId | ExpandedNodeId): typeId is ExpandedNodeId {
  return 'namespaceUri' in typeId || 'serverIndex' in typeId;
}

/**
 * Convert ExtensionObject from types package to codec representation for encoding.
 * The types package uses NodeId only, but codec supports ExpandedNodeId.
 */
function adaptForEncoding(value: ExtensionObject): { typeId: NodeId | ExpandedNodeId, encoding: ExtensionObjectEncoding, body: Uint8Array | string | null } {
  let body: Uint8Array | string | null = null;
  
  if (value.encoding === ExtensionObjectEncoding.Binary && value.body instanceof ByteString) {
    body = value.body.toUint8Array();
  } else if (value.encoding === ExtensionObjectEncoding.Xml && value.body instanceof XmlElement) {
    body = value.body.toString();
  }
  
  return { typeId: value.typeId, encoding: value.encoding, body };
}

/**
 * Create an ExtensionObject with no body.
 * 
 * @param typeId - The type identifier
 * @returns An ExtensionObject with no body
 */
export function extensionObjectNull(typeId: NodeId): ExtensionObject {
  return new ExtensionObject(typeId, ExtensionObjectEncoding.None, null);
}

/**
 * Create an ExtensionObject with ByteString body (Binary encoding).
 * 
 * @param typeId - The type identifier
 * @param body - The encoded body bytes
 * @returns An ExtensionObject with Binary encoding
 */
export function extensionObjectByteString(
  typeId: NodeId,
  body: Uint8Array
): ExtensionObject {
  return new ExtensionObject(typeId, ExtensionObjectEncoding.Binary, new ByteString(body));
}

/**
 * Create an ExtensionObject with XmlElement body (Xml encoding).
 * 
 * @param typeId - The type identifier
 * @param body - The XML string
 * @returns An ExtensionObject with Xml encoding
 */
export function extensionObjectXml(
  typeId: NodeId,
  body: string
): ExtensionObject {
  return new ExtensionObject(typeId, ExtensionObjectEncoding.Xml, new XmlElement(body));
}

/**
 * Get the body as ByteString if the encoding is Binary.
 * 
 * @param obj - The ExtensionObject
 * @returns The body as Uint8Array, or null if not Binary encoding
 */
export function getByteStringBody(obj: ExtensionObject): Uint8Array | null {
  if (obj.encoding === ExtensionObjectEncoding.Binary && obj.body instanceof ByteString) {
    return obj.body.toUint8Array();
  }
  return null;
}

/**
 * Get the body as XML string if the encoding is Xml.
 * 
 * @param obj - The ExtensionObject
 * @returns The body as string, or null if not Xml encoding
 */
export function getXmlBody(obj: ExtensionObject): string | null {
  if (obj.encoding === ExtensionObjectEncoding.Xml && obj.body instanceof XmlElement) {
    return obj.body.toString();
  }
  return null;
}

/**
 * Check if an ExtensionObject has no body.
 * 
 * @param obj - The ExtensionObject
 * @returns True if encoding is None or body is null
 */
export function hasNoBody(obj: ExtensionObject): boolean {
  return obj.encoding === ExtensionObjectEncoding.None || obj.body === null;
}

/**
 * Encode an ExtensionObject to binary format.
 * 
 * Binary encoding per OPC 10000-6 Section 5.2.2.15:
 * 1. Encode TypeId (NodeId)
 * 2. Write encoding byte
 * 3. If Binary: write ByteString (Int32 length + bytes)
 * 4. If Xml: write XmlElement (Int32 length + UTF-8 XML)
 * 5. If None: no body
 * 
 * @param encoder - The binary encoder
 * @param value - The ExtensionObject to encode
 */
export function encodeBinary(encoder: IEncoder, value: ExtensionObject): void {
  // Convert class instance to codec representation
  const adapted = adaptForEncoding(value);
  
  // Encode TypeId
  // Note: OPC UA specifies that ExtensionObject TypeId is always a NodeId, not ExpandedNodeId
  // If an ExpandedNodeId is provided, we encode it as such, but typically it's a NodeId
  if (isExpandedNodeId(adapted.typeId)) {
    ExpandedNodeIdCodec.encodeBinary(encoder, adapted.typeId);
  } else {
    NodeIdCodec.encodeBinary(encoder, adapted.typeId);
  }

  // Write encoding byte
  encoder.writeByte(adapted.encoding);

  // Write body based on encoding
  switch (adapted.encoding) {
    case ExtensionObjectEncoding.None:
      // No body
      break;
    case ExtensionObjectEncoding.Binary:
      if (adapted.body === null) {
        throw new CodecError('ExtensionObject with Binary encoding must have a body');
      }
      encoder.writeByteString(adapted.body as Uint8Array);
      break;
    case ExtensionObjectEncoding.Xml:
      if (adapted.body === null) {
        throw new CodecError('ExtensionObject with Xml encoding must have a body');
      }
      encoder.writeXmlElement(adapted.body as string);
      break;
    default:
      throw new CodecError(`Invalid ExtensionObject encoding: ${adapted.encoding}`);
  }
}

/**
 * Decode an ExtensionObject from binary format.
 * 
 * Binary decoding per OPC 10000-6 Section 5.2.2.15:
 * 1. Decode TypeId (NodeId)
 * 2. Read encoding byte
 * 3. If Binary: read ByteString
 * 4. If Xml: read XmlElement
 * 5. If None: no body
 * 
 * @param decoder - The binary decoder
 * @returns The decoded ExtensionObject
 */
export function decodeBinary(decoder: IDecoder): ExtensionObject {
  // Decode TypeId (always NodeId for ExtensionObject)
  const typeId = NodeIdCodec.decodeBinary(decoder);

  // Read encoding byte
  const encoding = decoder.readByte();

  // Validate encoding
  if (encoding !== ExtensionObjectEncoding.None &&
      encoding !== ExtensionObjectEncoding.Binary &&
      encoding !== ExtensionObjectEncoding.Xml) {
    throw new CodecError(`Invalid ExtensionObject encoding byte: ${encoding}. Must be 0, 1, or 2.`);
  }

  // Read body based on encoding
  let body: ByteString | XmlElement | null = null;
  
  switch (encoding) {
    case ExtensionObjectEncoding.None:
      // No body
      break;
    case ExtensionObjectEncoding.Binary: {
      const bytes = decoder.readByteString();
      if (bytes !== null) {
        body = new ByteString(bytes);
      }
      break;
    }
    case ExtensionObjectEncoding.Xml: {
      const xml = decoder.readXmlElement();
      if (xml !== null) {
        body = new XmlElement(xml);
      }
      break;
    }
  }

  return new ExtensionObject(typeId, encoding, body);
}

/**
 * Register ExtensionObject codec with the facade.
 * 
 * @param facade - The codec facade
 */
export function registerExtensionObject(facade: CodecFacade): void {
  facade.registerType('ExtensionObject', 'i=22', EncodingFormat.Binary, encodeBinary, decodeBinary);
}
