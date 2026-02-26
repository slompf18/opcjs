/**
 * OPC UA Variant Type (i=24)
 * 
 * A Variant is a union type that can hold any OPC UA builtin type value
 * with runtime type information.
 * 
 * @see OPC UA Part 6, Section 5.1.2
 */

import type { NodeId } from './nodeId.js';
import type { ExpandedNodeId } from './expandedNodeId.js';
import type { LocalizedText } from './localizedText.js';
import type { QualifiedName } from './qualifiedName.js';
import type { XmlElement } from './xmlElement.js';
import type { ExtensionObject } from './extensionObject.js';
import type { DataValue } from './dataValue.js';
import type { DiagnosticInfo } from './diagnosticInfo.js';
import { StatusCode } from './statusCode.js';

/**
 * Enumeration of variant types based on BuiltinType NodeIds.
 */
export enum VariantType {
  Null = 0,
  Boolean = 1,
  SByte = 2,
  Byte = 3,
  Int16 = 4,
  UInt16 = 5,
  Int32 = 6,
  UInt32 = 7,
  Int64 = 8,
  UInt64 = 9,
  Float = 10,
  Double = 11,
  String = 12,
  DateTime = 13,
  Guid = 14,
  ByteString = 15,
  XmlElement = 16,
  NodeId = 17,
  ExpandedNodeId = 18,
  StatusCode = 19,
  QualifiedName = 20,
  LocalizedText = 21,
  ExtensionObject = 22,
  DataValue = 23,
  Variant = 24,
  DiagnosticInfo = 25,
}

/**
 * Type union representing all possible variant values.
 */
export type VariantValue =
  | undefined
  | boolean
  | number
  | bigint
  | string
  | Date
  | Uint8Array
  | NodeId
  | ExpandedNodeId
  | QualifiedName
  | LocalizedText
  | Uint8Array
  | XmlElement
  | ExtensionObject
  | DataValue
  | StatusCode
  | DiagnosticInfo
  | Variant;

/**
 * Type for variant arrays.
 */
export type VariantArrayValue = VariantValue[] | VariantValue[][];

/**
 * Represents an OPC UA Variant value with runtime type information.
 * 
 * A Variant can hold a scalar value, an array, or a multi-dimensional array
 * of any OPC UA builtin type.
 * 
 * @example
 * ```typescript
 * // Create a variant with an integer value
 * const intVariant = new Variant(VariantType.Int32, 42);
 * 
 * // Create a variant with an array
 * const arrayVariant = new Variant(VariantType.Double, [1.1, 2.2, 3.3], [3]);
 * 
 * // Check if variant is an array
 * if (arrayVariant.isArray()) {
 *   console.log('Array dimensions:', arrayVariant.arrayDimensions);
 * }
 * ```
 */
export class Variant {
  /**
   * The variant type identifier.
   */
  public readonly variantType: VariantType;

  /**
   * The variant value (scalar or array).
   */
  public readonly value: VariantValue | VariantArrayValue;

  /**
   * Optional array dimensions for multi-dimensional arrays.
   * For 1D arrays, this is [length].
   * For 2D arrays, this is [rows, cols], etc.
   */
  public readonly arrayDimensions: number[] | undefined;

  /**
   * Creates a new Variant.
   * 
   * @param variantType - The type of value stored in the variant
   * @param value - The scalar or array value
   * @param arrayDimensions - Optional array dimensions for structured arrays
   */
  constructor(
    variantType: VariantType = VariantType.Null,
    value: VariantValue | VariantArrayValue = undefined,
    arrayDimensions: number[] | undefined = undefined
  ) {
    this.variantType = variantType;
    this.value = value;
    this.arrayDimensions = arrayDimensions;
  }

  /**
   * Creates a undefined variant.
   * 
   * @returns A new Variant with undefined value
   */
  public static createNull(): Variant {
    return new Variant(VariantType.Null);
  }

  /**
   * Checks if this variant is null.
   * 
   * @returns True if the variant type is Null
   */
  public isNull(): boolean {
    return this.variantType === VariantType.Null;
  }

  /**
   * Checks if this variant contains an array.
   * 
   * @returns True if the value is an array
   */
  public isArray(): boolean {
    return Array.isArray(this.value);
  }

  /**
   * Checks if this variant contains a scalar value.
   * 
   * @returns True if the value is not an array
   */
  public isScalar(): boolean {
    return !this.isArray();
  }

  /**
   * Gets the array length for 1D arrays.
   * 
   * @returns The array length, or 0 if not an array
   */
  public getArrayLength(): number {
    if (this.isArray() && Array.isArray(this.value)) {
      return this.value.length;
    }
    return 0;
  }

  /**
   * Checks equality with another Variant.
   * 
   * @param other - The variant to compare with
   * @returns True if variants are equal
   */
  public equals(other: Variant): boolean {
    if (this.variantType !== other.variantType) {
      return false;
    }

    // Compare array dimensions
    if (this.arrayDimensions !== undefined || other.arrayDimensions !== undefined) {
      if (this.arrayDimensions === undefined || other.arrayDimensions === undefined) {
        return false;
      }
      if (this.arrayDimensions.length !== other.arrayDimensions.length) {
        return false;
      }
      for (let i = 0; i < this.arrayDimensions.length; i++) {
        if (this.arrayDimensions[i] !== other.arrayDimensions[i]) {
          return false;
        }
      }
    }

    // For simple comparison, convert to string representation
    // A full implementation would need type-specific comparison logic
    return JSON.stringify(this.value) === JSON.stringify(other.value);
  }

  /**
   * Converts the variant to a string representation.
   * 
   * @returns A string representation of the variant
   */
  public toString(): string {
    const typeName = VariantType[this.variantType];
    
    if (this.isNull()) {
      return 'Variant(Null)';
    }

    if (this.isArray()) {
      const dimStr = this.arrayDimensions 
        ? `[${this.arrayDimensions.join(',')}]` 
        : '[?]';
      return `Variant(${typeName}${dimStr})`;
    }

    return `Variant(${typeName}: ${String(this.value)})`;
  }
}
