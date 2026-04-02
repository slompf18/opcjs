# Security User Name Password 2

**Facet**: User Token – User Name Password Server Facet  
**Type**: Required  
**Status**: ❌ Not Implemented  

## Description

The server must support username/password combinations as user identity tokens. The token must be encrypted as required by the security policy of the `UserTokenPolicy` or by the security policy of the endpoint.

**Server responsibilities**:
- Advertise a `UserTokenPolicy` with `tokenType = UserName` (1) in each applicable `EndpointDescription`.
- The `UserTokenPolicy` may specify a `securityPolicyUri`; if empty, the endpoint's security policy applies.
- Accept `ActivateSessionRequest` where `userIdentityToken` is a `UserNameIdentityToken`:
  - `userName` — the username string
  - `password` — the password bytes (encrypted if required by the applicable security policy)
  - `encryptionAlgorithm` — the algorithm used to encrypt the password (e.g. `http://www.w3.org/2001/04/xmlenc#rsa-oaep`)
- Decrypt the password using the server's private key (when encrypted).
- Validate the credentials against the server's user store.
- Return `Bad_UserAccessDenied` if credentials are invalid.
- Return `Bad_IdentityTokenInvalid` if the token is structurally malformed.
- Return `Bad_IdentityTokenRejected` if the token type is not accepted on this endpoint.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-4 | §5.7.3 | ActivateSession Service |
| OPC 10000-4 | §7.36.3 | UserNameIdentityToken |
| profiles.opcfoundation.org | [CU 3536](https://profiles.opcfoundation.org/conformanceunit/3536) | Security User Name Password 2 |
