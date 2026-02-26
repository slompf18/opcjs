/**
 * TypeScript Code Generator
 * 
 * Generates TypeScript source code from parsed OPC UA data model.
 * Produces const enums for enumerations and interfaces for structures.
 * Generates two separate files: one for enums, one for types.
 * 
 * @packageDocumentation
 */

import { ParsedDataModel, ParsedType } from './types/DataModel.js';
import { generateEnum } from './templates/EnumTemplate.js';
import { generateStructure } from './templates/StructureTemplate.js';
import { generateDecoders } from './templates/DecoderTemplate.js';
import { generateEncoders } from './templates/EncoderTemplate.js';
import { generateDecoderRegistrations } from './templates/DecoderRegistrationsTemplate.js';
import { generateEncoderRegistrations } from './templates/EncoderRegistrationsTemplate.js';
import { resolveAllParents, sortByInheritance } from './InheritanceResolver.js';

/**
 * Result of TypeScript code generation
 */
export interface GeneratedCode {
  /** TypeScript code for enumerations */
  enums: string;
  /** TypeScript code for structure types */
  types: string;
  /** Enum type names (safe names) referenced in struct fields – needed as imports */
  enumImports: string[];
  /** Complex base-type names from \`@opcua/base\` referenced in struct fields */
  baseTypeImports: string[];  /** TypeScript code for binary decoder functions */
  decoders: string;
  /** Structure type names that must be imported from types file in decoders.ts */
  decoderTypeImports: string[];
  /** Enum type names that must be imported from enums file in decoders.ts */
  decoderEnumImports: string[];
  /** TypeScript code for binary encoder functions */
  encoders: string;
  /** Structure type names that must be imported from types file in encoders.ts */
  encoderTypeImports: string[];
  /** Enum type names that must be imported from enums file in encoders.ts */
  encoderEnumImports: string[];
  /** TypeScript code for decoder registration functions */
  decoderRegistrations: string;
  /** Decoder function names imported from decoders.ts in decoderRegistrations.ts */
  decoderRegistrationImports: string[];
  /** TypeScript code for encoder registration function */
  encoderRegistrations: string;
  /** Encoder function names imported from encoders.ts in encoderRegistrations.ts */
  encoderRegistrationImports: string[];}

/**
 * Options for TypeScript code generation
 */
export interface GeneratorOptions {
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
  const { sortAlphabetically = true } = options;

  const types = dataModel.types;

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

  // Build a nodeId → TS type name map so field types can reference other parsed types.
  // Seed with built-in aliases first (e.g. SessionAuthenticationToken i=388 → 'NodeId'),
  // then overwrite with emitted type safe names so structure/enum names take precedence.
  // Enum types get the 'Enum' suffix to match the generated enum declaration names.
  const nodeIdToTypeName = new Map<string, string>([
    ...dataModel.builtinAliasToTs,
    ...types.map((t): [string, string] => [
      t.nodeId,
      t.category === 'enumeration' ? `${t.safeName}Enum` : t.safeName,
    ]),
  ]);

  // Build a set of enum nodeIds for import tracking
  const enumNodeIds = new Set<string>(
    types.filter((t) => t.category === 'enumeration').map((t) => t.nodeId)
  );

  // Complex base types from @opcua/base that can appear as field types
  const BASE_COMPLEX_TYPES = new Set([
    'UaString', 'UaByteString',
    'XmlElement', 'NodeId', 'ExpandedNodeId',
    'StatusCode', 'QualifiedName', 'LocalizedText',
    'ExtensionObject', 'DataValue', 'Variant', 'DiagnosticInfo',
  ]);

  const usedEnumNames = new Set<string>();
  const usedBaseTypeNames = new Set<string>();

  for (const type of sortedStructTypes) {
    // Collect imports from fields
    for (const field of type.fields ?? []) {
      const enumName = enumNodeIds.has(field.dataTypeNodeId)
        ? nodeIdToTypeName.get(field.dataTypeNodeId)
        : undefined;
      if (enumName) {
        usedEnumNames.add(enumName);
      } else {
        // Check if it resolves to a base complex type
        const match = /^i=(\d+)$/.exec(field.dataTypeNodeId);
        if (!match) {
          // Non-built-in, non-enum: no special import (defined within types.ts)
        }
        // Base complex types are resolved by BUILTIN_TS_TYPE in the template;
        // we need to collect them here too by checking the numeric id range.
        // ids 15-25 (excl. 22 which maps to ExtensionObject) are complex base types.
        if (match) {
          const n = parseInt(match[1], 10);
          // Map matches BUILTIN_TS_TYPE in StructureTemplate
          const builtinComplexMap: Record<number, string> = {
            12: 'UaString',
            15: 'UaByteString',
            16: 'XmlElement',
            17: 'NodeId',
            18: 'ExpandedNodeId',
            19: 'StatusCode',
            20: 'QualifiedName',
            21: 'LocalizedText',
            22: 'ExtensionObject',
            23: 'DataValue',
            24: 'Variant',
            25: 'DiagnosticInfo',
          };
          const baseName = builtinComplexMap[n];
          if (baseName && BASE_COMPLEX_TYPES.has(baseName)) {
            usedBaseTypeNames.add(baseName);
          }
        }
        // Also handle builtin alias types (e.g. UriString i=23751 → UaString):
        // nodeIdToTypeName is seeded from builtinAliasToTs, so the resolved name
        // may be UaString or UaByteString even for non-built-in numeric IDs.
        const resolvedName = nodeIdToTypeName.get(field.dataTypeNodeId);
        if (resolvedName && BASE_COMPLEX_TYPES.has(resolvedName)) {
          usedBaseTypeNames.add(resolvedName);
        }
      }
    }

    try {
      // Resolve parent type name for extends clause
      const parentName = parentMap.get(type.nodeId);
      typeCode.push(generateStructure(type, parentName, nodeIdToTypeName));
    } catch (error) {
      const typeName = type.browseName || 'unknown';
      if (error instanceof Error) {
        throw new Error(`Failed to generate type ${typeName}: ${error.message}`);
      }
      throw new Error(`Failed to generate type ${typeName}: Unknown error`);
    }
  }

  // Generate binary decoders
  const decoderResult = generateDecoders(types, nodeIdToTypeName, enumNodeIds, dataModel.builtinAliases);

  // Generate binary encoders
  const encoderResult = generateEncoders(types, nodeIdToTypeName, enumNodeIds, dataModel.builtinAliases);

  // Generate decoder registrations
  const decoderRegistrationsResult = generateDecoderRegistrations(types);

  // Generate encoder registrations
  const encoderRegistrationsResult = generateEncoderRegistrations(types);

  return {
    enums: enumCode.join('\n\n'),
    types: typeCode.join('\n\n'),
    enumImports: [...usedEnumNames].sort(),
    baseTypeImports: [...usedBaseTypeNames].sort(),
    decoders: decoderResult.code,
    decoderTypeImports: decoderResult.typeImports,
    decoderEnumImports: decoderResult.enumImports,
    encoders: encoderResult.code,
    encoderTypeImports: encoderResult.typeImports,
    encoderEnumImports: encoderResult.enumImports,
    decoderRegistrations: decoderRegistrationsResult.code,
    decoderRegistrationImports: decoderRegistrationsResult.decoderFunctionImports,
    encoderRegistrations: encoderRegistrationsResult.code,
    encoderRegistrationImports: encoderRegistrationsResult.encoderFunctionImports,
  };
}
