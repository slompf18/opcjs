# Base Info Namespace Metadata

**Facet**: Core 2022 Server Facet  
**Type**: Optional  
**Status**: ❌ Not Implemented  

## Description

The server must support the `NamespaceMetaData` Object for all namespaces in the server that have static NodeIds. This metadata helps clients understand the source and versioning of data in each namespace.

**Server responsibilities**:
- For each namespace with static NodeIds, expose a `NamespaceMetaDataType` Object under `Server.Namespaces`.
- The `NamespaceMetaDataType` Object includes:
  - `NamespaceUri` — the namespace URI
  - `NamespaceVersion` — version string
  - `NamespacePublicationDate` — publication date of the namespace
  - `IsNamespaceSubset` — whether only a subset of the full namespace definition is exposed
  - `StaticNodeIdTypes` — array of NodeId types (Numeric, String, Guid, Opaque) that are static
  - `StaticNumericNodeIdRange` — optional ranges of static numeric NodeIds
  - `StaticStringNodeIdPattern` — optional pattern for static string NodeIds

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-5 | §8.4 | NamespaceMetaDataType |
| profiles.opcfoundation.org | [CU 3545](https://profiles.opcfoundation.org/conformanceunit/3545) | Base Info Namespace Metadata |
