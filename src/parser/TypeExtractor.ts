/**
 * Type Extractor - Convert UADataType XML to ParsedType
 * 
 * This module coordinates parsing of UADataType elements into the
 * intermediate ParsedType data model.
 * 
 * @packageDocumentation
 */

import { ParsedType } from './types/DataModel.js';
import { UADataType } from './XmlParser.js';
import { classifyType, getParentNodeId, isAbstractType } from './TypeClassifier.js';
import { isBuiltinType } from './BuiltinTypes.js';
import { extractEnumMembers } from './EnumParser.js';
import { extractStructFields } from './StructParser.js';

/**
 * Extract and convert a UADataType to a ParsedType
 * 
 * @param type - The UADataType element from XML
 * @returns The parsed type object, or null if it should be excluded
 */
export function extractType(type: UADataType): ParsedType | null {
  const browseName = type['@_BrowseName'];
  
  if (!browseName) {
    throw new Error('UADataType element missing BrowseName attribute');
  }
  
  const nodeId = type['@_NodeId'];
  
  if (!nodeId) {
    throw new Error(`UADataType ${browseName} missing NodeId attribute`);
  }
  
  // Check if this is a builtin type (exclude from generation)
  const isBuiltin = isBuiltinType(browseName);
  
  // Determine the type category
  const category = classifyType(type);
  
  // Get parent NodeId for inheritance
  const parentNodeId = getParentNodeId(type);
  
  // Check if abstract
  const isAbstract = isAbstractType(type);
  
  // Use SymbolicName if present, otherwise use BrowseName
  // TODO Phase 4: Implement numeric name conversion
  const safeName = type['@_SymbolicName'] || browseName;
  
  // Extract members/fields based on category
  let enumMembers: ReturnType<typeof extractEnumMembers> | undefined;
  let structFields: ReturnType<typeof extractStructFields> | undefined;
  
  if (category === 'enumeration') {
    enumMembers = extractEnumMembers(type);
  } else if (category === 'structure') {
    structFields = extractStructFields(type);
  }
  
  const parsedType: ParsedType = {
    browseName,
    safeName,
    nodeId,
    // numericId will be added in Phase 5 (CSV mapping)
    category,
    isBuiltin,
    isAbstract,
    parentNodeId,
    enumMembers,
    structFields,
  };
  
  return parsedType;
}

/**
 * Extract all types from an array of UADataType elements
 * 
 * @param types - Array of UADataType elements from XML
 * @returns Array of parsed types (excluding null results)
 */
export function extractAllTypes(types: UADataType[]): ParsedType[] {
  const parsedTypes: ParsedType[] = [];
  
  for (const type of types) {
    try {
      const parsedType = extractType(type);
      if (parsedType) {
        parsedTypes.push(parsedType);
      }
    } catch (error) {
      const typeName = type['@_BrowseName'] || 'unknown';
      if (error instanceof Error) {
        throw new Error(`Failed to extract type ${typeName}: ${error.message}`);
      }
      throw new Error(`Failed to extract type ${typeName}: Unknown error`);
    }
  }
  
  return parsedTypes;
}
