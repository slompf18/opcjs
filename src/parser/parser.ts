/**
 * Main Parser - Orchestrate NodeSet parsing
 * 
 * This is the main entry point for parsing NodeSet2 XML files.
 * It coordinates all parsing steps and produces the final data model.
 * 
 * @packageDocumentation
 */

import { ParsedDataModel, ParserMetadata } from './types/DataModel.js';
import { parseNodeSetXml, normalizeToArray } from './XmlParser.js';
import { extractAllTypes } from './TypeExtractor.js';

/**
 * Parser version (semver)
 */
const PARSER_VERSION = '0.1.0';

/**
 * Parse OPC UA NodeSet2 XML into a data model
 * 
 * This is the main parser function that orchestrates all parsing steps:
 * 1. Parse XML string into structured object
 * 2. Extract UADataType elements
 * 3. Classify types (enumeration vs structure)
 * 4. Extract enum members or struct fields
 * 5. Filter builtins
 * 6. Build final data model
 * 
 * @param xmlContent - The NodeSet2 XML content as a string
 * @returns The parsed data model ready for code generation
 * @throws Error if parsing fails or XML is invalid
 * 
 * @example
 * ```typescript
 * import { parseNodeSet } from '@opcua/parser';
 * 
 * const xml = await fetch('Opc.Ua.NodeSet2.Services.xml').then(r => r.text());
 * const dataModel = parseNodeSet(xml);
 * 
 * console.log(`Parsed ${dataModel.types.length} types`);
 * ```
 */
export function parseNodeSet(xmlContent: string): ParsedDataModel {
  // Step 1: Parse XML
  const parsed = parseNodeSetXml(xmlContent);
  
  // Step 2: Extract UADataType elements
  if (!parsed.UANodeSet?.UADataType) {
    throw new Error('No UADataType elements found in NodeSet');
  }
  
  const uaDataTypes = normalizeToArray(parsed.UANodeSet.UADataType);
  
  if (uaDataTypes.length === 0) {
    throw new Error('NodeSet contains no UADataType elements');
  }
  
  // Step 3-5: Extract, classify, and parse all types
  const allTypes = extractAllTypes(uaDataTypes);
  
  // Step 6: Filter out builtin types (keep them in the model but flag them)
  // This allows generators to see the full type hierarchy if needed
  const nonBuiltinTypes = allTypes.filter(type => !type.isBuiltin);
  
  // Build metadata
  const metadata: ParserMetadata = {
    parserVersion: PARSER_VERSION,
    parseTimestamp: new Date().toISOString(),
    // TODO Phase 5: Extract NodeSet URI and version from XML attributes
  };
  
  // Return complete data model
  return {
    types: nonBuiltinTypes,
    metadata,
  };
}

/**
 * Parse NodeSet with options (future extensibility)
 * 
 * @param xmlContent - The NodeSet2 XML content
 * @param options - Parsing options
 * @returns The parsed data model
 */
export interface ParseOptions {
  /** Include builtin types in output (default: false) */
  includeBuiltins?: boolean;
  /** Include abstract types in output (default: true) */
  includeAbstract?: boolean;
}

/**
 * Parse NodeSet with custom options
 * 
 * @param xmlContent - The NodeSet2 XML content as a string
 * @param options - Parsing options
 * @returns The parsed data model
 */
export function parseNodeSetWithOptions(
  xmlContent: string,
  options: ParseOptions = {}
): ParsedDataModel {
  const parsed = parseNodeSetXml(xmlContent);
  
  if (!parsed.UANodeSet?.UADataType) {
    throw new Error('No UADataType elements found in NodeSet');
  }
  
  const uaDataTypes = normalizeToArray(parsed.UANodeSet.UADataType);
  const allTypes = extractAllTypes(uaDataTypes);
  
  // Apply filters based on options
  let filteredTypes = allTypes;
  
  if (!options.includeBuiltins) {
    filteredTypes = filteredTypes.filter(type => !type.isBuiltin);
  }
  
  if (!options.includeAbstract) {
    filteredTypes = filteredTypes.filter(type => !type.isAbstract);
  }
  
  const metadata: ParserMetadata = {
    parserVersion: PARSER_VERSION,
    parseTimestamp: new Date().toISOString(),
  };
  
  return {
    types: filteredTypes,
    metadata,
  };
}
