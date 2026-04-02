# Discovery Client Configure Endpoint

**Facet**: Base Client Behaviour Facet  
**Type**: Required  
**Status**: ❌ Not Implemented  

## Description

The client must allow specification of an endpoint directly, without going through the Discovery Service Set. This is the most common practical scenario: an operator or configuration file supplies the endpoint URL directly.

**Client responsibilities**:
- Accept a configured `endpointUrl` (e.g. `opc.tcp://host:4840`) as input without requiring a prior `FindServers` or `GetEndpoints` discovery call.
- Use `GetEndpoints` on the configured URL to retrieve the available `EndpointDescription` entries and let the user or configuration select the desired security policy and message security mode.
- Alternatively, accept a fully pre-configured `EndpointDescription` (including security policy, mode, and server certificate) to bypass `GetEndpoints` entirely.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-4 | §5.4.3 | GetEndpoints Service |
| OPC 10000-4 | §5.4.2 | FindServers Service |
| profiles.opcfoundation.org | [CU 2751](https://profiles.opcfoundation.org/conformanceunit/2751) | Discovery Client Configure Endpoint |
