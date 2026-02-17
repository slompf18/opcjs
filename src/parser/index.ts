/**
 * NodeSet Parser - Extract OPC UA types from NodeSet2 XML
 * 
 * This parser is designed to be browser-compatible and does not use Node.js filesystem APIs.
 * It parses XML strings and produces a data model that can be consumed by code generators.
 * 
 * @packageDocumentation
 */

// Export data model types
export * from './types/DataModel.js';

// Export parser functions
export { parseNodeSet } from './parser.js';

// Export utility functions
export { isBuiltinType } from './BuiltinTypes.js';

