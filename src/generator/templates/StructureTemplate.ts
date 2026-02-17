/**
 * Structure Template - Generate TypeScript class
 * 
 * Generates TypeScript class declarations from ParsedType data.
 * Includes inheritance using extends keyword and getId() method.
 * 
 * @packageDocumentation
 */

import { ParsedType } from '../../parser/types/DataModel.js';

/**
 * Generate TypeScript class code
 * 
 * @param type - The parsed structure or abstract type
 * @param parentTypeName - Optional parent type name for extends clause
 * @returns TypeScript class source code
 */
export function generateStructure(type: ParsedType, parentTypeName?: string): string {
  if (type.category !== 'structure' && type.category !== 'abstract') {
    throw new Error(`Cannot generate structure for type ${type.browseName} with category ${type.category}`);
  }

  // Extract numeric ID from nodeId (format: "i=308")
  const numericId = extractNumericId(type.nodeId);
  
  // Determine parent class (default to Structure if no parent specified)
  const extendsClause = parentTypeName || 'Structure';
  
  // Generate optional parent info in JSDoc
  const parentInfo = parentTypeName ? `\n * Extends: ${parentTypeName}` : '';

  // Use template literal for code generation (per research-ts.md R4)
  return `/**
 * ${type.browseName}
 * NodeId: ${type.nodeId || 'unknown'}${parentInfo}
 */
export class ${type.safeName} extends ${extendsClause} {
  getId(): number {
    return ${numericId};
  }
}`;
}

/**
 * Extract numeric ID from NodeId string
 * 
 * @param nodeId - NodeId string (e.g., "i=308")
 * @returns Numeric ID
 */
function extractNumericId(nodeId?: string): number {
  if (!nodeId) {
    return 0; // Default fallback
  }
  
  // Handle format "i=308"
  if (nodeId.startsWith('i=')) {
    const id = parseInt(nodeId.substring(2), 10);
    if (!isNaN(id)) {
      return id;
    }
  }
  
  // Fallback: try to parse as number
  const parsed = parseInt(nodeId, 10);
  return isNaN(parsed) ? 0 : parsed;
}
