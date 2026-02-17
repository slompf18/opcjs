/**
 * Data Model for NodeSet Parser Output
 * 
 * This file defines TypeScript interfaces for the intermediate representation
 * produced by the NodeSet parser. These interfaces are consumed by code generators
 * to produce language-specific type definitions.
 * 
 * Architecture: Parser → DataModel → Generator
 * 
 * @packageDocumentation
 */

/**
 * Complete parsed representation of a NodeSet2 XML file
 */
export interface ParsedDataModel {
  /** All parsed types (enumerations and structures) */
  types: ParsedType[];
  
  /** Metadata about the parsing operation */
  metadata: ParserMetadata;
}

/**
 * Metadata about the parser and parsing operation
 */
export interface ParserMetadata {
  /** Parser version (semver) for compatibility checking */
  parserVersion: string;
  
  /** ISO 8601 timestamp when parsing occurred */
  parseTimestamp: string;
  
  /** Optional: NodeSet URI from XML */
  nodeSetUri?: string;
  
  /** Optional: NodeSet version from XML */
  nodeSetVersion?: string;
}

/**
 * Represents a single OPC UA data type (enumeration or structure)
 */
export interface ParsedType {
  /** Original BrowseName attribute from XML */
  browseName: string;
  
  /** Safe identifier for code generation (SymbolicName or converted BrowseName) */
  safeName: string;
  
  /** NodeId in string format (e.g., "i=308") */
  nodeId: string;
  
  /** Numeric portion of NodeId from CSV lookup (e.g., 308) */
  numericId?: number;
  
  /** Type category determines generation strategy */
  category: TypeCategory;
  
  /** True if this is a builtin type (should be excluded from generation) */
  isBuiltin: boolean;
  
  /** True if IsAbstract="true" in XML */
  isAbstract: boolean;
  
  /** Parent type's NodeId for inheritance (e.g., "i=22" for structures) */
  parentNodeId?: string;
  
  /** Enum member definitions (only for category='enumeration') */
  enumMembers?: EnumMember[];
  
  /** Structure field definitions (only for category='structure') */
  structFields?: StructField[];
}

/**
 * Type category determines how the type is generated
 */
export type TypeCategory = 'enumeration' | 'structure' | 'abstract';

/**
 * Enumeration member definition from Field element
 */
export interface EnumMember {
  /** Field Name attribute */
  name: string;
  
  /** Field Value attribute (integer) */
  value: number;
}

/**
 * Structure field definition from Field element
 */
export interface StructField {
  /** Field Name attribute */
  name: string;
  
  /** Field DataType attribute (NodeId, e.g., "i=12" for String) */
  dataType: string;
  
  /** Field ValueRank attribute for cardinality
   * -1 (or absent): scalar
   * 1: one-dimensional array
   * 2+: multi-dimensional array
   * 0: one or more dimensions
   * -2: any (scalar or array)
   * -3: scalar or one-dimensional
   */
  valueRank: number;
}
