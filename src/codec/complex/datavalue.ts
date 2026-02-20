/**
 * @fileoverview DataValue type definition and encoder/decoder
 * @module codec/complex/datavalue
 * 
 * DataValue represents a value with associated metadata (status, timestamps).
 * This is the primary container for process data in OPC UA.
 * 
 * @see OPC 10000-6 Section 5.2.2.17 - DataValue
 * @see OPC 10000-4 Section 7.11 - DataValue
 * @see FR-021 - DataValue encoding mask
 */

import { IEncoder } from '../interfaces/encoder.js';
import { IDecoder } from '../interfaces/decoder.js';
import { CodecFacade } from '../facade.js';
import { EncodingFormat } from '../types.js';
import { DataValue } from '../../types/src/index.js';
import { StatusCode } from './statuscode.js';
import { Variant } from './variant.js';

export { DataValue, StatusCode };

/**
 * DataValue encoding mask bits per OPC 10000-6 Table 26
 */
export const enum DataValueMask {
  Value = 0x01,              // Bit 0: Value is present
  StatusCode = 0x02,         // Bit 1: StatusCode is present
  SourceTimestamp = 0x04,    // Bit 2: SourceTimestamp is present
  ServerTimestamp = 0x08,    // Bit 3: ServerTimestamp is present
  SourcePicoseconds = 0x10,  // Bit 4: SourcePicoseconds is present
  ServerPicoseconds = 0x20   // Bit 5: ServerPicoseconds is present
}

/**
 * Encode a DataValue in Binary format.
 * 
 * Encoding format per OPC 10000-6 Table 26:
 * - EncodingMask: Byte
 * - Value: Variant (if bit 0 set) - simplified as primitive for now
 * - StatusCode: UInt32 (if bit 1 set)
 * - SourceTimestamp: DateTime (if bit 2 set)
 * - ServerTimestamp: DateTime (if bit 3 set)
 * - SourcePicoseconds: UInt16 (if bit 4 set)
 * - ServerPicoseconds: UInt16 (if bit 5 set)
 * 
 * @param encoder The binary encoder
 * @param value The DataValue to encode
 * @param encodeValue Optional function to encode the value field
 * 
 * @see OPC 10000-6 Table 26 - DataValue encoding
 * @see FR-021 - DataValue encoding mask
 */
export function encodeBinary(
  encoder: IEncoder,
  value: DataValue,
  encodeValue?: (encoder: IEncoder, val: any) => void
): void {
  // Calculate encoding mask
  let encodingMask = 0;
  
  if (value.value !== null && value.value !== undefined) {
    encodingMask |= DataValueMask.Value;
  }
  
  if (value.statusCode !== null) {
    encodingMask |= DataValueMask.StatusCode;
  }
  
  if (value.sourceTimestamp !== null) {
    encodingMask |= DataValueMask.SourceTimestamp;
  }
  
  if (value.serverTimestamp !== null) {
    encodingMask |= DataValueMask.ServerTimestamp;
  }
  
  if (value.sourcePicoseconds !== null) {
    encodingMask |= DataValueMask.SourcePicoseconds;
  }
  
  if (value.serverPicoseconds !== null) {
    encodingMask |= DataValueMask.ServerPicoseconds;
  }
  
  // Write encoding mask
  encoder.writeByte(encodingMask);
  
  // Write Value if present
  if (encodingMask & DataValueMask.Value) {
    if (encodeValue) {
      encodeValue(encoder, value.value);
    } else {
      // Simplified: encode as Int32 for testing
      // In full implementation, this would encode a Variant
      let actualValue: any = value.value;
      
      // If value is a Variant, extract the inner value
      if (actualValue instanceof Variant) {
        actualValue = actualValue.value;
      }
      
      if (typeof actualValue === 'number') {
        encoder.writeInt32(actualValue);
      } else {
        throw new Error('Value encoding requires encodeValue function for non-numeric types');
      }
    }
  }
  
  // Write StatusCode if present
  if (encodingMask & DataValueMask.StatusCode) {
    encoder.writeUInt32(value.statusCode!.getValue());
  }
  
  // Write SourceTimestamp if present
  if (encodingMask & DataValueMask.SourceTimestamp) {
    encoder.writeDateTime(value.sourceTimestamp!);
  }
  
  // Write ServerTimestamp if present
  if (encodingMask & DataValueMask.ServerTimestamp) {
    encoder.writeDateTime(value.serverTimestamp!);
  }
  
  // Write SourcePicoseconds if present
  if (encodingMask & DataValueMask.SourcePicoseconds) {
    encoder.writeUInt16(value.sourcePicoseconds!);
  }
  
  // Write ServerPicoseconds if present
  if (encodingMask & DataValueMask.ServerPicoseconds) {
    encoder.writeUInt16(value.serverPicoseconds!);
  }
}

