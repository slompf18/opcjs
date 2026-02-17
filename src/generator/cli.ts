#!/usr/bin/env node

/**
 * OPC UA NodeSet Code Generator CLI
 * 
 * Command-line interface for generating TypeScript code from OPC UA NodeSet2 XML files.
 * 
 * @packageDocumentation
 */

import { Command } from 'commander';
import { readFileSync } from 'fs';
import { resolve, basename } from 'path';
import { parseNodeSet } from '../parser/index.js';
import { generateTypeScript } from './TypeScriptGenerator.js';
import { writeFile, generateFileHeader } from './FileWriter.js';

/**
 * CLI version
 */
const VERSION = '0.1.0';

/**
 * Main CLI program
 */
const program = new Command();

program
  .name('opcua-generator')
  .description('Generate TypeScript code from OPC UA NodeSet2 XML files')
  .version(VERSION)
  .argument('<input>', 'Path to NodeSet2 XML file (e.g., Opc.Ua.NodeSet2.Services.xml)')
  .option('-o, --output <dir>', 'Output directory for generated TypeScript files')
  .option('--include-abstract', 'Include abstract types in output', false);

program.action((input: string) => {
  try {
    const options = program.opts();
    
    const outputDir = options.output;
    const includeAbstract = options.includeAbstract;
    
    // Validate that output directory is specified
    if (!outputDir) {
      console.error('❌ Error: Output directory parameter (-o, --output) must be specified');
      console.error('');
      program.help();
    }

    // Resolve input path
    const inputPath = resolve(input);
    console.log(`📖 Reading NodeSet: ${inputPath}`);

    // Read XML file
    let xmlContent: string;
    try {
      xmlContent = readFileSync(inputPath, 'utf-8');
    } catch (error) {
      if (error instanceof Error) {
        console.error(`❌ Error reading input file: ${error.message}`);
      } else {
        console.error('❌ Error reading input file: Unknown error');
      }
      process.exit(2);
    }

      // Parse NodeSet
      console.log('🔍 Parsing NodeSet XML...');
      const dataModel = parseNodeSet(xmlContent);
      console.log(`✅ Parsed ${dataModel.types.length} types`);

      // Count by category
      const enums = dataModel.types.filter(t => t.category === 'enumeration');
      const structs = dataModel.types.filter(t => t.category === 'structure');
      const abstract = dataModel.types.filter(t => t.category === 'abstract');
      console.log(`   - Enumerations: ${enums.length}`);
      console.log(`   - Structures: ${structs.length}`);
      console.log(`   - Abstract: ${abstract.length}`);

      // Generate TypeScript code
      console.log('\n🔨 Generating TypeScript code...');
      const generatedCode = generateTypeScript(dataModel, {
        includeAbstract,
      });

      // Add file header
      const sourceFileName = basename(inputPath);
      const header = generateFileHeader(sourceFileName);

      // Write enums file
      const enumsPath = resolve(outputDir, 'enums.ts');
      console.log(`💾 Writing enums to: ${enumsPath}`);
      writeFile(enumsPath, header + generatedCode.enums);

      // Write types file with base Structure class
      const typesPath = resolve(outputDir, 'types.ts');
      console.log(`💾 Writing types to: ${typesPath}`);
      const baseClass = `\n// Base class for all OPC UA structures\nexport abstract class Structure {\n  abstract getId(): number;\n}\n\n`;
      writeFile(typesPath, header + baseClass + generatedCode.types);

      console.log('✅ TypeScript generation complete!');

      console.log('\n🎉 Code generation successful!');
      console.log(`   📄 Generated 2 files:`);
      console.log(`      - ${basename(enumsPath)} (${enums.length} enumerations)`);
      console.log(`      - ${basename(typesPath)} (${structs.length + abstract.length} types)`);
      process.exit(0);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\n❌ Error: ${error.message}`);
        if (process.env.DEBUG) {
          console.error(error.stack);
        }
      } else {
        console.error('\n❌ Unknown error occurred');
      }
      process.exit(2);
    }
  });

// Parse command line arguments
program.parse();
