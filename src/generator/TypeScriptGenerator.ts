/**
 * TypeScript Code Generator
 * 
 * Generates TypeScript source code from parsed OPC UA data model.
 * Produces const enums for enumerations and interfaces for structures.
 * Generates two separate files: one for enums, one for types.
 * 
 * @packageDocumentation
 */

import { ParsedDataModel, ParsedType } from '../parser/types/DataModel.js';
import { generateEnum } from './templates/EnumTemplate.js';
import { generateStructure } from './templates/StructureTemplate.js';
import { resolveAllParents, sortByInheritance } from './InheritanceResolver.js';

/**
 * Result of TypeScript code generation
 */
export interface GeneratedCode {
  /** TypeScript code for enumerations */
  enums: string;
  /** TypeScript code for structure types */
  types: string;
}

/**
 * Options for TypeScript code generation
 */
export interface GeneratorOptions {
  /** Include abstract types in output (default: false) */
  includeAbstract?: boolean;
  /** Sort types alphabetically within each category (default: true) */
  sortAlphabetically?: boolean;
}

/**
 * Generate TypeScript code from parsed data model
 * Returns separate code for enums and types
 * 
 * @param dataModel - The parsed data model from the parser
 * @param options - Generation options
 * @returns Object with enums and types code
 */
export function generateTypeScript(
  dataModel: ParsedDataModel,
  options: GeneratorOptions = {}
): GeneratedCode {
  const { includeAbstract = false, sortAlphabetically = true } = options;

  // Filter types
  let types = dataModel.types;
  
  if (!includeAbstract) {
    types = types.filter(type => !type.isAbstract);
  }

  // Separate enums and structure types
  const enumTypes = types.filter(t => t.category === 'enumeration');
  const structTypes = types.filter(t => t.category === 'structure' || t.category === 'abstract');

  // Sort enums alphabetically if requested
  if (sortAlphabetically) {
    enumTypes.sort((a, b) => a.browseName.localeCompare(b.browseName));
  }
  
  // Sort structures by inheritance (parents before children) to avoid forward references
  const sortedStructTypes = sortByInheritance(structTypes);

  // Generate enums
  const enumCode: string[] = [];
  for (const type of enumTypes) {
    try {
      enumCode.push(generateEnum(type));
    } catch (error) {
      const typeName = type.browseName || 'unknown';
      if (error instanceof Error) {
        throw new Error(`Failed to generate enum ${typeName}: ${error.message}`);
      }
      throw new Error(`Failed to generate enum ${typeName}: Unknown error`);
    }
  }

  // Generate structure types
  const typeCode: string[] = [];
  
  // Resolve parent type names for inheritance
  const parentMap = resolveAllParents(types);
  
  for (const type of sortedStructTypes) {
    try {
      // Resolve parent type name for extends clause
      const parentName = parentMap.get(type.nodeId);
      typeCode.push(generateStructure(type, parentName));
    } catch (error) {
      const typeName = type.browseName || 'unknown';
      if (error instanceof Error) {
        throw new Error(`Failed to generate type ${typeName}: ${error.message}`);
      }
      throw new Error(`Failed to generate type ${typeName}: Unknown error`);
    }
  }

  return {
    enums: enumCode.join('\n\n'),
    types: typeCode.join('\n\n'),
  };
}
