# Base Info Core Structure 2

**Facet**: Core 2022 Server Facet  
**Type**: Required  
**Status**: ❌ Not Implemented  

## Description

The server must expose the base entry points and server object in the AddressSpace:

- **Root** — the root node (`NodeId = i=84`)
- **Objects** — the Objects folder (`NodeId = i=85`), the standard entry point for browsable object instances
- **Server Object** — (`NodeId = i=2253`) with the following mandatory child variables:
  - `ServerArray` — array of server URIs known to this server
  - `NamespaceArray` — array of namespace URIs
  - `ServerStatus` — current server state, build info, start time, current time, seconds till shutdown, shutdown reason
  - `ServiceLevel` — 0–255 quality indicator for load balancing
  - `Auditing` — Boolean indicating whether audit events are generated
  - Entry point to `VendorServerInfo` Object
  - Entry point to `ServerRedundancy` Object

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-5 | §8.2 | Server Object |
| OPC 10000-3 | §8.2.4 | AddressSpace entry points |
| profiles.opcfoundation.org | [CU 3184](https://profiles.opcfoundation.org/conformanceunit/3184) | Base Info Core Structure 2 |
