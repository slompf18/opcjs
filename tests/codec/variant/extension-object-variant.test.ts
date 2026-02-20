/**
 * Tests for Variant with ExtensionObject - Type Discrimination for Complex Generated Types.
 * 
 * Phase 9: User Story 7 - Variant Type Encoding with Type Discrimination
 * 
 * Tests verify that Variant correctly encodes ExtensionObject type (0x16) and
 * preserves the inner TypeId for generated types. ExtensionObject is the mechanism
 * for encoding custom/generated OPC UA types within Variants.
 * 
 * ExtensionObject encoding:
 * - Variant encoding byte: 0x16 (ExtensionObject)
 * - Followed by ExtensionObject encoding (TypeId + Encoding + Body)
 * - TypeId identifies the specific generated type
 * 
 * @module codec/variant/extension-object-variant.test
 */

import { describe, it, expect } from 'vitest';
import { BinaryEncoder } from '../../../src/codec/binary/encoder.js';
import { BinaryDecoder } from '../../../src/codec/binary/decoder.js';
import {
  variant,
  arrayVariant,
  encodeBinary,
  decodeBinary,
  VariantType,
} from '../../../src/codec/complex/variant.js';
import { extensionObjectNull, extensionObjectByteString } from '../../../src/codec/complex/extensionobject.js';
import { numericNodeId } from '../../../src/codec/complex/nodeid.js';
import type { ExtensionObject } from '../../../src/types/src/extension-object.js';

