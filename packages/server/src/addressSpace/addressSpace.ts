import {
  type NodeId,
  DataValue,
  StatusCode,
  Variant,
  QualifiedName,
  LocalizedText,
  NodeId as NodeIdClass,
} from 'opcjs-base'
import type { IAddressSpace } from './iAddressSpace.js'
import { ObjectNode, VariableNode } from './node.js'

// Authoritative server identity strings used in standard address-space nodes.
const SERVER_URI = 'urn:opcjs-server:default-instance'
const OPCUA_NAMESPACE_URI = 'http://opcfoundation.org/UA/'
const SERVER_NAMESPACE_URI = 'urn:opcjs-server:default-namespace'

/**
 * Minimal in-memory address space.
 *
 * Nodes are stored in a `Map<string, ObjectNode | VariableNode>` keyed by
 * `NodeId.toString()`.  The four standard server nodes required by OPC UA
 * Part 5 are pre-populated at construction time.
 */
export class AddressSpace implements IAddressSpace {
  private readonly nodes = new Map<string, ObjectNode | VariableNode>()

  constructor() {
    this.populateServerNodes()
  }

  /**
   * Read a single attribute from a node.
   * Returns `BadNodeIdUnknown` when the node does not exist.
   * Returns `BadAttributeIdInvalid` when the attribute is not defined.
   */
  read(nodeId: NodeId, attributeId: number): DataValue {
    const node = this.nodes.get(nodeId.toString())
    if (node === undefined) {
      return new DataValue(undefined, StatusCode.BadNodeIdUnknown)
    }
    return node.read(attributeId)
  }

  /**
   * Add an Object node to the address space.
   * @returns The created node
   */
  addObject(nodeId: NodeId, browseName: string, displayName?: string): ObjectNode {
    const qn = new QualifiedName(nodeId.namespace, browseName)
    const lt = new LocalizedText(undefined, displayName ?? browseName)
    const node = new ObjectNode(nodeId, qn, lt)
    this.nodes.set(nodeId.toString(), node)
    return node
  }

  /**
   * Add a Variable node to the address space.
   * @param dataTypeId - NodeId of the data type (e.g. `NodeId.newNumeric(0, 12)` for String)
   * @param value - Initial variant value
   * @param valueRank - -1 = scalar, 1 = 1-D array
   * @returns The created node
   */
  addVariable(
    nodeId: NodeId,
    browseName: string,
    dataTypeId: NodeId,
    value: Variant,
    valueRank: number = -1,
    displayName?: string,
  ): VariableNode {
    const qn = new QualifiedName(nodeId.namespace, browseName)
    const lt = new LocalizedText(undefined, displayName ?? browseName)
    const node = new VariableNode(nodeId, qn, lt, dataTypeId, value, valueRank)
    this.nodes.set(nodeId.toString(), node)
    return node
  }

  // ---------------------------------------------------------------------------
  // Standard OPC UA server nodes (OPC UA Part 5 §8)
  // ---------------------------------------------------------------------------

  private populateServerNodes(): void {
    // ns=0;i=2253   Server  (Object)
    this.addObject(NodeIdClass.newNumeric(0, 2253), 'Server', 'Server')

    // ns=0;i=2254   ServerArray  (Variable, String[])
    const stringTypeId = NodeIdClass.newNumeric(0, 12)   // DataType String
    this.addVariable(
      NodeIdClass.newNumeric(0, 2254),
      'ServerArray',
      stringTypeId,
      Variant.newFrom([SERVER_URI]),
      1,
    )

    // ns=0;i=2255   NamespaceArray  (Variable, String[])
    this.addVariable(
      NodeIdClass.newNumeric(0, 2255),
      'NamespaceArray',
      stringTypeId,
      Variant.newFrom([OPCUA_NAMESPACE_URI, SERVER_NAMESPACE_URI]),
      1,
    )

    // ns=0;i=2256   ServerStatus  (Object — simplified representation)
    this.addObject(NodeIdClass.newNumeric(0, 2256), 'ServerStatus', 'ServerStatus')
  }
}
