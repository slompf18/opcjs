/**
 * Type Classifier - Determine type category from inheritance
 * 
 * This module classifies OPC UA types based on their inheritance relationships.
 * Types inherit from either Enumeration (i=29) or Structure (i=22).
 * 
 * @packageDocumentation
 */

import { TypeCategory } from './types/DataModel.js';
import { UADataType, Reference, normalizeToArray } from './XmlParser.js';

/**
 * NodeIds for base OPC UA types
 */
export const BASE_TYPE_NODES = {
  ENUMERATION: 'i=29',
  STRUCTURE: 'i=22',
  BASE_DATA_TYPE: 'i=24',
} as const;

/**
 * Classify a UADataType into enumeration, structure, or abstract
 * 
 * @param type - The UADataType element from XML
 * @returns The type category
 */
export function classifyType(type: UADataType): TypeCategory {
  const parentNodeId = getParentNodeId(type);
  
  if (!parentNodeId) {
    return 'abstract';
  }
  
  // Check direct inheritance
  if (parentNodeId === BASE_TYPE_NODES.ENUMERATION) {
    return 'enumeration';
  }
  
  if (parentNodeId === BASE_TYPE_NODES.STRUCTURE) {
    return 'structure';
  }
  
  // Base types are abstract
  if (parentNodeId === BASE_TYPE_NODES.BASE_DATA_TYPE || !parentNodeId) {
    return 'abstract';
  }
  
  // If we can't determine, default to abstract
  // In Phase 2, we'll add recursive inheritance checking
  return 'abstract';
}

/**
 * Extract parent NodeId from References
 * 
 * Looks for Reference with ReferenceType="HasSubtype" and IsForward="false"
 * This indicates the parent type in the inheritance hierarchy.
 * 
 * @param type - The UADataType element from XML
 * @returns The parent NodeId or undefined
 */
export function getParentNodeId(type: UADataType): string | undefined {
  if (!type.References?.Reference) {
    return undefined;
  }
  
  const references = normalizeToArray(type.References.Reference);
  
  // Find HasSubtype reference with IsForward="false" (or no IsForward attribute)
  const subtypeRef = references.find(ref => {
    return ref['@_ReferenceType'] === 'HasSubtype' && 
           (ref['@_IsForward'] === 'false' || !ref['@_IsForward']);
  });
  
  return subtypeRef?.['#text'];
}

/**
 * Check if a type is abstract
 * 
 * @param type - The UADataType element from XML
 * @returns true if IsAbstract="true"
 */
export function isAbstractType(type: UADataType): boolean {
  return type['@_IsAbstract'] === 'true';
}
