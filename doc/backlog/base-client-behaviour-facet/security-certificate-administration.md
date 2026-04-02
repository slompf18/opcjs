# Security Certificate Administration

**Facet**: Base Client Behaviour Facet  
**Type**: Required  
**Status**: ❌ Not Implemented  

## Description

The client must allow a site administrator to assign a site-specific `ApplicationInstanceCertificate` and, if desired, configure a site-specific Certificate Authority (CA).

**Client responsibilities**:
- Provide a mechanism (UI, CLI, or configuration file) to replace the default `ApplicationInstanceCertificate` with a site-issued certificate.
- Optionally allow the administrator to configure a private CA whose issued certificates will be trusted.
- Store the certificate and private key securely in the application's certificate store.
- Use the configured certificate in all `CreateSession` requests.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-6 | §6.2 | Application Instance Certificates |
| profiles.opcfoundation.org | [CU 2319](https://profiles.opcfoundation.org/conformanceunit/2319) | Security Certificate Administration |
