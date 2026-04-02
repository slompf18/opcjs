# Attribute Write Values

**Facet**: Core 2022 Server Facet  
**Type**: Optional  
**Status**: ❌ Not Implemented  

## Description

The server must support writing values to one or more Attributes of one or more Nodes using the `Write` Service.

**Server responsibilities**:
- Handle `WriteRequest` with one or more `WriteValue` entries.
- Each `WriteValue` contains a `NodeId`, `AttributeId`, optional `IndexRange`, and `value` (`DataValue`).
- Check the `AccessLevel` of the target Variable Node; return `Bad_NotWritable` for read-only nodes.
- Apply user access rights (if supported); return `Bad_UserAccessDenied` if the user lacks write permission.
- Return `Bad_TypeMismatch` if the written value has an incompatible data type.
- Return `Bad_OutOfRange` if the written value violates defined range constraints.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-4 | §5.10.4 | Write Service |
| OPC 10000-3 | §5.6.2 | AccessLevel Attribute |
| profiles.opcfoundation.org | [CU 2389](https://profiles.opcfoundation.org/conformanceunit/2389) | Attribute Write Values |
