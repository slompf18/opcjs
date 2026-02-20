/**
 * @fileoverview OPC UA Codec core types and enums
 * @module codec/types
 */

/**
 * Encoding format enumeration for OPC UA data encoding.
 * @see OPC 10000-6 Part 6 Section 5 - Data Encoding
 */
export enum EncodingFormat {
  /** Binary encoding per OPC 10000-6 Section 5.2 (little-endian, IEEE 754) */
  Binary = 'Binary',
  
  /** XML encoding per OPC 10000-6 Section 5.3 (well-formed XML) */
  Xml = 'Xml',
  
  /** JSON encoding per OPC 10000-6 Section 5.4 (RFC 8259 compliant) */
  Json = 'Json',
}

/**
 * Type-safe encoder function that serializes a value of type T.
 * @template T The type being encoded
 * @param encoder The encoder instance (IEncoder) to write to
 * @param value The value to encode
 */
export type TypeEncoder<T> = (encoder: any, value: T) => void;

/**
 * Type-safe decoder function that deserializes a value of type T.
 * @template T The type being decoded
 * @param decoder The decoder instance (IDecoder) to read from
 * @returns The decoded value
 */
export type TypeDecoder<T> = (decoder: any) => T;

/**
 * Encoding metadata for a registered type.
 */
export interface EncodingMetadata {
  /** The type name (e.g., 'Int32', 'NodeId') */
  typeName: string;
  
  /** The encoding ID as NodeId string (e.g., 'i=24' for Binary Int32) */
  encodingId: string;
  
  /** The encoding format (Binary, Xml, Json) */
  format: EncodingFormat;
  
  /** The encoder function for this type */
  encoder: TypeEncoder<any>;
  
  /** The decoder function for this type */
  decoder: TypeDecoder<any>;
}
