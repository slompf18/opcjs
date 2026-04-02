# Session Change User

**Facet**: Core 2022 Server Facet  
**Type**: Optional  
**Status**: ❌ Not Implemented  

## Description

The server must support using `ActivateSession` to change the authenticated user of an already-established session without creating a new session. This allows a single session to be reused by different users (e.g. operator login/logout on a shared HMI).

**Server responsibilities**:
- Accept `ActivateSessionRequest` on an existing, already-activated session.
- Validate the new `userIdentityToken` and update the session's identity to the new user.
- Apply any access control changes resulting from the new user's roles immediately.
- Generate a new `serverNonce` in the response for subsequent calls.
- The secure channel must remain the same; only the user identity changes.

**Note**: The base [Session Base](./session-base.md) CU explicitly excludes this capability.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-4 | §5.7.3 | ActivateSession Service |
| profiles.opcfoundation.org | [CU 2400](https://profiles.opcfoundation.org/conformanceunit/2400) | Session Change User |
