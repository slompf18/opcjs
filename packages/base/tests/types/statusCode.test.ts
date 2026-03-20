/**
 * Unit tests for StatusCode helpers.
 *
 * Three representative codes are exercised:
 *   Good          (0x00000000) – nominal good result, no flags
 *   BadInvalidArgument (0x80AB0000) – a named Bad code, no flags
 *   1024 (0x00000400) – Good base code with LimitHigh flag bit set
 */

import { describe, expect, it } from 'vitest'

import {
  StatusCode,
  StatusCodeGetFlagBits,
  StatusCodeIs,
  StatusCodeToString,
  StatusCodeToStringNumber,
} from '../../src/types/statusCode.js'

// ---------------------------------------------------------------------------
// StatusCodeToString
// ---------------------------------------------------------------------------

describe('StatusCodeToString', () => {
  it('returns "Good" for 0x00000000', () => {
    expect(StatusCodeToString(StatusCode.Good)).toBe('Good')
  })

  it('returns "BadInvalidArgument" for 0x80AB0000', () => {
    expect(StatusCodeToString(0x80ab0000)).toBe('BadInvalidArgument')
  })

  it('returns "Good" for 1024 (flag bits masked off)', () => {
    expect(StatusCodeToString(1024)).toBe('Good')
  })

  it('returns "Unknown" for undefined', () => {
    expect(StatusCodeToString(undefined)).toBe('Unknown')
  })
})

// ---------------------------------------------------------------------------
// StatusCodeToStringNumber
// ---------------------------------------------------------------------------

describe('StatusCodeToStringNumber', () => {
  it('returns "0x00000000" for Good', () => {
    expect(StatusCodeToStringNumber(StatusCode.Good)).toBe('0x00000000')
  })

  it('returns "0x80AB0000" for 0x80AB0000', () => {
    expect(StatusCodeToStringNumber(0x80ab0000)).toBe('0x80AB0000')
  })

  it('returns "0x00000400" for 1024', () => {
    expect(StatusCodeToStringNumber(1024)).toBe('0x00000400')
  })

  it('returns "0xUNKNOWN" for undefined', () => {
    expect(StatusCodeToStringNumber(undefined)).toBe('0xUNKNOWN')
  })
})

// ---------------------------------------------------------------------------
// StatusCodeIs
// ---------------------------------------------------------------------------

describe('StatusCodeIs', () => {
  it('Good matches Good', () => {
    expect(StatusCodeIs(StatusCode.Good, StatusCode.Good)).toBe(true)
  })

  it('0x80AB0000 matches BadInvalidArgument', () => {
    expect(StatusCodeIs(0x80ab0000, StatusCode.BadInvalidArgument)).toBe(true)
  })

  it('0x80AB0000 does not match Good', () => {
    expect(StatusCodeIs(0x80ab0000, StatusCode.Good)).toBe(false)
  })

  it('1024 matches Good (flag bits are ignored)', () => {
    expect(StatusCodeIs(1024, StatusCode.Good)).toBe(true)
  })

  it('0x80AB0000 does not match Good', () => {
    expect(StatusCodeIs(0x80ab0000, StatusCode.Good)).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// StatusCodeGetFlagBits
// ---------------------------------------------------------------------------

describe('StatusCodeGetFlagBits', () => {
  it('Good has all flag bits false', () => {
    expect(StatusCodeGetFlagBits(StatusCode.Good)).toEqual({
      StructureChanged: false,
      SemanticsChanged: false,
      Overflow: false,
      LimitLow: false,
      LimitHigh: false,
      LimitConstant: false,
    })
  })

  it('0x80AB0000 has all flag bits false', () => {
    expect(StatusCodeGetFlagBits(0x80ab0000)).toEqual({
      StructureChanged: false,
      SemanticsChanged: false,
      Overflow: false,
      LimitLow: false,
      LimitHigh: false,
      LimitConstant: false,
    })
  })

  it('1024 (0x00000400) has LimitHigh set', () => {
    expect(StatusCodeGetFlagBits(1024)).toEqual({
      StructureChanged: false,
      SemanticsChanged: false,
      Overflow: false,
      LimitLow: false,
      LimitHigh: true,
      LimitConstant: false,
    })
  })
})
