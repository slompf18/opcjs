/**
 * @fileoverview Tests for LocalizedText optional field optimization
 * @module tests/codec/optimization/localized-text
 * 
 * LocalizedText uses an encoding mask to optimize size by omitting optional fields:
 * - Bit 0: Locale is present (can be omitted if empty)
 * - Bit 1: Text is present
 * - Size reduction: Omitting locale saves 4+ bytes (length prefix + UTF-8 bytes)
 * 
 * @see OPC 10000-6 Table 9 - LocalizedText encoding mask
 * @see FR-014 - Optional field optimization for LocalizedText
 */

import { describe, it, expect } from 'vitest';
import { BinaryEncoder } from '../../../src/codec/binary/encoder.js';
import { BinaryDecoder } from '../../../src/codec/binary/decoder.js';
import { LocalizedText } from '../../../src/types/src/index.js';
import { encodeBinary, decodeBinary } from '../../../src/codec/complex/localized-text.js';

describe('LocalizedText Optimization - Optional Locale Omission', () => {
  it('should omit locale field when undefined', () => {
    const encoder = new BinaryEncoder();
    const text = new LocalizedText(undefined, 'Hello');
    
    encodeBinary(encoder, text);
    
    const buffer = encoder.getBuffer();
    const encodingMask = buffer[0];
    
    // Bit 0 should be 0 (locale not present), bit 1 should be 1 (text present)
    expect(encodingMask & 0x01).toBe(0); // Locale flag NOT set
    expect(encodingMask & 0x02).not.toBe(0); // Text flag IS set
  });

  it('should omit locale field when empty string', () => {
    const encoder = new BinaryEncoder();
    const text = new LocalizedText('', 'World');
    
    encodeBinary(encoder, text);
    
    const buffer = encoder.getBuffer();
    const encodingMask = buffer[0];
    
    // Empty locale should be treated as omitted
    expect(encodingMask & 0x01).toBe(0); // Locale flag NOT set
    expect(encodingMask & 0x02).not.toBe(0); // Text flag IS set
  });

  it('should include locale field when provided', () => {
    const encoder = new BinaryEncoder();
    const text = new LocalizedText('en-US', 'Hello');
    
    encodeBinary(encoder, text);
    
    const buffer = encoder.getBuffer();
    const encodingMask = buffer[0];
    
    // Both flags should be set
    expect(encodingMask & 0x01).not.toBe(0); // Locale flag IS set
    expect(encodingMask & 0x02).not.toBe(0); // Text flag IS set
  });

  it('should calculate size reduction when locale is omitted', () => {
    const encoder1 = new BinaryEncoder();
    const withLocale = new LocalizedText('en-US', 'Temperature');
    encodeBinary(encoder1, withLocale);
    const withLocaleSize = encoder1.getBuffer().length;
    
    const encoder2 = new BinaryEncoder();
    const withoutLocale = new LocalizedText(undefined, 'Temperature');
    encodeBinary(encoder2, withoutLocale);
    const withoutLocaleSize = encoder2.getBuffer().length;
    
    // Omitting locale should save: 4 (length) + 5 (UTF-8 bytes for 'en-US') = 9 bytes
    const saved = withLocaleSize - withoutLocaleSize;
    expect(saved).toBe(9);
  });

  it('should decode LocalizedText with omitted locale', () => {
    const encoder = new BinaryEncoder();
    const original = new LocalizedText(undefined, 'Test Message');
    
    encodeBinary(encoder, original);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    expect(decoded.locale).toBeUndefined();
    expect(decoded.text).toBe('Test Message');
  });

  it('should decode LocalizedText with included locale', () => {
    const encoder = new BinaryEncoder();
    const original = new LocalizedText('de-DE', 'Nachricht');
    
    encodeBinary(encoder, original);
    
    const decoder = new BinaryDecoder(encoder.getBuffer());
    const decoded = decodeBinary(decoder);
    
    expect(decoded.locale).toBe('de-DE');
    expect(decoded.text).toBe('Nachricht');
  });

  it('should round-trip with various locale scenarios', () => {
    const testCases = [
      { locale: undefined, text: 'No locale' },
      { locale: '', text: 'Empty locale' },
      { locale: 'en', text: 'English' },
      { locale: 'en-US', text: 'US English' },
      { locale: 'zh-CN', text: '中文' },
      { locale: 'de-DE', text: 'Deutsch' },
    ];

    for (const { locale, text } of testCases) {
      const encoder = new BinaryEncoder();
      const original = new LocalizedText(locale, text);
      
      encodeBinary(encoder, original);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      // Empty string should decode as undefined
      if (locale === '') {
        expect(decoded.locale).toBeUndefined();
      } else {
        expect(decoded.locale).toBe(locale);
      }
      expect(decoded.text).toBe(text);
    }
  });

  it('should handle encoding mask correctly for all combinations', () => {
    const testCases = [
      { locale: undefined, text: '', expectedMask: 0x00 }, // Neither present
      { locale: undefined, text: 'Hello', expectedMask: 0x02 }, // Only text
      { locale: 'en', text: '', expectedMask: 0x01 }, // Only locale
      { locale: 'en', text: 'Hello', expectedMask: 0x03 }, // Both present
    ];

    for (const { locale, text, expectedMask } of testCases) {
      const encoder = new BinaryEncoder();
      const localizedText = new LocalizedText(locale, text);
      
      encodeBinary(encoder, localizedText);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(expectedMask);
    }
  });

  it('should optimize size for simple text without locale', () => {
    const encoder = new BinaryEncoder();
    const text = new LocalizedText(undefined, 'OK');
    
    encodeBinary(encoder, text);
    
    const buffer = encoder.getBuffer();
    // Expected: 1 (mask) + 4 (text length) + 2 (UTF-8 bytes for 'OK') = 7 bytes
    expect(buffer.length).toBe(7);
  });

  it('should compare size with and without locale for same text', () => {
    const message = 'System Ready';
    
    const encoder1 = new BinaryEncoder();
    encodeBinary(encoder1, new LocalizedText('en-US', message));
    const sizeWithLocale = encoder1.getBuffer().length;
    
    const encoder2 = new BinaryEncoder();
    encodeBinary(encoder2, new LocalizedText(undefined, message));
    const sizeWithoutLocale = encoder2.getBuffer().length;
    
    expect(sizeWithoutLocale).toBeLessThan(sizeWithLocale);
    
    // Calculate reduction percentage
    const reduction = ((sizeWithLocale - sizeWithoutLocale) / sizeWithLocale) * 100;
    expect(reduction).toBeGreaterThan(0);
  });

  it('should handle long locale identifiers', () => {
    const encoder1 = new BinaryEncoder();
    const text = 'Message';
    const longLocale = 'sr-Cyrl-RS'; // Serbian (Cyrillic, Serbia) - 10 bytes
    encodeBinary(encoder1, new LocalizedText(longLocale, text));
    
    const encoder2 = new BinaryEncoder();
    encodeBinary(encoder2, new LocalizedText(undefined, text));
    
    const saved = encoder1.getBuffer().length - encoder2.getBuffer().length;
    // Should save: 4 (length) + 10 (UTF-8 bytes) = 14 bytes
    expect(saved).toBe(14);
  });

  it('should verify byte layout for optimized encoding', () => {
    const encoder = new BinaryEncoder();
    const text = new LocalizedText(undefined, 'Test');
    
    encodeBinary(encoder, text);
    
    const buffer = encoder.getBuffer();
    
    // Byte 0: Encoding mask (0x02 = text only)
    expect(buffer[0]).toBe(0x02);
    
    // Bytes 1-4: Text length (4) as Int32 little-endian
    const textLength = buffer.readInt32LE(1);
    expect(textLength).toBe(4);
    
    // Bytes 5-8: Text data ('Test')
    expect(buffer.toString('utf-8', 5, 9)).toBe('Test');
    
    // No locale data present
    expect(buffer.length).toBe(9);
  });

  it('should verify byte layout with locale included', () => {
    const encoder = new BinaryEncoder();
    const text = new LocalizedText('en', 'Hi');
    
    encodeBinary(encoder, text);
    
    const buffer = encoder.getBuffer();
    
    // Byte 0: Encoding mask (0x03 = locale + text)
    expect(buffer[0]).toBe(0x03);
    
    // Bytes 1-4: Locale length (2) as Int32 little-endian
    const localeLength = buffer.readInt32LE(1);
    expect(localeLength).toBe(2);
    
    // Bytes 5-6: Locale data ('en')
    expect(buffer.toString('utf-8', 5, 7)).toBe('en');
    
    // Bytes 7-10: Text length (2) as Int32 little-endian
    const textLength = buffer.readInt32LE(7);
    expect(textLength).toBe(2);
    
    // Bytes 11-12: Text data ('Hi')
    expect(buffer.toString('utf-8', 11, 13)).toBe('Hi');
  });

  it('should achieve optimization in common use cases', () => {
    // Common use case: Error messages often don't need locale
    // (application determines locale, not the value itself)
    
    const errorMessages = [
      'File not found',
      'Access denied',
      'Connection timeout',
      'Invalid parameter',
    ];

    for (const msg of errorMessages) {
      const encoder = new BinaryEncoder();
      const text = new LocalizedText(undefined, msg);
      encodeBinary(encoder, text);
      
      const buffer = encoder.getBuffer();
      const mask = buffer[0];
      
      // Verify locale is omitted
      expect(mask & 0x01).toBe(0);
      
      // Calculate optimized size
      // Size = 1 (mask) + 4 (length) + msg.length
      expect(buffer.length).toBe(5 + msg.length);
    }
  });
});
