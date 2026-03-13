/**
 * OPC UA Primitive Type Mappings
 * 
 * Defines TypeScript type mappings for OPC UA primitive types.
 * Primitives map directly to native TypeScript types without wrapper classes.
 * 
 * @module primitives
 */

export type UaBoolean = boolean;
/**
 * OPC UA Builtin Type Numeric IDs
 * 
 * These correspond to the NodeId numeric identifiers defined in OPC UA Part 6, Table 1.
 */
export type UaSbyte = {value: number; readonly type: 'sbyte' };
export const uaSbyte = (value: number): UaSbyte => ({ value, type: 'sbyte' });

export type UaByte = {value: number; readonly type: 'byte' };
export const uaByte = (value: number): UaByte => ({ value, type: 'byte' });

export type UaInt16 = {value: number; readonly type: 'int16' };
export const uaInt16 = (value: number): UaInt16 => ({ value, type: 'int16' });

export type UaUint16 = {value: number; readonly type: 'uint16' };
export const uaUint16 = (value: number): UaUint16 => ({ value, type: 'uint16' });

export type UaInt32 = {value: number; readonly type: 'int32' };
export const uaInt32 = (value: number): UaInt32 => ({ value, type: 'int32' });

export type UaUint32 = {value: number; readonly type: 'uint32' };
export const uaUint32 = (value: number): UaUint32 => ({ value, type: 'uint32' });

export type UaInt64 = {value: bigint; readonly type: 'int64' };
export const uaInt64 = (value: bigint): UaInt64 => ({ value, type: 'int64' });

export type UaUint64 = {value: bigint; readonly type: 'uint64' };
export const uaUint64 = (value: bigint): UaUint64 => ({ value, type: 'uint64' });

export type UaFloat = {value: number; readonly type: 'float' };
export const uaFloat = (value: number): UaFloat => ({ value, type: 'float' });

export type UaDouble = {value: number; readonly type: 'double' };
export const uaDouble = (value: number): UaDouble => ({ value, type: 'double' });

/**
 * OPC UA String primitive type.
 *
 * A String in OPC UA can be null (encoded as length -1 in binary).
 * Using `string | null` instead of `string | undefined` aligns with the
 * OPC UA specification where null is an explicit, valid value distinct
 * from an empty string.
 */
export type UaString = string | null;

export type UaDateTime = Date

export type UaGuid = {value: string; readonly type: 'guid' };
export const uaGuid = (value: string): UaGuid => ({ value, type: 'guid' });

/**
 * OPC UA ByteString primitive type.
 *
 * A ByteString in OPC UA can be null (encoded as length -1 in binary).
 * Using `Uint8Array | null` instead of `Uint8Array | undefined` aligns
 * with the OPC UA specification where null is an explicit, valid value
 * distinct from an empty byte array.
 */
export type UaByteString = Uint8Array | null;

/**
 * Union of all OPC UA primitive types accepted by {@link Variant.newFrom}.
 */
export type UaPrimitive =
  | UaBoolean
  | UaSbyte
  | UaByte
  | UaInt16
  | UaUint16
  | UaInt32
  | UaUint32
  | UaInt64
  | UaUint64
  | UaFloat
  | UaDouble
  | UaString
  | UaDateTime
  | UaGuid
  | UaByteString;

