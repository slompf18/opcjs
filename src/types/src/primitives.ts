/**
 * OPC UA Primitive Type Mappings
 * 
 * Defines TypeScript type mappings for OPC UA primitive types.
 * Primitives map directly to native TypeScript types without wrapper classes.
 * 
 * @module primitives
 */

/**
 * OPC UA Builtin Type Numeric IDs
 * 
 * These correspond to the NodeId numeric identifiers defined in OPC UA Part 6, Table 1.
 */
export const BuiltinTypeId = {
  Boolean: 1,
  SByte: 2,
  Byte: 3,
  Int16: 4,
  UInt16: 5,
  Int32: 6,
  UInt32: 7,
  Int64: 8,
  UInt64: 9,
  Float: 10,
  Double: 11,
  String: 12,
  DateTime: 13,
  Guid: 14,
  ByteString: 15,
  XmlElement: 16,
  NodeId: 17,
  ExpandedNodeId: 18,
  StatusCode: 19,
  QualifiedName: 20,
  LocalizedText: 21,
  ExtensionObject: 22,
  DataValue: 23,
  Variant: 24,
  DiagnosticInfo: 25,
} as const;

/**
 * Type representing any builtin type ID
 */
export type BuiltinTypeIdValue = typeof BuiltinTypeId[keyof typeof BuiltinTypeId];

/**
 * Primitive type mappings: OPC UA type → TypeScript type
 * 
 * Primitives use native TypeScript types directly:
 * - Boolean → boolean
 * - All numeric types → number (TypeScript doesn't distinguish integer types)
 * - String → string
 * - DateTime → Date
 * - Guid → string (UUID format)
 */
export type PrimitiveTypeMap = {
  [BuiltinTypeId.Boolean]: boolean;
  [BuiltinTypeId.SByte]: number;
  [BuiltinTypeId.Byte]: number;
  [BuiltinTypeId.Int16]: number;
  [BuiltinTypeId.UInt16]: number;
  [BuiltinTypeId.Int32]: number;
  [BuiltinTypeId.UInt32]: number;
  [BuiltinTypeId.Int64]: bigint;
  [BuiltinTypeId.UInt64]: bigint;
  [BuiltinTypeId.Float]: number;
  [BuiltinTypeId.Double]: number;
  [BuiltinTypeId.String]: string;
  [BuiltinTypeId.DateTime]: Date;
  [BuiltinTypeId.Guid]: string;
};

/**
 * Get the TypeScript type name for a primitive builtin type
 * 
 * @param typeId - The numeric builtin type ID
 * @returns The TypeScript type name as a string, or undefined if not a primitive
 * 
 * @example
 * ```typescript
 * getPrimitiveTypeName(1);  // "boolean"
 * getPrimitiveTypeName(6); // "number"
 * getPrimitiveTypeName(12); // "string"
 * getPrimitiveTypeName(17); // undefined (NodeId is complex, not primitive)
 * ```
 */
export function getPrimitiveTypeName(typeId: number): string | undefined {
  const primitiveMap: Record<number, string> = {
    [BuiltinTypeId.Boolean]: 'boolean',
    [BuiltinTypeId.SByte]: 'number',
    [BuiltinTypeId.Byte]: 'number',
    [BuiltinTypeId.Int16]: 'number',
    [BuiltinTypeId.UInt16]: 'number',
    [BuiltinTypeId.Int32]: 'number',
    [BuiltinTypeId.UInt32]: 'number',
    [BuiltinTypeId.Int64]: 'bigint',
    [BuiltinTypeId.UInt64]: 'bigint',
    [BuiltinTypeId.Float]: 'number',
    [BuiltinTypeId.Double]: 'number',
    [BuiltinTypeId.String]: 'string',
    [BuiltinTypeId.DateTime]: 'Date',
    [BuiltinTypeId.Guid]: 'string',
  };
  
  return primitiveMap[typeId];
}

/**
 * Check if a builtin type ID represents a primitive type
 * 
 * @param typeId - The numeric builtin type ID
 * @returns true if the type is primitive, false otherwise
 * 
 * @example
 * ```typescript
 * isPrimitive(1);  // true (Boolean)
 * isPrimitive(17); // false (NodeId is complex)
 * ```
 */
export function isPrimitive(typeId: number): boolean {
  return getPrimitiveTypeName(typeId) !== undefined;
}

/**
 * OPC UA type names
 */
export const OpcUaTypeName = {
  Boolean: 'Boolean',
  SByte: 'SByte',
  Byte: 'Byte',
  Int16: 'Int16',
  UInt16: 'UInt16',
  Int32: 'Int32',
  UInt32: 'UInt32',
  Int64: 'Int64',
  UInt64: 'UInt64',
  Float: 'Float',
  Double: 'Double',
  String: 'String',
  DateTime: 'DateTime',
  Guid: 'Guid',
  ByteString: 'ByteString',
  XmlElement: 'XmlElement',
  NodeId: 'NodeId',
  ExpandedNodeId: 'ExpandedNodeId',
  StatusCode: 'StatusCode',
  QualifiedName: 'QualifiedName',
  LocalizedText: 'LocalizedText',
  ExtensionObject: 'ExtensionObject',
  DataValue: 'DataValue',
  Variant: 'Variant',
  DiagnosticInfo: 'DiagnosticInfo',
} as const;
