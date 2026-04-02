# Base Info Client Remote Nodes

**Facet**: Base Client Behaviour Facet  
**Type**: Required  
**Status**: ❌ Not Implemented  

## Description

The client must be able to access nodes that have an extended NodeId that references a server different from the originating server. It is acceptable for the target server's connection information to be pre-configured on the client rather than discovered dynamically.

This is relevant when browsing an aggregating server or when following references that point to nodes on remote servers (using `ExpandedNodeId` with a non-local server URI or server index).

**Client responsibilities**:
- Recognise `ExpandedNodeId` values where `serverIndex > 0` or `namespaceUri` points to an external server.
- Connect to the referenced server (using pre-configured or dynamically discovered endpoint information) to access the target nodes.
- Handle cases where the referenced server is not available gracefully.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-3 | §8.2 | ExpandedNodeId |
| OPC 10000-4 | §5.8 | Attribute Services (Read across servers) |
| profiles.opcfoundation.org | [CU 3077](https://profiles.opcfoundation.org/conformanceunit/3077) | Base Info Client Remote Nodes |
