/**
 * Enumeration Parser - Extract enum members from UADataType
 * 
 * This module extracts enumeration Field elements with Name and Value attributes.
 * 
 * @packageDocumentation
 */

import { EnumMember } from './types/DataModel.js';
import { UADataType, normalizeToArray } from './XmlParser.js';

/**
 * Extract enumeration members from a UADataType Definition
 * 
 * @param type - The UADataType element from XML
 * @returns Array of enum members with name and value
 */
export function extractEnumMembers(type: UADataType): EnumMember[] {
  if (!type.Definition?.Field) {
    return [];
  }
  
  const fields = normalizeToArray(type.Definition.Field);
  const members: EnumMember[] = [];
  
  for (const field of fields) {
    const name = field['@_Name'];
    const valueStr = field['@_Value'];
    
    if (!name) {
      throw new Error(`Enum field missing Name attribute in type ${type['@_BrowseName']}`);
    }
    
    if (valueStr === undefined) {
      throw new Error(`Enum field ${name} missing Value attribute in type ${type['@_BrowseName']}`);
    }
    
    const value = parseInt(valueStr, 10);
    
    if (isNaN(value)) {
      throw new Error(`Invalid Value "${valueStr}" for enum field ${name} in type ${type['@_BrowseName']}`);
    }
    
    members.push({ name, value });
  }
  
  return members;
}
