/**
 * Structure Parser - Extract struct fields from UADataType
 * 
 * This module extracts structure Field elements with Name, DataType, and ValueRank attributes.
 * 
 * @packageDocumentation
 */

import { StructField } from './types/DataModel.js';
import { UADataType, normalizeToArray } from './XmlParser.js';

/**
 * Default ValueRank for scalar values
 */
const DEFAULT_VALUE_RANK = -1;

/**
 * Extract structure fields from a UADataType Definition
 * 
 * @param type - The UADataType element from XML
 * @returns Array of struct fields with name, dataType, and valueRank
 */
export function extractStructFields(type: UADataType): StructField[] {
  if (!type.Definition?.Field) {
    return [];
  }
  
  const fields = normalizeToArray(type.Definition.Field);
  const structFields: StructField[] = [];
  
  for (const field of fields) {
    const name = field['@_Name'];
    const dataType = field['@_DataType'];
    const valueRankStr = field['@_ValueRank'];
    
    if (!name) {
      throw new Error(`Struct field missing Name attribute in type ${type['@_BrowseName']}`);
    }
    
    // Phase 1: Skip fields without DataType (will be handled in Phase 2)
    if (!dataType) {
      continue; // Skip fields without explicit DataType for now
    }
    
    let valueRank = DEFAULT_VALUE_RANK;
    if (valueRankStr !== undefined) {
      valueRank = parseInt(valueRankStr, 10);
      if (isNaN(valueRank)) {
        throw new Error(`Invalid ValueRank "${valueRankStr}" for field ${name} in type ${type['@_BrowseName']}`);
      }
    }
    
    structFields.push({ name, dataType, valueRank });
  }
  
  return structFields;
}
