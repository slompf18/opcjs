# Base Info Client Estimated Return Time

**Facet**: Core 2022 Client Facet  
**Type**: Optional  
**Status**: ❌ Not implemented  

## Description

When a server is about to shut down, it publishes an `EstimatedReturnTime` property under the `Server` object.  
A client claiming this conformance unit uses that timestamp to schedule reconnect attempts intelligently, rather than polling at a fixed rate.

### EstimatedReturnTime node

| Attribute | Value |
|-----------|-------|
| NodeId | `ns=0; i=2992` |
| BrowseName | `EstimatedReturnTime` |
| DataType | `DateTime` |
| Description | UTC time when the server is expected to become available again. `MinDateTime` means the server does not expect to return. |

### Client behaviour

When the server announces a shutdown (`ServerStatus/State = Shutdown`) the client should:
1. Read `Server/ServerStatus/EstimatedReturnTime` (NodeId `ns=0; i=2992`).
2. If the value is a valid future timestamp, schedule the first reconnect attempt at that time.
3. If the value is `MinDateTime` (server not expected to return), notify the application and do not retry automatically.
4. Apply exponential backoff for subsequent retries if the server is not yet available at the estimated time.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-5 §12.6 | ServerStatus | Contains `EstimatedReturnTime` and `State` |
| OPC 10000-5 §12.6.3 | ServerState | Enumeration: Running, Failed, NoConfiguration, Suspended, Shutdown, Test, CommunicationFault, Unknown |
| OPC 10000-4 §5.7.3 | ActivateSession | Used during reconnect to reactivate an existing session |

Online: https://reference.opcfoundation.org/Core/Part5/v105/docs/12.6

## Implementation Gap

The reconnect logic in `src/client.ts` (`reconnectAndReactivate()`) retries immediately without reading `EstimatedReturnTime`.

## Work Required

1. In `reconnectAndReactivate()`, after a transport error, attempt to read `Server/ServerStatus/EstimatedReturnTime` before closing.
2. Parse the `DateTime` value and delay the reconnect attempt accordingly.
3. Expose a callback / event so the application can react to `MinDateTime` (permanent shutdown).
4. Integration tests against the reference server's graceful-shutdown flow.

## Related Conformance Units

- [Session Client Auto Reconnect](./session-client-auto-reconnect.md)
- [Session Client Detect Shutdown](./session-client-detect-shutdown.md)
