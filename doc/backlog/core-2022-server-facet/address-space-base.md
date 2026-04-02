# Address Space Base

**Facet**: Core 2022 Server Facet  
**Type**: Required  
**Status**: ❌ Not Implemented  

## Description

The server must support all NodeClasses with their Attributes and References. This forms the structural foundation of the OPC UA AddressSpace.

**Supported NodeClasses**:
- `Object` — instances of ObjectTypes
- `ObjectType` — type definitions for Objects
- `Variable` — data-bearing nodes
- `VariableType` — type definitions for Variables
- `ReferenceType` — defines reference semantics
- `DataType` — defines data type structure
- `Method` — callable operations
- `View` — named subsets of the AddressSpace

**Server responsibilities**:
- Expose all mandatory Attributes for each NodeClass (e.g. `NodeId`, `NodeClass`, `BrowseName`, `DisplayName`, `Description`, `WriteMask`, `UserWriteMask`).
- Correctly populate `References` for each Node, including both forward and inverse hierarchical references.
- Support all built-in ReferenceTypes (`HasComponent`, `HasProperty`, `HasTypeDefinition`, `HasSubtype`, etc.).

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-3 | §5 | AddressSpace Model |
| OPC 10000-3 | §8 | NodeClasses and Attributes |
| profiles.opcfoundation.org | [CU 3554](https://profiles.opcfoundation.org/conformanceunit/3554) | Address Space Base |
