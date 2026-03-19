import { StatusCodeToString } from 'opcjs-base'

/**
 * Thrown when the server signals that the current Session is no longer valid.
 *
 * Callers that want to react to a dropped session (e.g. by creating a new one
 * and retrying the operation) should catch this specific error type instead of
 * the generic `Error` class.
 *
 * Relevant OPC UA status codes:
 *  - `BadSessionIdInvalid` (0x80250000) – session no longer exists on the server
 *  - `BadSessionClosed`    (0x80260000) – session was closed explicitly
 */
export class SessionInvalidError extends Error {
  readonly statusCode: number

  constructor(statusCode: number) {
    super(`Session is no longer valid: ${StatusCodeToString(statusCode)} (0x${statusCode.toString(16).toUpperCase()})`)
    this.name = 'SessionInvalidError'
    this.statusCode = statusCode
  }
}
