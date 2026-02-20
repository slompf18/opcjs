/**
 * @fileoverview Tests for overall size reduction validation
 * @module tests/codec/optimization/size-reduction
 * 
 * Validates that binary format optimizations achieve the target 20% size reduction:
 * - NodeId compact format selection (TwoByte, FourByte vs Numeric)
 * - LocalizedText optional locale omission
 * 
 * Compares optimized encoding against non-optimized baseline.
 * 
 * @see FR-012 - Compact NodeId encoding format selection
 * @see FR-014 - LocalizedText optional field optimization
 * @see Success Criteria: 20%+ size reduction for typical OPC UA messages
 */

import { describe, it, expect } from 'vitest';
import { BinaryEncoder } from '../../../src/codec/binary/encoder.js';
import { LocalizedText } from '../../../src/types/src/index.js';
import { encodeBinary as encodeNodeId, numericNodeId, stringNodeId } from '../../../src/codec/complex/nodeid.js';
import { encodeBinary as encodeLocalizedText } from '../../../src/codec/complex/localized-text.js';

/**
 * Encode NodeId using always-Numeric format (baseline, no optimization)
 */
function encodeNodeIdUnoptimized(encoder: BinaryEncoder, nodeId: ReturnType<typeof numericNodeId>): void {
  // Always use Numeric format (0x02): 7 bytes
  // Format(1) + Namespace(2) + Identifier(4)
  encoder.writeByte(0x02);
  encoder.writeUInt16(nodeId.namespace);
  encoder.writeUInt32(nodeId.identifier as number);
}

/**
 * Encode LocalizedText without optimization (always include locale)
 */
function encodeLocalizedTextUnoptimized(encoder: BinaryEncoder, text: LocalizedText): void {
  // Always set both flags even if locale is undefined
  encoder.writeByte(0x03); // Both locale and text present
  encoder.writeString(text.locale || ''); // Write empty string if undefined
  encoder.writeString(text.text);
}

