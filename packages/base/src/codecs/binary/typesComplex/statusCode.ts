/**
 * @fileoverview StatusCode type definition and encoder/decoder
 * @module codec/complex/statuscode
 * 
 * StatusCode represents a 32-bit status/error code with severity and subcodes.
 * 
 * @see OPC 10000-6 Section 5.2.2.16 - StatusCode
 * @see OPC 10000-4 Section 7.39 - StatusCode
 */

// Encode/decode logic has been inlined into BinaryEncoder.writeStatusCode and BinaryDecoder.readStatusCode.
// See src/codec/binary/codecs/encoder.ts and decoder.ts.



