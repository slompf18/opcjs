# Discovery Get Endpoints

**Facet**: Core 2022 Server Facet  
**Type**: Required  
**Status**: ❌ Not Implemented  

## Description

The server must support the `GetEndpoints` Service to return all available endpoints it exposes, including filtering by profile URI.

**Server responsibilities**:
- Handle `GetEndpointsRequest` and return a `GetEndpointsResponse` with one `EndpointDescription` per supported endpoint.
- Each `EndpointDescription` must include:
  - `EndpointUrl` — the network address of this endpoint
  - `Server` — the server's `ApplicationDescription`
  - `ServerCertificate` — DER-encoded certificate (null for SecurityPolicy None)
  - `SecurityMode` — `None`, `Sign`, or `SignAndEncrypt`
  - `SecurityPolicyUri` — the URI of the security policy
  - `UserIdentityTokens` — array of supported `UserTokenPolicy` entries
  - `TransportProfileUri` — the transport profile URI (e.g. `http://opcfoundation.org/UA-Profile/Transport/uatcp-uasc-uabinary`)
  - `SecurityLevel` — 0–255 (higher = more secure; used to sort endpoints by preference)
- Support filtering by `profileUris` in the request.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-4 | §5.4.4 | GetEndpoints Service |
| OPC 10000-4 | §7.10 | EndpointDescription |
| profiles.opcfoundation.org | [CU 2328](https://profiles.opcfoundation.org/conformanceunit/2328) | Discovery Get Endpoints |
