/**
 * OPC UA Builtin Types Catalog Loader
 * 
 * Provides runtime access to the OPC UA builtin types catalog,
 * enabling type resolution and mapping for code generation.
 * 
 * @module catalog
 */

import catalogData from '../data/builtin-types-catalog.json';

/**
 * Encoding information for a builtin type
 */
export interface EncodingInfo {
  fixedSize: boolean;
  sizeBytes?: number;
}

/**
 * Represents a single OPC UA builtin type
 */
export interface BuiltinType {
  opcUaName: string;
  nodeId: string;
  numericId: number;
  category: 'primitive' | 'complex' | 'special';
  description: string;
  typescriptType: string;
  encoding: EncodingInfo;
}

/**
 * The complete builtin types catalog
 */
export interface BuiltinTypesCatalog {
  version: string;
  opcUaVersion: string;
  description: string;
  builtinTypes: BuiltinType[];
}

// Load the catalog at module initialization
const catalog: BuiltinTypesCatalog = catalogData as unknown as BuiltinTypesCatalog;

/**
 * Get a builtin type by its numeric NodeId
 * 
 * @param numericId - The numeric identifier (e.g., 1 for Boolean)
 * @returns The builtin type definition, or undefined if not found
 * 
 * @example
 * ```typescript
 * const boolType = getByNodeId(1);
 * console.log(boolType?.opcUaName); // "Boolean"
 * console.log(boolType?.typescriptType); // "boolean"
 * ```
 */
export function getByNodeId(numericId: number): BuiltinType | undefined {
  return catalog.builtinTypes.find(t => t.numericId === numericId);
}

/**
 * Get a builtin type by its OPC UA name
 * 
 * @param name - The OPC UA type name (e.g., "Boolean", "Int32")
 * @returns The builtin type definition, or undefined if not found
 * 
 * @example
 * ```typescript
 * const int32Type = getByName("Int32");
 * console.log(int32Type?.numericId); // 6
 * ```
 */
export function getByName(name: string): BuiltinType | undefined {
  return catalog.builtinTypes.find(t => t.opcUaName === name);
}

/**
 * Get all primitive types
 * 
 * @returns Array of primitive builtin types
 */
export function getPrimitives(): BuiltinType[] {
  return catalog.builtinTypes.filter(t => t.category === 'primitive');
}

/**
 * Get all complex types
 * 
 * @returns Array of complex builtin types
 */
export function getComplexTypes(): BuiltinType[] {
  return catalog.builtinTypes.filter(t => t.category === 'complex');
}

/**
 * Get all builtin types
 * 
 * @returns Array of all builtin types
 */
export function getAllTypes(): BuiltinType[] {
  return catalog.builtinTypes;
}

/**
 * Validate that the catalog contains all 25 OPC UA builtin types
 * 
 * @returns true if all 25 types are present with consecutive IDs 1-25
 * @throws Error if validation fails
 */
export function validateCatalog(): boolean {
  const expectedCount = 25;
  
  if (catalog.builtinTypes.length !== expectedCount) {
    throw new Error(
      `Invalid catalog: expected ${expectedCount} types, found ${catalog.builtinTypes.length}`
    );
  }
  
  // Check for consecutive IDs from 1 to 25
  for (let i = 1; i <= expectedCount; i++) {
    const type = getByNodeId(i);
    if (!type) {
      throw new Error(`Invalid catalog: missing type with numericId ${i}`);
    }
  }
  
  return true;
}

// Export the catalog itself for advanced use cases
export { catalog };
