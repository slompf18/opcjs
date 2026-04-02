# Security User Anonymous Server

**Facet**: User Token – Anonymous Server Facet  
**Type**: Required  
**Status**: ❌ Not Implemented  

## Description

The server must support the `AnonymousIdentityToken` as a valid user identity token in `ActivateSession`. Servers must also allow administrators to disable or enable anonymous access.

**Server responsibilities**:
- Advertise `AnonymousIdentityToken` in the `UserIdentityTokens` array of each `EndpointDescription` returned by `GetEndpoints`, using a `UserTokenPolicy` with:
  - `policyId` — a server-defined unique string identifier for this policy
  - `tokenType` — `Anonymous` (0)
- Accept `ActivateSessionRequest` where `userIdentityToken` is an `AnonymousIdentityToken`.
- Create the server-side session with the `Anonymous` role/identity.
- Provide configuration to disable anonymous access (e.g. when only authenticated users are allowed).

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-4 | §5.7.3 | ActivateSession Service |
| OPC 10000-4 | §7.36.1 | AnonymousIdentityToken |
| profiles.opcfoundation.org | [CU 3928](https://profiles.opcfoundation.org/conformanceunit/3928) | Security User Anonymous Server |