/**
 * Decode a DataValue from Binary format.
 * 
 * @param decoder The binary decoder
 * @param decodeValue Optional function to decode the value field
 * @returns The decoded DataValue
 * 
 * @see OPC 10000-6 Table 26 - DataValue encoding
 */
export function decodeBinary(
  decoder: IDecoder,
  decodeValue?: (decoder: IDecoder) => any
): DataValue {
  // Read encoding mask
  const encodingMask = decoder.readByte();
  
  // Read Value if present
  let value: any = null;
  if (encodingMask & DataValueMask.Value) {
    if (decodeValue) {
      value = decodeValue(decoder);
    } else {
      // Simplified: decode as Int32
      value = decoder.readInt32();
    }
  }
  
  // Read StatusCode if present
  let statusCode: StatusCode | null = null;
  if (encodingMask & DataValueMask.StatusCode) {
    const code = decoder.readUInt32();
    statusCode = new StatusCode(code);
  }
  
  // Read SourceTimestamp if present
  let sourceTimestamp: Date | null = null;
  if (encodingMask & DataValueMask.SourceTimestamp) {
    sourceTimestamp = decoder.readDateTime();
  }
  
  // Read ServerTimestamp if present
  let serverTimestamp:  Date | null = null;
  if (encodingMask & DataValueMask.ServerTimestamp) {
    serverTimestamp = decoder.readDateTime();
  }
  
  // Read SourcePicoseconds if present
  let sourcePicoseconds: number | null = null;
  if (encodingMask & DataValueMask.SourcePicoseconds) {
    sourcePicoseconds = decoder.readUInt16();
  }
  
  // Read ServerPicoseconds if present
  let serverPicoseconds: number | null = null;
  if (encodingMask & DataValueMask.ServerPicoseconds) {
    serverPicoseconds = decoder.readUInt16();
  }
  
  return new DataValue(
    value,
    statusCode,
    sourceTimestamp,
    serverTimestamp,
    sourcePicoseconds,
    serverPicoseconds
  );
}

/**
 * Register DataValue type with CodecFacade.
 */
export function registerDataValue(facade: CodecFacade): void {
  facade.registerType('DataValue', 'i=23', EncodingFormat.Binary, 
    (encoder, value: DataValue) => encodeBinary(encoder, value),
    (decoder): DataValue => decodeBinary(decoder)
  );
}

/**
 * Helper function to create a DataValue.
 */
export function dataValue(
  value: Variant | null,
  statusCode: StatusCode | number | null = null,
  sourceTimestamp: Date | null = null,
  serverTimestamp: Date | null = null,
  sourcePicoseconds: number | null = null,
  serverPicoseconds: number | null = null
): DataValue {
  // Convert number statusCode to StatusCode if needed (backward compat)
  const sc = typeof statusCode === 'number' ? new StatusCode(statusCode) : statusCode;
  return new DataValue(
    value,
    sc,
    sourceTimestamp,
    serverTimestamp,
    sourcePicoseconds,
    serverPicoseconds
  );
}
