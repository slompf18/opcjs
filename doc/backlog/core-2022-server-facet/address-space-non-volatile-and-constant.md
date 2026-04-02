# Address Space NonVolatile and Constant

**Facet**: Core 2022 Server Facet  
**Type**: Optional  
**Status**: ❌ Not Implemented  

## Description

The server must support setting the `NonVolatile` and `Constant` flags in the `AccessLevelEx` Attribute for Variable Nodes to indicate whether persistent storage is supported.

| Flag | Bit | Meaning |
|------|-----|---------|
| `NonVolatile` | bit 4 | The value persists across power cycles (stored in non-volatile memory). |
| `Constant` | bit 5 | The value never changes during the lifetime of the server instance. |

**Server responsibilities**:
- Set `AccessLevelEx.NonVolatile` for Variable Nodes whose values are stored persistently.
- Set `AccessLevelEx.Constant` for Variable Nodes whose values are truly immutable.
- Clients use these flags to optimise caching and subscription strategies.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-3 | §5.6.2 | AccessLevelEx Attribute |
| profiles.opcfoundation.org | [CU 4237](https://profiles.opcfoundation.org/conformanceunit/4237) | Address Space NonVolatile and Constant |
