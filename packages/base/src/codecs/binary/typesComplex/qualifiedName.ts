/**
 * @fileoverview QualifiedName type definition and encoder/decoder
 * @module codec/complex/qualified-name
 * 
 * QualifiedName represents a name qualified by a namespace index.
 * 
 * @see OPC 10000-6 Section 5.2.2.13 - QualifiedName
 * @see OPC 10000-3 Section 7.18 - QualifiedName
 */

// Encode/decode logic has been inlined into BinaryEncoder.writeQualifiedName and BinaryDecoder.readQualifiedName.
// See src/codec/binary/codecs/encoder.ts and decoder.ts.
