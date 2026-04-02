# Security Default ApplicationInstance Certificate

**Facet**: Minimum UA 2025 Client Facet  
**Type**: Required  
**Status**: ❌ Not Implemented  

## Description

When installed, an OPC UA application must have a default `ApplicationInstanceCertificate` that is valid. The certificate must either be:
- created automatically as part of the installation process, or
- described in installation instructions so the operator can create and apply one.

This ensures that every deployed instance has a unique, valid certificate identity from day one, which is required for establishing secure channels with servers.

**Client responsibilities**:
- Ship with tooling or instructions that generate a self-signed or CA-signed `ApplicationInstanceCertificate` on first run or installation.
- Store the certificate and its private key in the application's certificate store.
- Present the certificate in `CreateSessionRequest.clientCertificate` when using any security policy other than `None`.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-6 | §6.2 | Application Instance Certificates |
| profiles.opcfoundation.org | [CU 3080](https://profiles.opcfoundation.org/conformanceunit/3080) | Security Default ApplicationInstance Certificate |
