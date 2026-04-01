import { StatusCodeToString } from 'opcjs-base'

/**
 * Thrown when the server rejects `CreateSession` because no (or an invalid)
 * client certificate was supplied.
 *
 * This signals that the OPC UA 1.0 fallback path should be attempted: retry
 * `CreateSession` with the `applicationInstanceCertificate` from the
 * `SecurityConfiguration`.
 *
 * Relevant OPC UA status codes that trigger this error:
 *  - `BadCertificateInvalid`      (0x80120000) – null/empty cert was rejected
 *  - `BadSecurityChecksFailed`    (0x80130000) – security validation failed
 *  - `BadNoValidCertificates`     (0x80590000) – server found no valid certificate
 */
export class CertificateRequiredError extends Error {
  readonly statusCode: number

  constructor(statusCode: number) {
    super(
      `Server requires a client certificate: ${StatusCodeToString(statusCode)}` +
      ` (0x${statusCode.toString(16).toUpperCase().padStart(8, '0')})`,
    )
    this.name = 'CertificateRequiredError'
    this.statusCode = statusCode
  }
}

/**
 * Status codes that indicate the server requires a client certificate even
 * when SecurityPolicy is None (OPC UA 1.0 servers).
 */
export const CERTIFICATE_REQUIRED_STATUS_CODES = new Set<number>([
  0x80120000, // BadCertificateInvalid
  0x80130000, // BadSecurityChecksFailed
  0x80590000, // BadNoValidCertificates
])
