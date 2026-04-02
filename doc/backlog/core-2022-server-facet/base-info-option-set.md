# Base Info OptionSet

**Facet**: Core 2022 Server Facet  
**Type**: Optional  
**Status**: ❌ Not Implemented  

## Description

The server must support the `OptionSetType` VariableType. This VariableType is used for Variables that hold a bit-mask value where each bit corresponds to a named option. The `OptionSetType` exposes the list of option names via the `OptionSetValues` Property.

**Server responsibilities**:
- Expose the `OptionSetType` VariableType in the type system.
- For Variables typed as `OptionSetType` (or subtype), expose the `OptionSetValues` Property containing a `LocalizedText[]` where each index corresponds to a bit in the value.
- Optionally expose `BitMask` Property to indicate which bits are valid.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-5 | §B.1 | OptionSetType |
| profiles.opcfoundation.org | [CU 3127](https://profiles.opcfoundation.org/conformanceunit/3127) | Base Info OptionSet |
