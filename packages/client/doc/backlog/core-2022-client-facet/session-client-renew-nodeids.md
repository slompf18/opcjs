# Session Client Renew NodeIds

**Facet**: Core 2022 Client Facet  
**Type**: Optional  
**Status**: ❌ Not implemented  

## Description

OPC UA NodeIds contain a `NamespaceIndex` which is a server-local index into the server's `NamespaceArray`.  
The `NamespaceArray` maps indices to namespace URIs (e.g. index 2 → `http://example.com/myOpcUaNamespace`).

The `NamespaceArray` is dynamic: it can change between sessions (e.g. after a server restart or when namespaces are added/removed).  
If a client caches NodeIds that use numeric namespace indices between sessions, those cached NodeIds may become invalid or refer to a different namespace after reconnect.

This conformance unit requires the client to detect `NamespaceArray` changes and update any cached NodeIds accordingly.

### Detection mechanism

After `CreateSession` / `ActivateSession`, the client should:
1. Read `Server/NamespaceArray` (NodeId `ns=0; i=2255`).
2. Compare the received array with the array saved from the previous session.
3. If any namespace URI has moved to a different index, translate all cached NodeIds by updating their `NamespaceIndex` to match the new position of that URI.
4. If a namespace URI that was previously present is now absent, invalidate any cached NodeIds belonging to that namespace and notify the application.

### Affected scenarios

| Scenario | Risk |
|----------|------|
| Server restart with dynamic namespace registration | Indices may be assigned in a different order |
| Server software upgrade | New namespaces inserted at lower indices |
| Failover to a redundant server | The failover server may have a different namespace table |

NodeId for `Server/NamespaceArray`: `ns=0; i=2255`

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-3 §8.2 | NodeId | NamespaceIndex semantics |
| OPC 10000-5 §12.2 | Server Object | `NamespaceArray` and `ServerArray` Variables |
| OPC 10000-4 §5.7.3 | ActivateSession | Reconnect point where namespace check should occur |

Online: https://reference.opcfoundation.org/Core/Part3/v105/docs/8.2  
Online: https://reference.opcfoundation.org/Core/Part5/v105/docs/12.2

## Implementation Gap

After `ActivateSession`, the client does not read or compare `NamespaceArray`.  
All internally cached NodeIds use raw numeric namespace indices with no translation layer.

## Work Required

1. After every `ActivateSession` (initial and on reconnect), read `Server/NamespaceArray`.
2. Store the array as `string[]` (URI list) keyed by index.
3. Implement `namespaceIndexForUri(uri: string): number` lookup.
4. Add a `NodeIdTranslator` utility that, given an old `NamespaceArray` and a new one, builds a `number → number` remapping table.
5. Apply the remapping table to any cached NodeIds the application layer has stored.
6. Expose an `onNamespaceTableChanged` event for applications to react.

## Related Conformance Units

- [Session Client Auto Reconnect](./session-client-auto-reconnect.md)
- [Address Space Client NodeId IdTypes](./address-space-client-nodeid-idtypes.md)
