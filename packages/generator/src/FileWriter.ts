/**
 * File Writer - Write generated code to filesystem
 * 
 * Handles directory creation and file writing operations.
 * 
 * @packageDocumentation
 */

import { mkdirSync, writeFileSync } from 'fs';
import { dirname } from 'path';

/**
 * Write content to a file, creating directories as needed
 * 
 * @param filePath - Absolute path to the output file
 * @param content - File content to write
 * @throws Error if write fails
 */
export function writeFile(filePath: string, content: string): void {
  try {
    // Create directory if it doesn't exist
    const dir = dirname(filePath);
    mkdirSync(dir, { recursive: true });

    // Write file
    writeFileSync(filePath, content, 'utf-8');
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to write file ${filePath}: ${error.message}`);
    }
    throw new Error(`Failed to write file ${filePath}: Unknown error`);
  }
}

/**
 * Generate file header comment with auto-generation notice
 * 
 * @param sourceFile - Name of the source NodeSet file
 * @returns Header comment block
 */
export function generateFileHeader(sourceFile: string): string {
  const timestamp = new Date().toISOString();
  
  return `/**
 * AUTO-GENERATED FILE - DO NOT EDIT
 * 
 * This file was automatically generated from OPC UA NodeSet2 XML.
 * 
 * Source: ${sourceFile}
 * Generated: ${timestamp}
 * Generator: @opcua/nodeset-generator
 * 
 * Any changes made to this file will be lost when regenerated.
 */

`;
}
