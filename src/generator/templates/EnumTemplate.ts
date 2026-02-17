/**
 * Enumeration Template - Generate TypeScript enum
 * 
 * Generates TypeScript enum declarations from ParsedType data.
 * Uses regular enum (not const enum) to allow runtime access.
 * 
 * @packageDocumentation
 */

import { ParsedType } from '../../parser/types/DataModel.js';

/**
 * Generate TypeScript enum code
 * 
 * @param type - The parsed enumeration type
 * @returns TypeScript enum source code
 */
export function generateEnum(type: ParsedType): string {
  if (type.category !== 'enumeration') {
    throw new Error(`Cannot generate enum for type ${type.browseName} with category ${type.category}`);
  }

  if (!type.enumMembers || type.enumMembers.length === 0) {
    throw new Error(`Enumeration ${type.browseName} has no members`);
  }

  // Generate enum members
  const members = type.enumMembers
    .map(member => `  ${member.name} = ${member.value}`)
    .join(',\n');

  // Use template literal for code generation (per research-ts.md R4)
  return `/**
 * ${type.browseName}
 * NodeId: ${type.nodeId || 'unknown'}
 */
export enum ${type.safeName} {
${members}
}`;
}
