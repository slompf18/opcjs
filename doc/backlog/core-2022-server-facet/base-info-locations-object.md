# Base Info Locations Object

**Facet**: Core 2022 Server Facet  
**Type**: Optional  
**Status**: ❌ Not Implemented  

## Description

The server must expose the `Locations` Object as an entry point for different types of location information in the AddressSpace. This Object groups location-related properties and sub-objects (e.g. geographic coordinates, plant topology).

**Server responsibilities**:
- Expose the `Locations` Object under the `Server` Object or in the standard AddressSpace hierarchy.
- Organise location-typed objects as children of the `Locations` entry point.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-5 | §8.2 | Locations Object |
| profiles.opcfoundation.org | [CU 4053](https://profiles.opcfoundation.org/conformanceunit/4053) | Base Info Locations Object |