describe('Binary Format Optimization - Size Reduction Validation', () => {
  it('should achieve 71% size reduction for TwoByteNodeId vs NumericNodeId', () => {
    // TwoByteNodeId: 2 bytes (ns=0, id≤255)
    // NumericNodeId: 7 bytes
    // Reduction: (7-2)/7 = 71.4%
    
    const nodeId = numericNodeId(0, 42);
    
    const optimized = new BinaryEncoder();
    encodeNodeId(optimized, nodeId);
    
    const unoptimized = new BinaryEncoder();
    encodeNodeIdUnoptimized(unoptimized, nodeId);
    
    const optimizedSize = optimized.getBuffer().length;
    const unoptimizedSize = unoptimized.getBuffer().length;
    
    expect(optimizedSize).toBe(2);
    expect(unoptimizedSize).toBe(7);
    
    const reduction = ((unoptimizedSize - optimizedSize) / unoptimizedSize) * 100;
    expect(reduction).toBeCloseTo(71.4, 1);
  });

  it('should achieve 43% size reduction for FourByteNodeId vs NumericNodeId', () => {
    // FourByteNodeId: 4 bytes (ns≤255, id≤65535)
    // NumericNodeId: 7 bytes
    // Reduction: (7-4)/7 = 42.9%
    
    const nodeId = numericNodeId(10, 5000);
    
    const optimized = new BinaryEncoder();
    encodeNodeId(optimized, nodeId);
    
    const unoptimized = new BinaryEncoder();
    encodeNodeIdUnoptimized(unoptimized, nodeId);
    
    const optimizedSize = optimized.getBuffer().length;
    const unoptimizedSize = unoptimized.getBuffer().length;
    
    expect(optimizedSize).toBe(4);
    expect(unoptimizedSize).toBe(7);
    
    const reduction = ((unoptimizedSize - optimizedSize) / unoptimizedSize) * 100;
    expect(reduction).toBeCloseTo(42.9, 1);
  });

  it('should achieve size reduction for LocalizedText without locale', () => {
    // With optimization: 1 (mask) + 4 (length) + text length
    // Without optimization: 1 (mask) + 4 (length) + 0 (empty locale) + 4 (length) + text length
    // Reduction depends on text length, but saves 4 bytes minimum
    
    const text = new LocalizedText(undefined, 'Temperature');
    
    const optimized = new BinaryEncoder();
    encodeLocalizedText(optimized, text);
    
    const unoptimized = new BinaryEncoder();
    encodeLocalizedTextUnoptimized(unoptimized, text);
    
    const optimizedSize = optimized.getBuffer().length;
    const unoptimizedSize = unoptimized.getBuffer().length;
    
    const reduction = ((unoptimizedSize - optimizedSize) / unoptimizedSize) * 100;
    
    // Should save at least 4 bytes (empty locale string length prefix)
    expect(unoptimizedSize - optimizedSize).toBeGreaterThanOrEqual(4);
    expect(reduction).toBeGreaterThan(0);
  });

  it('should achieve 20%+ reduction for typical OPC UA message', () => {
    // Simulate a typical OPC UA message with:
    // - 10 NodeIds in namespace 0-10 with small identifiers
    // - 5 LocalizedText values without locale
    
    const nodeIds = [
      numericNodeId(0, 85),    // ObjectsFolder (TwoByte)
      numericNodeId(0, 2253),  // Server (FourByte)
      numericNodeId(2, 1000),  // Custom node (FourByte)
      numericNodeId(3, 5000),  // Custom node (FourByte)
      numericNodeId(1, 100),   // Custom node (FourByte)
      numericNodeId(0, 47),    // BaseDataVariableType (TwoByte)
      numericNodeId(2, 200),   // Custom node (FourByte)
      numericNodeId(0, 62),    // HasComponent (TwoByte)
      numericNodeId(5, 10000), // Custom node (FourByte)
      numericNodeId(1, 50),    // Custom node (FourByte)
    ];
    
    const texts = [
      new LocalizedText(undefined, 'Temperature'),
      new LocalizedText(undefined, 'Pressure'),
      new LocalizedText(undefined, 'Flow Rate'),
      new LocalizedText(undefined, 'Status'),
      new LocalizedText(undefined, 'Alarm'),
    ];
    
    // Encode with optimization
    const optimized = new BinaryEncoder();
    for (const nodeId of nodeIds) {
      encodeNodeId(optimized, nodeId);
    }
    for (const text of texts) {
      encodeLocalizedText(optimized, text);
    }
    const optimizedSize = optimized.getBuffer().length;
    
    // Encode without optimization
    const unoptimized = new BinaryEncoder();
    for (const nodeId of nodeIds) {
      encodeNodeIdUnoptimized(unoptimized, nodeId);
    }
    for (const text of texts) {
      encodeLocalizedTextUnoptimized(unoptimized, text);
    }
    const unoptimizedSize = unoptimized.getBuffer().length;
    
    const reduction = ((unoptimizedSize - optimizedSize) / unoptimizedSize) * 100;
    
    expect(reduction).toBeGreaterThanOrEqual(20);
  });

  it('should demonstrate size reduction breakdown by optimization type', () => {
    // Track savings for each optimization type
    
    // 1. TwoByteNodeId savings
    const twoByteIds = [
      numericNodeId(0, 85),
      numericNodeId(0, 47),
      numericNodeId(0, 62),
    ];
    
    let twoByteOptimized = 0;
    let twoByteUnoptimized = 0;
    
    for (const id of twoByteIds) {
      const enc1 = new BinaryEncoder();
      encodeNodeId(enc1, id);
      twoByteOptimized += enc1.getBuffer().length;
      
      const enc2 = new BinaryEncoder();
      encodeNodeIdUnoptimized(enc2, id);
      twoByteUnoptimized += enc2.getBuffer().length;
    }
    
    const twoByteReduction = ((twoByteUnoptimized - twoByteOptimized) / twoByteUnoptimized) * 100;
    
    // 2. FourByteNodeId savings
    const fourByteIds = [
      numericNodeId(1, 100),
      numericNodeId(2, 1000),
      numericNodeId(3, 5000),
    ];
    
    let fourByteOptimized = 0;
    let fourByteUnoptimized = 0;
    
    for (const id of fourByteIds) {
      const enc1 = new BinaryEncoder();
      encodeNodeId(enc1, id);
      fourByteOptimized += enc1.getBuffer().length;
      
      const enc2 = new BinaryEncoder();
      encodeNodeIdUnoptimized(enc2, id);
      fourByteUnoptimized += enc2.getBuffer().length;
    }
    
    const fourByteReduction = ((fourByteUnoptimized - fourByteOptimized) / fourByteUnoptimized) * 100;
    
    // 3. LocalizedText savings
    const texts = [
      new LocalizedText(undefined, 'Value1'),
      new LocalizedText(undefined, 'Value2'),
      new LocalizedText(undefined, 'Value3'),
    ];
    
    let textOptimized = 0;
    let textUnoptimized = 0;
    
    for (const text of texts) {
      const enc1 = new BinaryEncoder();
      encodeLocalizedText(enc1, text);
      textOptimized += enc1.getBuffer().length;
      
      const enc2 = new BinaryEncoder();
      encodeLocalizedTextUnoptimized(enc2, text);
      textUnoptimized += enc2.getBuffer().length;
    }
    
    const textReduction = ((textUnoptimized - textOptimized) / textUnoptimized) * 100;
    
    // Verify each optimization provides reduction
    expect(twoByteReduction).toBeGreaterThan(70);
    expect(fourByteReduction).toBeGreaterThan(40);
    expect(textReduction).toBeGreaterThan(15);
  });

  it('should verify optimization scales with message size', () => {
    // Test that larger messages also achieve 20%+ reduction
    
    const sizes = [10, 50, 100, 500];
    
    for (const size of sizes) {
      const optimized = new BinaryEncoder();
      const unoptimized = new BinaryEncoder();
      
      // Generate mix of optimizable NodeIds
      for (let i = 0; i < size; i++) {
        const nodeId = numericNodeId(i % 10, i); // Mix of namespaces
        encodeNodeId(optimized, nodeId);
        encodeNodeIdUnoptimized(unoptimized, nodeId);
      }
      
      const optimizedSize = optimized.getBuffer().length;
      const unoptimizedSize = unoptimized.getBuffer().length;
      const reduction = ((unoptimizedSize - optimizedSize) / unoptimizedSize) * 100;
      
      expect(reduction).toBeGreaterThanOrEqual(20);
    }
  });

  it('should calculate savings for real-world Browse response', () => {
    // Simulate Browse response with 20 references
    // Each reference contains: ReferenceTypeId, IsForward flag, TargetNodeId, DisplayName, BrowseName
    
    const references = 20;
    const optimized = new BinaryEncoder();
    const unoptimized = new BinaryEncoder();
    
    for (let i = 0; i < references; i++) {
      // ReferenceTypeId (usually standard, ns=0)
      const refTypeId = numericNodeId(0, 40 + i); // TwoByte optimizable
      encodeNodeId(optimized, refTypeId);
      encodeNodeIdUnoptimized(unoptimized, refTypeId);
      
      // IsForward flag (1 byte) - not optimized
      optimized.writeBoolean(true);
      unoptimized.writeBoolean(true);
      
      // TargetNodeId (mix of namespaces)
      const targetId = numericNodeId(i % 5, 1000 + i); // FourByte optimizable
      encodeNodeId(optimized, targetId);
      encodeNodeIdUnoptimized(unoptimized, targetId);
      
      // DisplayName (LocalizedText without locale)
      const displayName = new LocalizedText(undefined, `Node${i}`);
      encodeLocalizedText(optimized, displayName);
      encodeLocalizedTextUnoptimized(unoptimized, displayName);
      
      // BrowseName (QualifiedName) - namespace + name
      optimized.writeUInt16(i % 5);
      optimized.writeString(`Name${i}`);
      unoptimized.writeUInt16(i % 5);
      unoptimized.writeString(`Name${i}`);
    }
    
    const optimizedSize = optimized.getBuffer().length;
    const unoptimizedSize = unoptimized.getBuffer().length;
    const reduction = ((unoptimizedSize - optimizedSize) / unoptimizedSize) * 100;
    
    expect(reduction).toBeGreaterThanOrEqual(20);
  });

  it('should verify optimization effectiveness for different node patterns', () => {
    // Test different usage patterns
    
    const patterns = [
      {
        name: 'Standard namespace only (ns=0)',
        nodeIds: Array.from({ length: 100 }, (_, i) => numericNodeId(0, i)),
        expectedReduction: 70, // Mostly TwoByte
      },
      {
        name: 'Mixed small namespaces',
        nodeIds: Array.from({ length: 100 }, (_, i) => numericNodeId(i % 10, i * 10)),
        expectedReduction: 40, // Mostly FourByte
      },
      {
        name: 'Large namespaces',
        nodeIds: Array.from({ length: 100 }, (_, i) => numericNodeId(300 + i, i)),
        expectedReduction: 0, // No optimization possible
      },
    ];

    for (const pattern of patterns) {
      const optimized = new BinaryEncoder();
      const unoptimized = new BinaryEncoder();
      
      for (const nodeId of pattern.nodeIds) {
        encodeNodeId(optimized, nodeId);
        encodeNodeIdUnoptimized(unoptimized, nodeId);
      }
      
      const optimizedSize = optimized.getBuffer().length;
      const unoptimizedSize = unoptimized.getBuffer().length;
      const reduction = ((unoptimizedSize - optimizedSize) / unoptimizedSize) * 100;
      
      expect(reduction).toBeGreaterThanOrEqual(pattern.expectedReduction);
    }
  });

  it('should document typical size savings per element', () => {
    const results = {
      twoByteNodeId: { optimized: 2, unoptimized: 7, saved: 5, reduction: 71.4 },
      fourByteNodeId: { optimized: 4, unoptimized: 7, saved: 3, reduction: 42.9 },
      localizedTextNoLocale: { optimized: 15, unoptimized: 19, saved: 4, reduction: 21.1 }, // Example with 10-char text
    };
    
    // Verify these numbers with actual encoding
    
    // TwoByte
    let enc1 = new BinaryEncoder();
    encodeNodeId(enc1, numericNodeId(0, 42));
    expect(enc1.getBuffer().length).toBe(results.twoByteNodeId.optimized);
    
    // FourByte
    let enc2 = new BinaryEncoder();
    encodeNodeId(enc2, numericNodeId(10, 5000));
    expect(enc2.getBuffer().length).toBe(results.fourByteNodeId.optimized);
    
    // LocalizedText
    let enc3 = new BinaryEncoder();
    encodeLocalizedText(enc3, new LocalizedText(undefined, '0123456789'));
    expect(enc3.getBuffer().length).toBe(results.localizedTextNoLocale.optimized);
  });
});
