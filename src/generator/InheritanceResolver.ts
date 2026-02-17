/**
 * Inheritance Resolver - Map parent NodeIds to type names
 * 
 * Builds a lookup map from NodeId to ParsedType to enable
 * resolving parent type names for extends clauses.
 * Also provides topological sorting to ensure parents are declared before children.
 * 
 * @packageDocumentation
 */

import { ParsedType } from '../parser/types/DataModel.js';

/**
 * Build a map from NodeId to ParsedType
 * 
 * @param types - Array of parsed types
 * @returns Map of NodeId to ParsedType
 */
export function buildTypeMap(types: ParsedType[]): Map<string, ParsedType> {
  const typeMap = new Map<string, ParsedType>();
  
  for (const type of types) {
    typeMap.set(type.nodeId, type);
  }
  
  return typeMap;
}

/**
 * Resolve parent type name from parentNodeId
 * 
 * @param parentNodeId - The NodeId of the parent type
 * @param typeMap - Map of NodeId to ParsedType
 * @returns The safe name of the parent type, or undefined if not found
 */
export function resolveParentTypeName(
  parentNodeId: string | undefined,
  typeMap: Map<string, ParsedType>
): string | undefined {
  if (!parentNodeId) {
    return undefined;
  }
  
  // Special cases: base types
  if (parentNodeId === 'i=22') {
    return 'Structure'; // Base structure type
  }
  
  if (parentNodeId === 'i=29') {
    return undefined; // Enumerations don't need extends clause
  }
  
  // Look up in type map
  const parentType = typeMap.get(parentNodeId);
  if (parentType) {
    return parentType.safeName;
  }
  
  // Parent not found (might be builtin or from another namespace)
  return undefined;
}

/**
 * Resolve parent type names for all types
 * 
 * @param types - Array of parsed types
 * @returns Map of type NodeId to parent type name
 */
export function resolveAllParents(types: ParsedType[]): Map<string, string | undefined> {
  const typeMap = buildTypeMap(types);
  const parentMap = new Map<string, string | undefined>();
  
  for (const type of types) {
    const parentName = resolveParentTypeName(type.parentNodeId, typeMap);
    parentMap.set(type.nodeId, parentName);
  }
  
  return parentMap;
}

/**
 * Sort types in topological order (parents before children)
 * 
 * This ensures that when generating code, parent classes are declared
 * before their derived classes, avoiding "used before declaration" errors.
 * 
 * @param types - Array of parsed types
 * @returns Sorted array with parents before children
 */
export function sortByInheritance(types: ParsedType[]): ParsedType[] {
  const typeMap = buildTypeMap(types);
  const visited = new Set<string>();
  const sorted: ParsedType[] = [];
  
  // DFS to visit dependencies (parents) first
  function visit(type: ParsedType): void {
    if (visited.has(type.nodeId)) {
      return; // Already processed
    }
    
    visited.add(type.nodeId);
    
    // Visit parent first (if it exists in our type set)
    if (type.parentNodeId) {
      const parent = typeMap.get(type.parentNodeId);
      if (parent && !visited.has(parent.nodeId)) {
        visit(parent);
      }
    }
    
    // Add this type after its parent
    sorted.push(type);
  }
  
  // Visit all types
  for (const type of types) {
    visit(type);
  }
  
  return sorted;
}