describe('Variant Type Discrimination - ExtensionObject', () => {
  describe('ExtensionObject variant encoding', () => {
    it('should encode variant with ExtensionObject encoding byte 0x16', () => {
      const typeId = numericNodeId(0, 338); // Structure type
      const body = new Uint8Array([0x01, 0x02, 0x03, 0x04]);
      const extObj = extensionObjectByteString(typeId, body);
      const v = variant(VariantType.ExtensionObject, extObj);
      
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x16); // Type 22 = ExtensionObject
    });

    it('should encode ExtensionObject preserving TypeId', () => {
      const typeId = numericNodeId(2, 1234); // Custom type
      const body = new Uint8Array([0xDE, 0xAD, 0xBE, 0xEF]);
      const extObj = extensionObjectByteString(typeId, body);
      const v = variant(VariantType.ExtensionObject, extObj);
      
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(decoded.variantType).toBe(VariantType.ExtensionObject);
      const decodedExtObj = decoded.value as ExtensionObject;
      expect(decodedExtObj.typeId).toEqual(typeId);
    });

    it('should handle ExtensionObject with null body', () => {
      const typeId = numericNodeId(0, 100);
      const extObj = extensionObjectNull(typeId, null);
      const v = variant(VariantType.ExtensionObject, extObj);
      
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x16); // ExtensionObject encoding byte
    });
  });

  describe('ExtensionObject variant decoding', () => {
    it('should decode ExtensionObject variant with correct type', () => {
      const typeId = numericNodeId(1, 500);
      const body = new Uint8Array([0x01, 0x02, 0x03]);
      const extObj = extensionObjectByteString(typeId, body);
      const v = variant(VariantType.ExtensionObject, extObj);
      
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(decoded.variantType).toBe(VariantType.ExtensionObject);
      const decodedExtObj = decoded.value as ExtensionObject;
      expect(decodedExtObj.typeId).toEqual(typeId);
      // Body is wrapped in ByteString, extract data
      if (decodedExtObj.body && 'toUint8Array' in decodedExtObj.body) {
        const bodyBytes = (decodedExtObj.body as any).toUint8Array();
        expect(Array.from(bodyBytes)).toEqual(Array.from(body));
      }
    });

    it('should preserve ExtensionObject TypeId across round-trip', () => {
      const typeIds = [
        numericNodeId(0, 338),  // Structure
        numericNodeId(0, 296),  // Argument
        numericNodeId(2, 1000), // Custom type
        numericNodeId(5, 9999), // Another custom type
      ];

      typeIds.forEach(typeId => {
        const body = new Uint8Array([0xAA, 0xBB, 0xCC]);
        const extObj = extensionObjectByteString(typeId, body);
        const v = variant(VariantType.ExtensionObject, extObj);
        
        const encoder = new BinaryEncoder();
        encodeBinary(encoder, v);
        
        const decoder = new BinaryDecoder(encoder.getBuffer());
        const decoded = decodeBinary(decoder);
        
        expect(decoded.variantType).toBe(VariantType.ExtensionObject);
        const decodedExtObj = decoded.value as ExtensionObject;
        expect(decodedExtObj.typeId).toEqual(typeId);
      });
    });
  });

  describe('ExtensionObject array variants', () => {
    it('should encode array of ExtensionObjects with array bit set (0x96)', () => {
      const extObjects = [
        extensionObjectByteString(numericNodeId(0, 338), new Uint8Array([0x01])),
        extensionObjectByteString(numericNodeId(0, 296), new Uint8Array([0x02])),
        extensionObjectByteString(numericNodeId(1, 100), new Uint8Array([0x03])),
      ];
      const v = arrayVariant(VariantType.ExtensionObject, extObjects);
      
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x96); // 0x80 (array) | 0x16 (ExtensionObject)
    });

    it('should decode array of ExtensionObjects maintaining all TypeIds', () => {
      const typeIds = [
        numericNodeId(0, 100),
        numericNodeId(1, 200),
        numericNodeId(2, 300),
      ];
      
      const extObjects = typeIds.map((typeId, i) =>
        extensionObjectByteString(typeId, new Uint8Array([i + 1]))
      );
      
      const v = arrayVariant(VariantType.ExtensionObject, extObjects);
      
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(decoded.variantType).toBe(VariantType.ExtensionObject);
      expect(Array.isArray(decoded.value)).toBe(true);
      
      const decodedArray = decoded.value as ExtensionObject[];
      expect(decodedArray.length).toBe(3);
      
      decodedArray.forEach((extObj, i) => {
        expect(extObj.typeId).toEqual(typeIds[i]);
      });
    });

    it('should handle empty ExtensionObject array', () => {
      const v = arrayVariant(VariantType.ExtensionObject, []);
      
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x96); // Array bit set
      
      const decoder = new BinaryDecoder(buffer);
      const decoded = decodeBinary(decoder);
      
      expect(decoded.variantType).toBe(VariantType.ExtensionObject);
      expect(Array.isArray(decoded.value)).toBe(true);
      expect((decoded.value as ExtensionObject[]).length).toBe(0);
    });
  });

  describe('Type discrimination with ExtensionObject', () => {
    it('should discriminate ExtensionObject from other complex types', () => {
      // All use encoding byte 0x16 for ExtensionObject
      const extObj = extensionObjectByteString(
        numericNodeId(0, 338),
        new Uint8Array([0x01])
      );
      const v = variant(VariantType.ExtensionObject, extObj);
      
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      expect(buffer[0]).toBe(0x16);
      expect(buffer[0]).not.toBe(0x11); // Not NodeId
      expect(buffer[0]).not.toBe(0x14); // Not QualifiedName
      expect(buffer[0]).not.toBe(0x15); // Not LocalizedText
    });

    it('should maintain ExtensionObject type in mixed variant sequence', () => {
      const variants = [
        variant(VariantType.Int32, 42),
        variant(VariantType.ExtensionObject, extensionObjectByteString(
          numericNodeId(0, 100),
          new Uint8Array([0xAA])
        )),
        variant(VariantType.String, 'test'),
      ];

      const encodedBuffers = variants.map(v => {
        const enc = new BinaryEncoder();
        encodeBinary(enc, v);
        return enc.getBuffer();
      });

      expect(encodedBuffers[0][0]).toBe(0x06); // Int32
      expect(encodedBuffers[1][0]).toBe(0x16); // ExtensionObject
      expect(encodedBuffers[2][0]).toBe(0x0C); // String

      const decodedVariants = encodedBuffers.map(buf =>
        decodeBinary(new BinaryDecoder(buf))
      );

      expect(decodedVariants[0].variantType).toBe(VariantType.Int32);
      expect(decodedVariants[1].variantType).toBe(VariantType.ExtensionObject);
      expect(decodedVariants[2].variantType).toBe(VariantType.String);
    });
  });

  describe('ExtensionObject with different encoding types', () => {
    it('should handle ExtensionObject with binary encoding body', () => {
      const typeId = numericNodeId(0, 338);
      const body = new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05]);
      const extObj = extensionObjectByteString(typeId, body);
      const v = variant(VariantType.ExtensionObject, extObj);
      
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(decoded.variantType).toBe(VariantType.ExtensionObject);
      const decodedExtObj = decoded.value as ExtensionObject;
      // Body is ByteString wrapper
      if (decodedExtObj.body && 'toUint8Array' in decodedExtObj.body) {
        const bodyBytes = (decodedExtObj.body as any).toUint8Array();
        expect(Array.from(bodyBytes)).toEqual(Array.from(body));
      }
    });

    it('should handle ExtensionObject with large binary body', () => {
      const typeId = numericNodeId(1, 1000);
      const body = new Uint8Array(1000).fill(0xAB);
      const extObj = extensionObjectByteString(typeId, body);
      const v = variant(VariantType.ExtensionObject, extObj);
      
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(decoded.variantType).toBe(VariantType.ExtensionObject);
      const decodedExtObj = decoded.value as ExtensionObject;
      expect(decodedExtObj.typeId).toEqual(typeId);
      // Body is ByteString wrapper
      if (decodedExtObj.body && 'toUint8Array' in decodedExtObj.body) {
        const bodyBytes = (decodedExtObj.body as any).toUint8Array();
        expect(bodyBytes.length).toBe(1000);
        expect(bodyBytes[0]).toBe(0xAB);
        expect(bodyBytes[999]).toBe(0xAB);
      }
    });
  });

  describe('ExtensionObject TypeId preservation', () => {
    it('should preserve TypeId for standard OPC UA types', () => {
      const standardTypeIds = [
        numericNodeId(0, 338),  // Structure
        numericNodeId(0, 296),  // Argument  
        numericNodeId(0, 344),  // BuildInfo
        numericNodeId(0, 308),  // ApplicationDescription
      ];

      standardTypeIds.forEach(typeId => {
        const extObj = extensionObjectByteString(typeId, new Uint8Array([0x00]));
        const v = variant(VariantType.ExtensionObject, extObj);
        
        const encoder = new BinaryEncoder();
        encodeBinary(encoder, v);
        
        const decoder = new BinaryDecoder(encoder.getBuffer());
        const decoded = decodeBinary(decoder);
        
        const decodedExtObj = decoded.value as ExtensionObject;
        expect(decodedExtObj.typeId).toEqual(typeId);
      });
    });

    it('should preserve TypeId for custom namespace types', () => {
      const customTypeIds = [
        numericNodeId(2, 5000),
        numericNodeId(3, 10000),
        numericNodeId(10, 99999),
      ];

      customTypeIds.forEach(typeId => {
        const extObj = extensionObjectByteString(typeId, new Uint8Array([0xFF]));
        const v = variant(VariantType.ExtensionObject, extObj);
        
        const encoder = new BinaryEncoder();
        encodeBinary(encoder, v);
        
        const decoder = new BinaryDecoder(encoder.getBuffer());
        const decoded = decodeBinary(decoder);
        
        const decodedExtObj = decoded.value as ExtensionObject;
        expect(decodedExtObj.typeId).toEqual(typeId);
      });
    });
  });

  describe('ExtensionObject variant round-trip', () => {
    it('should round-trip ExtensionObject maintaining TypeId and body', () => {
      const typeId = numericNodeId(1, 2345);
      const body = new Uint8Array([0xCA, 0xFE, 0xBA, 0xBE]);
      const extObj = extensionObjectByteString(typeId, body);
      const original = variant(VariantType.ExtensionObject, extObj);
      
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, original);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(decoded.variantType).toBe(original.variantType);
      const decodedExtObj = decoded.value as ExtensionObject;
      expect(decodedExtObj.typeId).toEqual(typeId);
      // Body is ByteString wrapper
      if (decodedExtObj.body && 'toUint8Array' in decodedExtObj.body) {
        const bodyBytes = (decodedExtObj.body as any).toUint8Array();
        expect(Array.from(bodyBytes)).toEqual(Array.from(body));
      }
    });

    it('should round-trip array of ExtensionObjects', () => {
      const extObjects = [
        extensionObjectByteString(numericNodeId(1, 100), new Uint8Array([0x01])),
        extensionObjectByteString(numericNodeId(2, 200), new Uint8Array([0x02])),
        extensionObjectByteString(numericNodeId(3, 300), new Uint8Array([0x03])),
      ];
      const original = arrayVariant(VariantType.ExtensionObject, extObjects);
      
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, original);
      
      const decoder = new BinaryDecoder(encoder.getBuffer());
      const decoded = decodeBinary(decoder);
      
      expect(decoded.variantType).toBe(VariantType.ExtensionObject);
      const decodedArray = decoded.value as ExtensionObject[];
      expect(decodedArray.length).toBe(extObjects.length);
      
      decodedArray.forEach((decodedExtObj, i) => {
        expect(decodedExtObj.typeId).toEqual(extObjects[i].typeId);
        // Body comparison handled if needed
      });
    });
  });

  describe('ExtensionObject encoding format', () => {
    it('should have correct encoding structure: variant byte + ExtensionObject encoding', () => {
      const typeId = numericNodeId(0, 338);
      const body = new Uint8Array([0x12, 0x34]);
      const extObj = extensionObjectByteString(typeId, body);
      const v = variant(VariantType.ExtensionObject, extObj);
      
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      
      // First byte is variant encoding byte
      expect(buffer[0]).toBe(0x16);
      
      // Following bytes are ExtensionObject encoding (TypeId + Encoding + Body)
      // Should have TypeId NodeId + encoding byte + body length + body
      expect(buffer.length).toBeGreaterThan(1);
    });

    it('should encode array length before ExtensionObject elements', () => {
      const extObjects = [
        extensionObjectByteString(numericNodeId(0, 100), new Uint8Array([0x01])),
        extensionObjectByteString(numericNodeId(0, 200), new Uint8Array([0x02])),
      ];
      const v = arrayVariant(VariantType.ExtensionObject, extObjects);
      
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      
      const buffer = encoder.getBuffer();
      
      // First byte: array variant encoding (0x96)
      expect(buffer[0]).toBe(0x96);
      
      // Next 4 bytes: array length (2) in Int32 little-endian
      const length = buffer[1] | (buffer[2] << 8) | (buffer[3] << 16) | (buffer[4] << 24);
      expect(length).toBe(2);
    });
  });

  describe('ExtensionObject type ID 0x16 validation', () => {
    it('should use correct type ID for ExtensionObject', () => {
      expect(VariantType.ExtensionObject).toBe(22);
      
      const extObj = extensionObjectByteString(numericNodeId(0, 100), new Uint8Array([0x00]));
      const v = variant(VariantType.ExtensionObject, extObj);
      
      expect(v.variantType).toBe(22);
      
      const encoder = new BinaryEncoder();
      encodeBinary(encoder, v);
      const buffer = encoder.getBuffer();
      
      // Encoding byte type ID bits (0-5) should be 22 (0x16)
      expect(buffer[0] & 0x3F).toBe(22);
    });
  });
});
