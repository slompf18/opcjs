/**
 * Unit tests for ServiceBase.checkServiceResult.
 *
 * Uses a minimal concrete subclass to expose the protected method without
 * touching any real network or OPC UA infrastructure.
 */

import { describe, expect, it, vi } from 'vitest'

import type { ISecureChannel } from 'opcjs-base'
import { MessageSecurityModeEnum, NodeId, StatusCode } from 'opcjs-base'

import { ServiceBase } from '../../src/services/serviceBase.js'
import { SessionInvalidError } from '../../src/sessions/sessionInvalidError.js'

/** Minimal subclass that exposes the protected helper under test. */
class TestService extends ServiceBase {
  callCheckServiceResult(result: number | undefined, context: string): void {
    this.checkServiceResult(result, context)
  }
}

function makeChannel(): ISecureChannel {
  return {
    issueServiceRequest: vi.fn(),
    getSecurityPolicy: () => 'http://opcfoundation.org/UA/SecurityPolicy#None',
    getSecurityMode: () => MessageSecurityModeEnum.None,
    getEndpointUrl: () => 'opc.wss://test',
  }
}

function makeService(): TestService {
  return new TestService(NodeId.newTwoByte(0), makeChannel())
}

describe('ServiceBase.checkServiceResult', () => {
  it('does not throw for Good status', () => {
    expect(() => makeService().callCheckServiceResult(StatusCode.Good, 'Op')).not.toThrow()
  })

  it('does not throw for undefined status', () => {
    expect(() => makeService().callCheckServiceResult(undefined, 'Op')).not.toThrow()
  })

  it('throws SessionInvalidError for BadSessionIdInvalid', () => {
    expect(() =>
      makeService().callCheckServiceResult(StatusCode.BadSessionIdInvalid, 'ReadRequest'),
    ).toThrow(SessionInvalidError)
  })

  it('throws SessionInvalidError for BadSessionClosed', () => {
    expect(() =>
      makeService().callCheckServiceResult(StatusCode.BadSessionClosed, 'ReadRequest'),
    ).toThrow(SessionInvalidError)
  })

  it('carries the original status code in the thrown SessionInvalidError', () => {
    const service = makeService()
    let caught: unknown
    try {
      service.callCheckServiceResult(StatusCode.BadSessionIdInvalid, 'ReadRequest')
    } catch (err) {
      caught = err
    }
    expect(caught).toBeInstanceOf(SessionInvalidError)
    expect((caught as SessionInvalidError).statusCode).toBe(StatusCode.BadSessionIdInvalid)
  })

  it('throws a generic Error (not SessionInvalidError) for other bad status codes', () => {
    const service = makeService()
    expect(() => service.callCheckServiceResult(StatusCode.BadNodeIdUnknown, 'BrowseRequest')).toThrow(Error)
    expect(() => service.callCheckServiceResult(StatusCode.BadNodeIdUnknown, 'BrowseRequest')).not.toThrow(
      SessionInvalidError,
    )
  })

  it('includes the context name in the generic error message', () => {
    const service = makeService()
    expect(() => service.callCheckServiceResult(StatusCode.BadNodeIdUnknown, 'BrowseRequest')).toThrow(
      /BrowseRequest/,
    )
  })
})
