/**
 * NodeSet Parser – public entry point
 *
 * Re-exports the top-level {@link parseNodeSet} function and the shared
 * data-model types so consumers only need a single import path.
 *
 * @module parser
 */

export { parseNodeSet } from './NodeSetParser.js';
export { parseNodeIdsCsv } from './NodeIdsCsvParser.js';
export type { NodeIdsMap, TypeNodeIds } from './NodeIdsCsvParser.js';
export type { ParsedDataModel, ParsedType, ParsedField, ParsedEnumMember } from './types/DataModel.js';
