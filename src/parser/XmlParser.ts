/**
 * XML Parser - Browser-compatible NodeSet2 XML parsing
 * 
 * This module uses fast-xml-parser to parse OPC UA NodeSet2 XML files.
 * It is designed to work in both browser and Node.js environments.
 * 
 * @packageDocumentation
 */

import { XMLParser, X2jOptions } from 'fast-xml-parser';

/**
 * Parsed XML structure matching NodeSet2 schema
 */
export interface ParsedXML {
  UANodeSet?: {
    UADataType?: UADataType | UADataType[];
    [key: string]: unknown;
  };
}

/**
 * UADataType element from NodeSet2 XML
 */
export interface UADataType {
  '@_NodeId': string;
  '@_BrowseName': string;
  '@_IsAbstract'?: string;
  '@_SymbolicName'?: string;
  DisplayName?: string;
  Documentation?: string;
  References?: {
    Reference?: Reference | Reference[];
  };
  Definition?: {
    '@_Name': string;
    Field?: Field | Field[];
  };
}

/**
 * Reference element from UADataType
 */
export interface Reference {
  '@_ReferenceType': string;
  '@_IsForward'?: string;
  '#text': string;
}

/**
 * Field element from Definition
 */
export interface Field {
  '@_Name': string;
  '@_Value'?: string;
  '@_DataType'?: string;
  '@_ValueRank'?: string;
}

/**
 * Parser options for fast-xml-parser
 */
const PARSER_OPTIONS: Partial<X2jOptions> = {
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  textNodeName: '#text',
  parseAttributeValue: false, // Keep as strings to avoid number type issues
  trimValues: true,
  parseTagValue: false,
};

/**
 * Parse NodeSet2 XML string into structured object
 * 
 * @param xmlContent - The XML content as a string
 * @returns Parsed XML object with type information
 * @throws Error if XML is malformed or invalid
 */
export function parseNodeSetXml(xmlContent: string): ParsedXML {
  if (!xmlContent || xmlContent.trim().length === 0) {
    throw new Error('XML content is empty');
  }

  const parser = new XMLParser(PARSER_OPTIONS);
  
  try {
    const parsed = parser.parse(xmlContent) as ParsedXML;
    
    if (!parsed.UANodeSet) {
      throw new Error('Invalid NodeSet2 XML: Missing UANodeSet root element');
    }
    
    return parsed;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to parse XML: ${error.message}`);
    }
    throw new Error('Failed to parse XML: Unknown error');
  }
}

/**
 * Normalize array-or-single-item to always be an array
 * XML parser returns single items as objects, multiple as arrays
 * 
 * @param item - Item that could be T or T[]
 * @returns Always an array of T
 */
export function normalizeToArray<T>(item: T | T[] | undefined): T[] {
  if (item === undefined) {
    return [];
  }
  return Array.isArray(item) ? item : [item];
}
