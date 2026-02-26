/**
 * OPC UA ExpandedNodeId Type
 * 
 * ExpandedNodeId extends NodeId with optional server identification,
 * allowing nodes to be identified across multiple servers.
 * 
 * @module expanded-nodeid
 */

import { NodeId } from './nodeId.js';

/**
 * OPC UA ExpandedNodeId
 * 
 * An ExpandedNodeId extends NodeId with optional server identification,
 * allowing nodes to be identified across multiple servers.
 * 
 * @example
 * ```typescript
 * import { ExpandedNodeId } from '@opcua/types';
 * 
 * const expandedNodeId = new ExpandedNodeId(2, 123, "http://opcfoundation.org/UA/", 1);
 * console.log(expandedNodeId.toString()); 
 * // "svr=1;nsu=http://opcfoundation.org/UA/;ns=2;i=123"
 * ```
 */
export class ExpandedNodeId extends NodeId {
  /**
   * The server index (optional, for cross-server references)
   */
  readonly serverIndex?: number;
  
  /**
   * The namespace URI (optional, alternative to namespace index)
   */
  readonly namespaceUri?: string;

  /**
   * Create a new ExpandedNodeId
   * 
   * @param namespace - The namespace index
   * @param identifier - The identifier
   * @param namespaceUri - Optional namespace URI
   * @param serverIndex - Optional server index
   */
  constructor(
    namespace: number = 0,
    identifier: number | string | Uint8Array = 0,
    namespaceUri?: string,
    serverIndex?: number
  ) {
    super(namespace, identifier);
    this.namespaceUri = namespaceUri;
    this.serverIndex = serverIndex;
  }

  /**
   * Convert ExpandedNodeId to string representation
   * 
   * @returns String representation of the ExpandedNodeId
   */
  override toString(): string {
    let result = '';
    
    if (this.serverIndex !== undefined) {
      result += `svr=${this.serverIndex};`;
    }
    
    if (this.namespaceUri !== undefined) {
      result += `nsu=${this.namespaceUri};`;
    }
    
    result += super.toString();
    
    return result;
  }
}
