# Security Administration

**Facet**: Base Client Behaviour Facet  
**Type**: Required  
**Status**: ✅ Implemented  

## Description

The Security Administration conformance unit requires that a client provides administrative controls over its security configuration, including:

1. **User Token Policy selection** — the client must be able to select among the user token policies advertised by the server (Anonymous, UserName, X.509 Certificate, IssuedToken).
2. **SecurityPolicy selection** — the client must allow or disallow specific security policies (e.g. prohibit `SecurityPolicy#None` in production deployments).
3. **MessageSecurityMode selection** — the client must be configurable to require `Sign` or `SignAndEncrypt` modes and refuse `None` when security is mandatory.
4. **Trusted Certificate Authorities** — the client must allow the operator to configure a set of trusted CA certificates used to validate server certificates.
5. **Unknown Certificate Policy** — the client must define its behaviour when an untrusted or unknown server certificate is presented (reject, prompt, or auto-trust).

See also: [Security Administration in Core 2022 Client Facet](../core-2022-client-facet/security-administration.md) — same CU, same implementation.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-2 | §4 | Security Model |
| OPC 10000-4 | §5.7.3 | ActivateSession – security policy handling |
| profiles.opcfoundation.org | [CU 2407](https://profiles.opcfoundation.org/conformanceunit/2407) | Security Administration |
