# Security Invalid user token

**Facet**: User Token – User Name Password Server Facet  
**Type**: Required  
**Status**: ❌ Not Implemented  

## Description

Servers must take proper measures to protect against attacks on user identity tokens. Such an attack is assumed if repeated connection attempts with invalid user identity tokens occur. This is a brute-force / credential-stuffing protection requirement.

**Server responsibilities**:
- Detect repeated `ActivateSession` attempts with invalid credentials (invalid username/password combinations).
- Apply a countermeasure upon detection, such as:
  - Introducing increasing delays between retries (exponential back-off)
  - Temporarily blocking the client endpoint or session
  - Logging and alerting for security audit purposes
- The specific threshold and response policy is implementation-defined, but some protection must exist.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-4 | §5.7.3 | ActivateSession Service |
| OPC 10000-2 | §4.4 | Security – User Authentication |
| profiles.opcfoundation.org | [CU 2823](https://profiles.opcfoundation.org/conformanceunit/2823) | Security Invalid user token |
