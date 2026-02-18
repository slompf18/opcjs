/**
 * Test script for StatusCode class
 */
import { StatusCode, DataValue, DiagnosticInfo, Variant, VariantType } from './src/types/dist/index.js';

console.log('=== StatusCode Class Tests ===\n');

// Test 1: Create StatusCode instances
console.log('1. Creating StatusCode instances:');
const good = new StatusCode(StatusCode.Good);
const badTimeout = new StatusCode(StatusCode.BadTimeout);
const uncertain = new StatusCode(StatusCode.UncertainLastUsableValue);

console.log(`   Good: ${good.toString()}`);
console.log(`   BadTimeout: ${badTimeout.toString()}`);
console.log(`   Uncertain: ${uncertain.toString()}`);

// Test 2: Check severity methods
console.log('\n2. Testing severity methods:');
console.log(`   good.isGood() = ${good.isGood()}`);
console.log(`   good.isBad() = ${good.isBad()}`);
console.log(`   badTimeout.isBad() = ${badTimeout.isBad()}`);
console.log(`   uncertain.isUncertain() = ${uncertain.isUncertain()}`);

// Test 3: Use with DataValue
console.log('\n3. Testing DataValue with StatusCode:');
const value = new Variant(VariantType.Double, 25.5);
const dataValue = new DataValue(value, badTimeout, new Date());
console.log(`   DataValue status: ${dataValue.statusCode?.toString()}`);
console.log(`   DataValue.isGood() = ${dataValue.isGood()}`);
console.log(`   DataValue.isBad() = ${dataValue.isBad()}`);

// Test 4: Use with DiagnosticInfo
console.log('\n4. Testing DiagnosticInfo with StatusCode:');
const diagInfo = new DiagnosticInfo({
  additionalInfo: 'Connection timeout occurred',
  innerStatusCode: badTimeout
});
console.log(`   DiagnosticInfo: ${diagInfo.toString()}`);

// Test 5: Test predefined constants
console.log('\n5. Testing predefined status code constants:');
console.log(`   StatusCode.Good = 0x${StatusCode.Good.toString(16).padStart(8, '0')}`);
console.log(`   StatusCode.BadTimeout = 0x${StatusCode.BadTimeout.toString(16).padStart(8, '0')}`);
console.log(`   StatusCode.BadCertificateInvalid = 0x${StatusCode.BadCertificateInvalid.toString(16).padStart(8, '0')}`);
console.log(`   StatusCode.UncertainLastUsableValue = 0x${StatusCode.UncertainLastUsableValue.toString(16).padStart(8, '0')}`);

// Test 6: Test equals method
console.log('\n6. Testing equals method:');
const good2 = new StatusCode(StatusCode.Good);
const bad2 = new StatusCode(StatusCode.BadTimeout);
console.log(`   good.equals(good2) = ${good.equals(good2)}`);
console.log(`   good.equals(badTimeout) = ${good.equals(badTimeout)}`);
console.log(`   badTimeout.equals(bad2) = ${badTimeout.equals(bad2)}`);

// Test 7: Test getValue and getSeverity
console.log('\n7. Testing getValue() and getSeverity():');
console.log(`   good.getValue() = 0x${good.getValue().toString(16).padStart(8, '0')}`);
console.log(`   good.getSeverity() = ${good.getSeverity()}`);
console.log(`   badTimeout.getSeverity() = ${badTimeout.getSeverity()}`);
console.log(`   uncertain.getSeverity() = ${uncertain.getSeverity()}`);

console.log('\n=== All StatusCode tests completed successfully! ===');
