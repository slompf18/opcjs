/**
 * OPC UA DiagnosticInfo Type (i=25)
 * 
 * DiagnosticInfo contains detailed diagnostic and debugging information
 * associated with operation results. It has a flexible structure that allows
 * for nested diagnostic information.
 * 
 * @see OPC UA Part 4, Section 7.12
 */

import { StatusCode } from './status-code.js';

/**
 * Represents OPC UA DiagnosticInfo.
 * 
 * DiagnosticInfo provides detailed diagnostic information about operation results.
 * It uses string tables to optimize the encoding of commonly used strings and
 * supports recursive nesting for complex diagnostic scenarios.
 * 
 * @example
 * ```typescript
 * import { DiagnosticInfo } from '@opcua/types';
 * 
 * // Create diagnostic info with additional text
 * const diagInfo = new DiagnosticInfo({
 *   symbolicId: 0,
 *   additionalInfo: 'Connection timeout occurred'
 * });
 * 
 * // Create nested diagnostic info
 * const innerDiag = new DiagnosticInfo({
 *   additionalInfo: 'Socket closed unexpectedly'
 * });
 * const outerDiag = new DiagnosticInfo({
 *   additionalInfo: 'Network error',
 *   innerStatusCode: 0x80010000,
 *   innerDiagnosticInfo: innerDiag
 * });
 * ```
 */
export class DiagnosticInfo {
  /**
   * Index into a string table for the symbolic identifier.
   * The symbolic id is used to identify an error condition in a vendor-specific way.
   */
  public readonly symbolicId: number | null;

  /**
   * Index into a string table for the namespace URI.
   * Identifies the namespace that defines the symbolicId.
   */
  public readonly namespaceUri: number | null;

  /**
   * Index into a string table for the localized text.
   * Contains a human-readable description of the error.
   */
  public readonly localizedText: number | null;

  /**
   * Index into a string table for the locale.
   * Identifies the locale used for the localizedText.
   */
  public readonly locale: number | null;

  /**
   * Additional debugging/diagnostic information.
   * Not intended for display to end users.
   */
  public readonly additionalInfo: string | null;

  /**
   * StatusCode from a nested operation.
   * Used when the diagnostic info relates to a nested operation result.
   */
  public readonly innerStatusCode: StatusCode | null;

  /**
   * Nested DiagnosticInfo.
   * Allows for recursive diagnostic information structures.
   */
  public readonly innerDiagnosticInfo: DiagnosticInfo | null;

  /**
   * Creates a new DiagnosticInfo.
   * 
   * @param options - Optional diagnostic information fields
   */
  constructor(options: {
    symbolicId?: number | null;
    namespaceUri?: number | null;
    localizedText?: number | null;
    locale?: number | null;
    additionalInfo?: string | null;
    innerStatusCode?: StatusCode | null;
    innerDiagnosticInfo?: DiagnosticInfo | null;
  } = {}) {
    this.symbolicId = options.symbolicId ?? null;
    this.namespaceUri = options.namespaceUri ?? null;
    this.localizedText = options.localizedText ?? null;
    this.locale = options.locale ?? null;
    this.additionalInfo = options.additionalInfo ?? null;
    this.innerStatusCode = options.innerStatusCode ?? null;
    this.innerDiagnosticInfo = options.innerDiagnosticInfo ?? null;
  }

  /**
   * Creates an empty DiagnosticInfo with no fields set.
   * 
   * @returns A new DiagnosticInfo with all fields null
   */
  public static createEmpty(): DiagnosticInfo {
    return new DiagnosticInfo({});
  }

  /**
   * Creates a DiagnosticInfo with just additional info text.
   * 
   * @param additionalInfo - The diagnostic information text
   * @returns A new DiagnosticInfo with only additionalInfo set
   */
  public static fromText(additionalInfo: string): DiagnosticInfo {
    return new DiagnosticInfo({ additionalInfo });
  }

