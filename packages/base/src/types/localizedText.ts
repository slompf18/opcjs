/**
 * OPC UA LocalizedText Type
 * 
 * LocalizedText represents human-readable text with an optional locale identifier.
 * 
 * @module localized-text
 */

/**
 * OPC UA LocalizedText
 * 
 * A LocalizedText contains a text string and an optional locale identifier
 * for internationalization support.
 * 
 * @example
 * ```typescript
 * const text = new LocalizedText("en-US", "Temperature Sensor");
 * console.log(text.toString()); // "[en-US] Temperature Sensor"
 * 
 * const defaultText = new LocalizedText(undefined, "Default Text");
 * console.log(defaultText.toString()); // "Default Text"
 * ```
 */
export class LocalizedText {
  /**
   * The locale identifier (e.g., "en-US", "de-DE")
   * If undefined, the text is locale-independent
   */
  readonly locale?: string;
  
  /**
   * The text string
   */
  readonly text: string;

  /**
   * Create a new LocalizedText
   * 
   * @param locale - Optional locale identifier (e.g., "en-US")
   * @param text - The text string
   */
  constructor(locale: string | undefined, text: string) {
    this.locale = locale;
    this.text = text;
  }

  /**
   * Create a LocalizedText with only text (no locale)
   * 
   * @param text - The text string
   * @returns LocalizedText with no locale specified
   * 
   * @example
   * ```typescript
   * const text = LocalizedText.fromText("Hello World");
   * ```
   */
  static fromText(text: string): LocalizedText {
    return new LocalizedText(undefined, text);
  }

  /**
   * Convert LocalizedText to string representation
   * 
   * @returns String representation of the LocalizedText
   * 
   * @example
   * ```typescript
   * new LocalizedText("en-US", "Hello").toString(); // "[en-US] Hello"
   * LocalizedText.fromText("Hello").toString();     // "Hello"
   * ```
   */
  toString(): string {
    if (this.locale) {
      return `[${this.locale}] ${this.text}`;
    }
    return this.text;
  }

  /**
   * Check equality with another LocalizedText
   * 
   * @param other - The other LocalizedText to compare
   * @returns true if both locale and text are equal
   */
  equals(other: LocalizedText): boolean {
    return this.locale === other.locale && this.text === other.text;
  }

  /**
   * Check if this LocalizedText has no content
   * 
   * @returns true if the text is empty
   */
  isEmpty(): boolean {
    return this.text.length === 0;
  }
}
