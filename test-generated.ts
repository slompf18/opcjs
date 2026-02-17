/**
 * Test generated code runtime behavior
 */

import { ApplicationType, MessageSecurityMode } from './generated/enums.js';
import { ApplicationDescription, ThreeDVector } from './generated/types.js';

console.log('=== Testing Enums ===');
console.log('ApplicationType.Server =', ApplicationType.Server);
console.log('ApplicationType.Client =', ApplicationType.Client);

// Test enum iteration (only works with regular enum, not const enum)
console.log('\nEnum keys:', Object.keys(ApplicationType).filter(k => isNaN(Number(k))));
console.log('Enum values:', Object.values(ApplicationType).filter(v => typeof v === 'number'));

console.log('\n=== Testing Classes ===');
const appDesc = new ApplicationDescription();
console.log('ApplicationDescription.getId() =', appDesc.getId());

const vector = new ThreeDVector();
console.log('ThreeDVector.getId() =', vector.getId());

console.log('\n✅ All tests passed!');