  /**
   * Checks if this DiagnosticInfo is empty (all fields null).
   * 
   * @returns True if all fields are null
   */
  public isEmpty(): boolean {
    return (
      this.symbolicId === null &&
      this.namespaceUri === null &&
      this.localizedText === null &&
      this.locale === null &&
      this.additionalInfo === null &&
      this.innerStatusCode === null &&
      this.innerDiagnosticInfo === null
    );
  }

  /**
   * Checks if this DiagnosticInfo has nested diagnostic information.
   * 
   * @returns True if innerDiagnosticInfo is not null
   */
  public hasInnerDiagnostics(): boolean {
    return this.innerDiagnosticInfo !== null;
  }

  /**
   * Gets the depth of nested diagnostic information.
   * 
   * @returns The nesting depth (0 if no inner diagnostics)
   */
  public getDepth(): number {
    if (this.innerDiagnosticInfo === null) {
      return 0;
    }
    return 1 + this.innerDiagnosticInfo.getDepth();
  }

  /**
   * Flattens the nested diagnostic information into an array.
   * 
   * @returns An array of all DiagnosticInfo objects in the chain
   */
  public flatten(): DiagnosticInfo[] {
    const result: DiagnosticInfo[] = [this];
    if (this.innerDiagnosticInfo !== null) {
      result.push(...this.innerDiagnosticInfo.flatten());
    }
    return result;
  }

  /**
   * Converts the DiagnosticInfo to a string representation.
   * 
   * @param includeInner - Whether to include inner diagnostic info (default: true)
   * @returns A string representation
   */
  public toString(includeInner: boolean = true): string {
    if (this.isEmpty()) {
      return 'DiagnosticInfo(empty)';
    }

    const parts: string[] = [];

    if (this.symbolicId !== null) {
      parts.push(`symbolicId: ${this.symbolicId}`);
    }

    if (this.namespaceUri !== null) {
      parts.push(`namespaceUri: ${this.namespaceUri}`);
    }

    if (this.localizedText !== null) {
      parts.push(`localizedText: ${this.localizedText}`);
    }

    if (this.locale !== null) {
      parts.push(`locale: ${this.locale}`);
    }

    if (this.additionalInfo !== null) {
      parts.push(`additionalInfo: "${this.additionalInfo}"`);
    }

    if (this.innerStatusCode !== null) {
      parts.push(`innerStatusCode: ${this.innerStatusCode.toString()}`);
    }

    if (includeInner && this.innerDiagnosticInfo !== null) {
      parts.push(`innerDiagnosticInfo: ${this.innerDiagnosticInfo.toString(true)}`);
    }

    return `DiagnosticInfo(${parts.join(', ')})`;
  }

  /**
   * Checks equality with another DiagnosticInfo.
   * 
   * @param other - The DiagnosticInfo to compare with
   * @returns True if equal
   */
  public equals(other: DiagnosticInfo): boolean {
    if (this.symbolicId !== other.symbolicId) {
      return false;
    }

    if (this.namespaceUri !== other.namespaceUri) {
      return false;
    }

    if (this.localizedText !== other.localizedText) {
      return false;
    }

    if (this.locale !== other.locale) {
      return false;
    }

    if (this.additionalInfo !== other.additionalInfo) {
      return false;
    }

    if (this.innerStatusCode !== other.innerStatusCode) {
      // Compare StatusCode objects if both exist
      if (this.innerStatusCode !== null && other.innerStatusCode !== null) {
        if (!this.innerStatusCode.equals(other.innerStatusCode)) {
          return false;
        }
      } else {
        return false;
      }
    }

    // Compare inner diagnostic info recursively
    if (this.innerDiagnosticInfo !== null && other.innerDiagnosticInfo !== null) {
      return this.innerDiagnosticInfo.equals(other.innerDiagnosticInfo);
    }

    return this.innerDiagnosticInfo === other.innerDiagnosticInfo;
  }
}
