/**
 * OPC UA QualifiedName Type
 * 
 * QualifiedName combines a namespace index with a name string,
 * allowing names to be qualified within a specific namespace.
 * 
 * @module qualified-name
 */

/**
 * OPC UA QualifiedName
 * 
 * A QualifiedName consists of a namespace index and a name string.
 * This allows the same name to be used in different namespaces without conflict.
 * 
 * @example
 * ```typescript
 * const qname = new QualifiedName(2, "Temperature");
 * console.log(qname.toString()); // "2:Temperature"
 * 
 * const defaultNs = new QualifiedName(0, "ServerStatus");
 * console.log(defaultNs.toString()); // "0:ServerStatus"
 * ```
 */
export class QualifiedName {
  /**
   * The namespace index (0-65535)
   */
  readonly namespaceIndex: number;
  
  /**
   * The name string
   */
  readonly name: string;

  /**
   * Create a new QualifiedName
   * 
   * @param namespaceIndex - The namespace index (default: 0)
   * @param name - The name string
   */
  constructor(namespaceIndex: number = 0, name: string = '') {
    if (namespaceIndex < 0 || namespaceIndex > 65535) {
      throw new Error(`Invalid namespace index: ${namespaceIndex}. Must be 0-65535.`);
    }
    this.namespaceIndex = namespaceIndex;
    this.name = name;
  }

  /**
   * Convert QualifiedName to string representation
   * 
   * @returns String representation in format "ns:name"
   * 
   * @example
   * ```typescript
   * new QualifiedName(2, "Temp").toString(); // "2:Temp"
   * ```
   */
  toString(): string {
    return `${this.namespaceIndex}:${this.name}`;
  }

  /**
   * Check equality with another QualifiedName
   * 
   * @param other - The other QualifiedName to compare
   * @returns true if both namespace index and name are equal
   */
  equals(other: QualifiedName): boolean {
    return this.namespaceIndex === other.namespaceIndex && this.name === other.name;
  }

  /**
   * Parse a QualifiedName from string representation
   * 
   * @param str - String in format "ns:name" (e.g., "2:Temperature")
   * @returns Parsed QualifiedName
   * 
   * @example
   * ```typescript
   * const qname = QualifiedName.parse("2:Temperature");
   * console.log(qname.namespaceIndex); // 2
   * console.log(qname.name);           // "Temperature"
   * ```
   */
  static parse(str: string): QualifiedName {
    const colonIndex = str.indexOf(':');
    if (colonIndex === -1) {
      throw new Error(`Invalid QualifiedName string: ${str}. Expected format "ns:name".`);
    }
    
    const nsStr = str.substring(0, colonIndex);
    const name = str.substring(colonIndex + 1);
    
    const namespaceIndex = parseInt(nsStr, 10);
    if (isNaN(namespaceIndex)) {
      throw new Error(`Invalid namespace index in QualifiedName: ${nsStr}`);
    }
    
    return new QualifiedName(namespaceIndex, name);
  }

  /**
   * Check if this is a null QualifiedName (ns=0, empty name)
   * 
   * @returns true if this is a null QualifiedName
   */
  isNull(): boolean {
    return this.namespaceIndex === 0 && this.name.length === 0;
  }
}
