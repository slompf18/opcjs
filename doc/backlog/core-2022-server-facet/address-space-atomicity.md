# Address Space Atomicity

**Facet**: Core 2022 Server Facet  
**Type**: Required  
**Status**: ❌ Not Implemented  

## Description

The server must support setting the `NonatomicRead` and `NonatomicWrite` flags in the `AccessLevelEx` Attribute for Variable Nodes to indicate whether Read or Write operations can be performed atomically. If a flag is set to `1`, the server cannot guarantee atomicity for that operation.

**Server responsibilities**:
- Set `AccessLevelEx.NonatomicRead` bit for Variable Nodes whose value cannot be read atomically (e.g. large arrays split across multiple memory locations).
- Set `AccessLevelEx.NonatomicWrite` bit for Variable Nodes whose value cannot be written atomically.
- Clients can inspect these flags to determine whether partial reads/writes may be observed.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-3 | §5.6.2 | AccessLevelEx Attribute |
| profiles.opcfoundation.org | [CU 2809](https://profiles.opcfoundation.org/conformanceunit/2809) | Address Space Atomicity |
