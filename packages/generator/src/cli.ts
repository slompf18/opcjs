#!/usr/bin/env node

/**
 * OPC UA NodeSet Code Generator CLI
 * 
 * Command-line interface for generating TypeScript code from OPC UA NodeSet2 XML files.
 * 
 * @packageDocumentation
 */

import { Command } from 'commander';
import { existsSync, readFileSync } from 'fs';
import { resolve, basename, dirname } from 'path';
import { parseNodeSet, parseNodeIdsCsv } from './parser/index.js';
import type { NodeIdsMap } from './parser/index.js';
import { ParsedType } from './parser/types/DataModel.js';
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
  .argument('<input>', 'Path to NodeSet2 XML file (e.g., Opc.Ua.NodeSet2.xml)')
  .option('-o, --output <dir>', 'Output directory for generated TypeScript files')
  .option('--node-ids <path>', 'Path to NodeIds.csv (defaults to NodeIds.csv next to the input file)')
  .option(
    '--base-types-prefix <prefix>',
    'Use relative imports for @opcua/base types instead of the barrel import. ' +
    'Pass the relative path prefix to the base types directory (e.g. "../types"). ' +
    'Use this when generating code that lives inside the base package itself to avoid circular dependencies.'
  );

program.action((input: string) => {
  try {
    const options = program.opts();
    
    const outputDir = options.output;

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

      // Load NodeIds.csv for encoding ID lookup
      let nodeIdsMap: NodeIdsMap | undefined;
      const nodeIdsCsvArg: string | undefined = options.nodeIds;
      const nodeIdsCsvPath = nodeIdsCsvArg
        ? resolve(nodeIdsCsvArg)
        : resolve(dirname(inputPath), 'NodeIds.csv');

      if (existsSync(nodeIdsCsvPath)) {
        console.log(`📋 Reading NodeIds: ${nodeIdsCsvPath}`);
        try {
          const csvContent = readFileSync(nodeIdsCsvPath, 'utf-8');
          nodeIdsMap = parseNodeIdsCsv(csvContent);
          console.log(`✅ Loaded ${(nodeIdsMap as Map<string, unknown>).size} NodeId entries`);
        } catch (error) {
          const msg = error instanceof Error ? error.message : String(error);
          console.warn(`⚠️  Could not read NodeIds.csv (${msg}); encoding IDs will be 0`);
        }
      } else if (nodeIdsCsvArg) {
        console.error(`❌ NodeIds.csv not found at: ${nodeIdsCsvPath}`);
        process.exit(2);
      } else {
        console.warn(`⚠️  NodeIds.csv not found at ${nodeIdsCsvPath}; encoding IDs will be 0`);
      }

      // Parse NodeSet
      console.log('🔍 Parsing NodeSet XML...');
      const dataModel = parseNodeSet(xmlContent, nodeIdsMap);
      console.log(`✅ Parsed ${dataModel.types.length} types`);

      // Count by category
      const enums = dataModel.types.filter((t: ParsedType) => t.category === 'enumeration');
      const structs = dataModel.types.filter((t: ParsedType) => t.category === 'structure');
      const abstract = dataModel.types.filter((t: ParsedType) => t.category === 'abstract');
      console.log(`   - Enumerations: ${enums.length}`);
      console.log(`   - Structures: ${structs.length}`);
      console.log(`   - Abstract: ${abstract.length}`);

      // Generate TypeScript code
      console.log('\n🔨 Generating TypeScript code...');
      const generatedCode = generateTypeScript(dataModel);

      // Add file header
      const sourceFileName = basename(inputPath);
      const header = generateFileHeader(sourceFileName);

      // Write enums file
      const enumsPath = resolve(outputDir, 'enums.ts');
      console.log(`💾 Writing enums to: ${enumsPath}`);
      writeFile(enumsPath, header + generatedCode.enums);

      // Write types file with base Structure class implementing IOpcType
      const typesPath = resolve(outputDir, 'types.ts');
      console.log(`💾 Writing types to: ${typesPath}`);

      // Build imports block
      const baseTypesPrefix: string | undefined = options.baseTypesPrefix;
      let opcTypeImport: string;
      if (baseTypesPrefix) {
        // Generate per-type relative imports to avoid circular dependencies when
        // this code is generated inside the base package itself.
        const primitiveTypeAliases = new Set(['UaString', 'UaByteString']);
        const toFileName = (name: string): string =>
          name.charAt(0).toLowerCase() + name.slice(1) + '.js';
        const allBaseTypes = ['IOpcType', ...generatedCode.baseTypeImports];
        // Group types by their source file so multiple types from the same file
        // are merged into a single import statement.
        const fileToNames = new Map<string, string[]>();
        for (const name of allBaseTypes) {
          const file = primitiveTypeAliases.has(name)
            ? `${baseTypesPrefix}/primitives.js`
            : `${baseTypesPrefix}/${toFileName(name)}`;
          const names = fileToNames.get(file) ?? [];
          names.push(name);
          fileToNames.set(file, names);
        }
        opcTypeImport = [...fileToNames.entries()]
          .map(([file, names]) => `import type { ${names.join(', ')} } from '${file}';`)
          .join('\n') + '\n';
      } else {
        const primitiveTypeAliases = new Set(['UaString', 'UaByteString']);
        const allBaseTypes = ['IOpcType', ...generatedCode.baseTypeImports];
        const valueTypes = allBaseTypes.filter(n => !primitiveTypeAliases.has(n));
        const typeOnlyTypes = allBaseTypes.filter(n => primitiveTypeAliases.has(n));
        const valueImport = `import {\n    ${valueTypes.join(',\n    ')}\n} from '@opcua/base';\n`;
        const typeImport = typeOnlyTypes.length > 0
          ? `import type { ${typeOnlyTypes.join(', ')} } from '@opcua/base';\n`
          : '';
        opcTypeImport = valueImport + typeImport;
      }
      const enumImport = generatedCode.enumImports.length > 0
        ? `import {\n    ${generatedCode.enumImports.join(',\n    ')}\n} from './enums.js';\n`
        : '';
      const importsBlock = opcTypeImport + enumImport + '\n';
      const baseClass = `// Base class for all OPC UA structures
export abstract class Structure implements IOpcType {
  abstract getTypeId(): number;
  abstract getBinaryEncodingId(): number;
  abstract getXmlEncodingId(): number;
  abstract getJsonEncodingId(): number;
}

`;
      writeFile(typesPath, header + importsBlock + baseClass + generatedCode.types);

      // Write binary decoders file
      const decodersPath = resolve(outputDir, 'decoders.ts');
      console.log(`💾 Writing binary decoders to: ${decodersPath}`);

      const decoderImports: string[] = [
        `import { type IReader, Decoder } from '@opcua/base';`,
      ];
      if (generatedCode.decoderEnumImports.length > 0) {
        decoderImports.push(
          `import {\n    ${generatedCode.decoderEnumImports.join(',\n    ')}\n} from './enums.js';`,
        );
      }
      if (generatedCode.decoderTypeImports.length > 0) {
        decoderImports.push(
          `import {\n    ${generatedCode.decoderTypeImports.join(',\n    ')}\n} from './types.js';`,
        );
      }
      const decoderImportsBlock = decoderImports.join('\n') + '\n\n';
      writeFile(decodersPath, header + decoderImportsBlock + generatedCode.decoders + '\n');

      // Write binary encoders file
      const encodersPath = resolve(outputDir, 'encoders.ts');
      console.log(`💾 Writing binary encoders to: ${encodersPath}`);

      const encoderImports: string[] = [
        `import { IWriter, Encoder } from '@opcua/base';`,
      ];
      if (generatedCode.encoderEnumImports.length > 0) {
        encoderImports.push(
          `import {\n    ${generatedCode.encoderEnumImports.join(',\n    ')}\n} from './enums.js';`,
        );
      }
      if (generatedCode.encoderTypeImports.length > 0) {
        encoderImports.push(
          `import {\n    ${generatedCode.encoderTypeImports.join(',\n    ')}\n} from './types.js';`,
        );
      }
      const encoderImportsBlock = encoderImports.join('\n') + '\n\n';
      writeFile(encodersPath, header + encoderImportsBlock + generatedCode.encoders + '\n');

      // Write decoder registrations file
      const decoderRegsPath = resolve(outputDir, 'decoderRegistrations.ts');
      console.log(`💾 Writing decoder registrations to: ${decoderRegsPath}`);

      const decoderRegsImports: string[] = [
        `import { type IReader, Decoder, BinaryReader } from '@opcua/base';`,
      ];
      if (generatedCode.decoderRegistrationImports.length > 0) {
        decoderRegsImports.push(
          `import {\n    ${generatedCode.decoderRegistrationImports.join(',\n    ')}\n} from './decoders.js';`,
        );
      }
      const decoderRegsImportsBlock = decoderRegsImports.join('\n') + '\n\n';
      writeFile(decoderRegsPath, header + decoderRegsImportsBlock + generatedCode.decoderRegistrations + '\n');

      // Write encoder registrations file
      const encoderRegsPath = resolve(outputDir, 'encoderRegistrations.ts');
      console.log(`💾 Writing encoder registrations to: ${encoderRegsPath}`);

      const encoderRegsImports: string[] = [
        `import { Encoder } from '@opcua/base';`,
      ];
      if (generatedCode.encoderRegistrationImports.length > 0) {
        encoderRegsImports.push(
          `import {\n    ${generatedCode.encoderRegistrationImports.join(',\n    ')}\n} from './encoders.js';`,
        );
      }
      const encoderRegsImportsBlock = encoderRegsImports.join('\n') + '\n\n';
      writeFile(encoderRegsPath, header + encoderRegsImportsBlock + generatedCode.encoderRegistrations + '\n');

      console.log('✅ TypeScript generation complete!');

      console.log('\n🎉 Code generation successful!');
      console.log(`   📄 Generated 6 files:`);
      console.log(`      - ${basename(enumsPath)} (${enums.length} enumerations)`);
      console.log(`      - ${basename(typesPath)} (${structs.length + abstract.length} types)`);
      console.log(`      - ${basename(decodersPath)} (${structs.length + abstract.length} decoders)`);
      console.log(`      - ${basename(encodersPath)} (${structs.length + abstract.length} encoders)`);
      console.log(`      - ${basename(decoderRegsPath)} (decoder registrations)`);
      console.log(`      - encoderRegistrations.ts (encoder registrations)`);
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
if (process.argv.length <= 2) {
  program.help();
}
program.parse();
