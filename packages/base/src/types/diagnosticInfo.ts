/**
 * OPC UA DiagnosticInfo Type (i=25)
 * 
 * DiagnosticInfo contains detailed diagnostic and debugging information
 * associated with operation results. It has a flexible structure that allows
 * for nested diagnostic information.
 * 
 * @see OPC UA Part 4, Section 7.12
 */

import { StatusCode } from './statusCode.js';

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
  public readonly symbolicId: number | undefined;

  /**
   * Index into a string table for the namespace URI.
   * Identifies the namespace that defines the symbolicId.
   */
  public readonly namespaceUri: number | undefined;

  /**
   * Index into a string table for the localized text.
   * Contains a human-readable description of the error.
   */
  public readonly localizedText: number | undefined;

  /**
   * Index into a string table for the locale.
   * Identifies the locale used for the localizedText.
   */
  public readonly locale: number | undefined;

  /**
   * Additional debugging/diagnostic information.
   * Not intended for display to end users.
   */
  public readonly additionalInfo: string | undefined;

  /**
   * StatusCode from a nested operation.
   * Used when the diagnostic info relates to a nested operation result.
   */
  public readonly innerStatusCode: StatusCode | undefined;

  /**
   * Nested DiagnosticInfo.
   * Allows for recursive diagnostic information structures.
   */
  public readonly innerDiagnosticInfo: DiagnosticInfo | undefined;

  /**
   * Creates a new DiagnosticInfo.
   * 
   * @param options - Optional diagnostic information fields
   */
  constructor(options: {
    symbolicId?: number;
    namespaceUri?: number;
    localizedText?: number;
    locale?: number;
    additionalInfo?: string;
    innerStatusCode?: StatusCode;
    innerDiagnosticInfo?: DiagnosticInfo;
  } = {}) {
    this.symbolicId = options.symbolicId;
    this.namespaceUri = options.namespaceUri;
    this.localizedText = options.localizedText;
    this.locale = options.locale;
    this.additionalInfo = options.additionalInfo;
    this.innerStatusCode = options.innerStatusCode;
    this.innerDiagnosticInfo = options.innerDiagnosticInfo;
  }

  /**
   * Creates an empty DiagnosticInfo with no fields set.
   * 
   * @returns A new DiagnosticInfo with all fields undefined
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
   * Checks if this DiagnosticInfo is empty (all fields undefined).
   * 
   * @returns True if all fields are undefined
   */
  public isEmpty(): boolean {
    return (
      this.symbolicId === undefined &&
      this.namespaceUri === undefined &&
      this.localizedText === undefined &&
      this.locale === undefined &&
      this.additionalInfo === undefined &&
      this.innerStatusCode === undefined &&
      this.innerDiagnosticInfo === undefined
    );
  }

  /**
   * Checks if this DiagnosticInfo has nested diagnostic information.
   * 
   * @returns True if innerDiagnosticInfo is not undefined
   */
  public hasInnerDiagnostics(): boolean {
    return this.innerDiagnosticInfo !== undefined;
  }

  /**
   * Gets the depth of nested diagnostic information.
   * 
   * @returns The nesting depth (0 if no inner diagnostics)
   */
  public getDepth(): number {
    if (this.innerDiagnosticInfo === undefined) {
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
    if (this.innerDiagnosticInfo !== undefined) {
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

    if (this.symbolicId !== undefined) {
      parts.push(`symbolicId: ${this.symbolicId}`);
    }

    if (this.namespaceUri !== undefined) {
      parts.push(`namespaceUri: ${this.namespaceUri}`);
    }

    if (this.localizedText !== undefined) {
      parts.push(`localizedText: ${this.localizedText}`);
    }

    if (this.locale !== undefined) {
      parts.push(`locale: ${this.locale}`);
    }

    if (this.additionalInfo !== undefined) {
      parts.push(`additionalInfo: "${this.additionalInfo}"`);
    }

    if (this.innerStatusCode !== undefined) {
      parts.push(`innerStatusCode: ${this.innerStatusCode.toString()}`);
    }

    if (includeInner && this.innerDiagnosticInfo !== undefined) {
      parts.push(`innerDiagnosticInfo: ${this.innerDiagnosticInfo.toString(true)}`);
    }

    return `DiagnosticInfo(${parts.join(', ')})`;
  }
}
