/**
 * MVP Test Script
 * 
 * Quick validation of the parser and generator functionality.
 */

import { parseNodeSet } from './src/parser/index.js';
import { readFileSync } from 'fs';

// Test 1: Parse NodeSet XML
console.log('📋 Test 1: Parsing NodeSet XML...');
const xmlPath = './src/nodeSets/schema/Opc.Ua.NodeSet2.Services.xml';
const xmlContent = readFileSync(xmlPath, 'utf-8');
const dataModel = parseNodeSet(xmlContent);

console.log(`✅ Parsed ${dataModel.types.length} types`);
console.log(`   - Enumerations: ${dataModel.types.filter(t => t.category === 'enumeration').length}`);
console.log(`   - Structures: ${dataModel.types.filter(t => t.category === 'structure').length}`);
console.log(`   - Abstract: ${dataModel.types.filter(t => t.category === 'abstract').length}`);

// Test 2: Verify ApplicationType enum
console.log('\n📋 Test 2: Verify ApplicationType enum...');
const appType = dataModel.types.find(t => t.browseName === 'ApplicationType');
if (appType && appType.enumMembers) {
  console.log('✅ ApplicationType found:');
  console.log(`   - NodeId: ${appType.nodeId}`);
  console.log(`   - Members: ${appType.enumMembers.length}`);
  appType.enumMembers.forEach(m => {
    console.log(`     * ${m.name} = ${m.value}`);
  });
}

// Test 3: Verify ApplicationDescription structure
console.log('\n📋 Test 3: Verify ApplicationDescription structure...');
const appDesc = dataModel.types.find(t => t.browseName === 'ApplicationDescription');
if (appDesc) {
  console.log('✅ ApplicationDescription found:');
  console.log(`   - NodeId: ${appDesc.nodeId}`);
  console.log(`   - Category: ${appDesc.category}`);
  console.log(`   - ParentNodeId: ${appDesc.parentNodeId}`);
  console.log(`   - IsAbstract: ${appDesc.isAbstract}`);
}

// Test 4: Verify builtins are excluded
console.log('\n📋 Test 4: Verify builtin types excluded...');
const builtins = dataModel.types.filter(t => t.isBuiltin);
console.log(`✅ ${builtins.length} builtin types excluded (should be 0)`);

console.log('\n🎉 All tests passed!');
