/**
 * NodeSet Code Generator - Generate TypeScript code from parsed OPC UA types
 * 
 * This generator produces TypeScript enums and interfaces from the intermediate
 * data model created by the parser.
 * 
 * @packageDocumentation
 */

// Export generator functions
export { generateTypeScript, GeneratorOptions, GeneratedCode } from './TypeScriptGenerator.js';
export { generateEnum } from './templates/EnumTemplate.js';
export { generateStructure } from './templates/StructureTemplate.js';
export { generateDecoders, GeneratedDecoders } from './templates/DecoderTemplate.js';
export { generateEncoders, GeneratedEncoders } from './templates/EncoderTemplate.js';
export { generateDecoderRegistrations, GeneratedDecoderRegistrations } from './templates/DecoderRegistrationsTemplate.js';
export { writeFile, generateFileHeader } from './FileWriter.js';

// CLI entry point is in cli.ts
