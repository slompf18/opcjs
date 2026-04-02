import {
  type NodeId,
  DataValue,
  StatusCode,
  Variant,
  QualifiedName,
  LocalizedText,
  NodeClassEnum,
  uaUint32,
  uaByte,
  uaInt32,
  uaDouble,
} from 'opcjs-base'

/**
 * OPC UA Attribute IDs (OPC UA Part 6 §A, Part 4 §7.1).
 */
export const AttributeId = {
  NodeId: 1,
  NodeClass: 2,
  BrowseName: 3,
  DisplayName: 4,
  Description: 5,
  WriteMask: 6,
  UserWriteMask: 7,
  Value: 13,
  DataType: 14,
  ValueRank: 15,
  ArrayDimensions: 16,
  AccessLevel: 17,
  UserAccessLevel: 18,
  MinimumSamplingInterval: 19,
  Historizing: 20,
} as const

/**
 * Base class for every node in the local address space.
 * Attributes are stored in a `Map<attributeId, DataValue>`.
 */
export abstract class OpcUaNode {
  protected readonly attributes = new Map<number, DataValue>()

  constructor(nodeId: NodeId, nodeClass: NodeClassEnum, browseName: QualifiedName, displayName: LocalizedText) {
    this.attributes.set(AttributeId.NodeId, dv(Variant.newFrom(nodeId)))
    this.attributes.set(AttributeId.NodeClass, dv(Variant.newFrom(uaUint32(nodeClass))))
    this.attributes.set(AttributeId.BrowseName, dv(Variant.newFrom(browseName)))
    this.attributes.set(AttributeId.DisplayName, dv(Variant.newFrom(displayName)))
    this.attributes.set(AttributeId.WriteMask, dv(Variant.newFrom(uaUint32(0))))
    this.attributes.set(AttributeId.UserWriteMask, dv(Variant.newFrom(uaUint32(0))))
  }

  /**
   * Read a single attribute. Returns `BadAttributeIdInvalid` when the
   * attribute is not present on this node.
   */
  read(attributeId: number): DataValue {
    return this.attributes.get(attributeId) ?? new DataValue(undefined, StatusCode.BadAttributeIdInvalid)
  }
}

/**
 * An OPC UA Object node.
 */
export class ObjectNode extends OpcUaNode {
  constructor(nodeId: NodeId, browseName: QualifiedName, displayName: LocalizedText) {
    super(nodeId, NodeClassEnum.Object, browseName, displayName)
  }
}

/**
 * An OPC UA Variable node.
 * Holds a live `DataValue` for the Value attribute (id=13).
 */
export class VariableNode extends OpcUaNode {
  constructor(
    nodeId: NodeId,
    browseName: QualifiedName,
    displayName: LocalizedText,
    dataTypeId: NodeId,
    value: Variant,
    valueRank: number = -1,
  ) {
    super(nodeId, NodeClassEnum.Variable, browseName, displayName)
    this.attributes.set(AttributeId.Value, new DataValue(value, StatusCode.Good))
    this.attributes.set(AttributeId.DataType, dv(Variant.newFrom(dataTypeId)))
    this.attributes.set(AttributeId.ValueRank, dv(Variant.newFrom(uaInt32(valueRank))))
    this.attributes.set(AttributeId.AccessLevel, dv(Variant.newFrom(uaByte(1))))
    this.attributes.set(AttributeId.UserAccessLevel, dv(Variant.newFrom(uaByte(1))))
    this.attributes.set(AttributeId.MinimumSamplingInterval, dv(Variant.newFrom(uaDouble(0.0))))
    this.attributes.set(AttributeId.Historizing, dv(Variant.newFrom(false)))
  }

  /**
   * Update the live value of this variable.
   */
  setValue(value: Variant, sourceTimestamp?: Date): void {
    this.attributes.set(
      AttributeId.Value,
      new DataValue(value, StatusCode.Good, sourceTimestamp ?? new Date()),
    )
  }
}

/** Convenience wrapper: Good DataValue for a simple variant. */
function dv(variant: Variant): DataValue {
  return new DataValue(variant, StatusCode.Good)
}
