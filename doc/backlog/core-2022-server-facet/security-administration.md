# Security Administration

**Facet**: Core 2022 Server Facet  
**Type**: Optional  
**Status**: ❌ Not Implemented  

## Description

The server must allow administrative configuration of the following security-related items (where applicable):

1. **User Token Policy selection** — configure which user identification policies are allowed/used (e.g. UserName/Password or X.509 certificate).
2. **SecurityPolicy selection** — enable/disable or select the security policy "None" or other security policies.
3. **MessageSecurityMode selection** — enable/disable or select endpoints with `MessageSecurityMode` = `SIGN` or `SIGNANDENCRYPT`.
4. **Trusted Certificate Authorities** — set the permitted certification authorities whose issued certificates will be trusted.
5. **Unknown Certificate policy** — define how to react to unknown certificates (reject, prompt, auto-trust).
6. **Accept any valid Certificate** — optionally allow accepting any certificate that is otherwise structurally valid.

These settings must be configurable by an administrator without requiring source code changes.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-2 | §4 | Security Model |
| OPC 10000-4 | §5.7.3 | ActivateSession – security negotiation |
| profiles.opcfoundation.org | [CU 2407](https://profiles.opcfoundation.org/conformanceunit/2407) | Security Administration |
