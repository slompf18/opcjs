# Base Info ValueAsText

**Facet**: Core 2022 Server Facet  
**Type**: Optional  
**Status**: ❌ Not Implemented  

## Description

The server must support the `ValueAsText` Property for Variables whose value is an enumerated DataType. This Property provides a human-readable `LocalizedText` representation of the current enumeration value, enabling clients to display the value without needing to decode the enumeration type definition themselves.

**Server responsibilities**:
- Add a `ValueAsText` Property of type `LocalizedText` to Variable nodes whose `DataType` is an enumeration.
- Keep the `ValueAsText` value in sync with the parent Variable's current value (updated whenever the Variable changes).

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-3 | §8.9 | ValueAsText Property |
| profiles.opcfoundation.org | [CU 2969](https://profiles.opcfoundation.org/conformanceunit/2969) | Base Info ValueAsText |
