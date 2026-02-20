/**
 * @fileoverview ExpandedNodeId type definition and encoder/decoder
 * @module codec/complex/expanded-nodeid
 * 
 * ExpandedNodeId extends NodeId with optional namespace URI and server index,
 * allowing cross-server node references.
 * 
 * @see OPC 10000-6 Section 5.2.2.10 - ExpandedNodeId
 * @see OPC 10000-6 Table 20 - ExpandedNodeId encoding
 * @see FR-013 - Support all ExpandedNodeId formats
 */

import { IEncoder } from '../interfaces/encoder.js';
import { IDecoder } from '../interfaces/decoder.js';
import { CodecFacade } from '../facade.js';
import { EncodingFormat } from '../types.js';
import { CodecError } from '../errors.js';
import { NodeIdType, encodeBinary as encodeNodeIdBinary, decodeBinary as decodeNodeIdBinary } from './nodeid.js';
import { ExpandedNodeId } from '../../types/src/index.js';

export { ExpandedNodeId };

/**
 * ExpandedNodeId encoding mask bits per OPC 10000-6 Table 20
 */
const enum ExpandedNodeIdMask {
  ServerIndexFlag = 0x40,    // Bit 6: ServerIndex is present
  NamespaceUriFlag = 0x80    // Bit 7: NamespaceUri is present
}

/**
 * Encode an ExpandedNodeId in Binary format.
 * 
 * Encoding format:
 * 1. NodeId encoding byte (with bits 6-7 modified for flags)
 * 2. NodeId data (namespace, identifier)
 * 3. Optional NamespaceUri (String) if bit 7 is set
 * 4. Optional ServerIndex (UInt32) if bit 6 is set
 * 
 * @param encoder The binary encoder
 * @param value The ExpandedNodeId to encode
 * 
 * @see OPC 10000-6 Table 20 - ExpandedNodeId encoding
 */
export function encodeBinary(encoder: IEncoder, value: ExpandedNodeId): void {
  // Encode the NodeId part (value extends NodeId so can be passed directly)
  // We need to capture the encoding byte and modify it with flags
  const startPos = encoder.getPosition();
  
  encodeNodeIdBinary(encoder, value);
  
  // Get the encoded NodeId buffer
  const encodingBytePos = startPos;
  const nodeIdBuffer = encoder.getBuffer();
  let encodingByte = nodeIdBuffer[encodingBytePos];
  
  // Add flags to encoding byte
  if (value.namespaceUri !== undefined) {
    encodingByte |= ExpandedNodeIdMask.NamespaceUriFlag;
  }
  if (value.serverIndex !== undefined) {
    encodingByte |= ExpandedNodeIdMask.ServerIndexFlag;
  }
  
  // Update the encoding byte with flags
  const buffer = encoder.getBuffer();
  buffer[encodingBytePos] = encodingByte;
  
  // Encode optional NamespaceUri
  if (value.namespaceUri !== undefined) {
    encoder.writeString(value.namespaceUri);
  }
  
  // Encode optional ServerIndex
  if (value.serverIndex !== undefined) {
    encoder.writeUInt32(value.serverIndex);
  }
}

/**
 * Decode an ExpandedNodeId from Binary format.
 * 
 * @param decoder The binary decoder
 * @returns The decoded ExpandedNodeId
 * 
 * @see OPC 10000-6 Table 20 - ExpandedNodeId encoding
 */
export function decodeBinary(decoder: IDecoder): ExpandedNodeId {
  // Peek at the encoding byte to check flags
  const startPos = decoder.getPosition();
  const encodingByte = decoder.getBuffer()[startPos];
  
  // Check flags
  const hasNamespaceUri = (encodingByte & ExpandedNodeIdMask.NamespaceUriFlag) !== 0;
  const hasServerIndex = (encodingByte & ExpandedNodeIdMask.ServerIndexFlag) !== 0;
  
  // Decode NodeId (with mask to strip the ExpandedNodeId flag bits)
  const nodeId = decodeNodeIdBinary(decoder, ExpandedNodeIdMask.ServerIndexFlag | ExpandedNodeIdMask.NamespaceUriFlag);
  
  // Decode optional NamespaceUri
  let namespaceUri: string | undefined = undefined;
  if (hasNamespaceUri) {
    const uri = decoder.readString();
    if (uri === null) {
      throw new CodecError('ExpandedNodeId NamespaceUri cannot be null when flag is set');
    }
    namespaceUri = uri;
  }
  
  // Decode optional ServerIndex
  let serverIndex: number | undefined = undefined;
  if (hasServerIndex) {
    serverIndex = decoder.readUInt32();
  }
  
  return new ExpandedNodeId(nodeId.namespace, nodeId.identifier, namespaceUri, serverIndex);
}

/**
 * Register ExpandedNodeId type with CodecFacade.
 */
export function registerExpandedNodeId(facade: CodecFacade): void {
  facade.registerType('ExpandedNodeId', 'i=18', EncodingFormat.Binary, encodeBinary, decodeBinary);
}

/**
 * Helper function to create an ExpandedNodeId from a NodeId.
 * 
 * @param nodeId - The base NodeId
 * @param namespaceUri - Optional namespace URI
 * @param serverIndex - Optional server index
 */
export function expandedNodeId(
  nodeId: import('./nodeid.js').NodeId,
  namespaceUri?: string | null,
  serverIndex?: number | null
): ExpandedNodeId;

/**
 * Helper function to create an ExpandedNodeId from components.
 * 
 * @param namespace - The namespace index
 * @param identifier - The identifier  
 * @param namespaceUri - Optional namespace URI
 * @param serverIndex - Optional server index
 */
export function expandedNodeId(
  namespace: number,
  identifier: number | string | Uint8Array,
  namespaceUri?: string | null,
  serverIndex?: number | null
): ExpandedNodeId;

/**
 * Implementation
 */
export function expandedNodeId(
  namespaceOrNodeId: number | import('./nodeid.js').NodeId,
  identifierOrNamespaceUri?: number | string | Uint8Array | null,
  namespaceUriOrServerIndex?: string | number | null,
  serverIndex?: number | null
): ExpandedNodeId {
  // Check if first parameter is a NodeId (has namespace property)
  if (typeof namespaceOrNodeId === 'object' && 'namespace' in namespaceOrNodeId) {
    // First signature: expandedNodeId(nodeId, namespaceUri, serverIndex)
    const nodeId = namespaceOrNodeId;
    return new ExpandedNodeId(
      nodeId.namespace,
      nodeId.identifier,
      (identifierOrNamespaceUri as string | null) || undefined,
      (namespaceUriOrServerIndex as number | null) || undefined
    );
  } else {
    // Second signature: expandedNodeId(namespace, identifier, namespaceUri, serverIndex)
    return new ExpandedNodeId(
      namespaceOrNodeId as number,
      identifierOrNamespaceUri as number | string | Uint8Array,
      (namespaceUriOrServerIndex as string | null) || undefined,
      serverIndex || undefined
    );
  }
}
