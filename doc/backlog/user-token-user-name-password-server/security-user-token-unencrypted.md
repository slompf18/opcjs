# Security User Token Unencrypted

**Facet**: User Token – User Name Password Server Facet  
**Type**: Optional  
**Status**: ❌ Not Implemented  

## Description

The server supports transmitting user identity tokens without encryption. An unencrypted token either requires message-level encryption (i.e. the endpoint must use `SignAndEncrypt` security mode) or relies on means outside of OPC UA to secure the identity token (e.g. a VPN tunnel) so that it cannot be retrieved by sniffing the communication.

**Server responsibilities**:
- Allow `UserNameIdentityToken` where `encryptionAlgorithm` is null or empty (no password encryption).
- Only accept unencrypted tokens when the transport channel is itself secured (e.g. `MessageSecurityMode = SignAndEncrypt`), or when a documented out-of-band secure transport is in use.
- Document clearly in server configuration that this option should only be enabled when transport-level security is guaranteed.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-4 | §5.7.3 | ActivateSession Service |
| OPC 10000-4 | §7.36.3 | UserNameIdentityToken |
| profiles.opcfoundation.org | [CU 3645](https://profiles.opcfoundation.org/conformanceunit/3645) | Security User Token Unencrypted |
