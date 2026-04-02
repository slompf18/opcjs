# Address Space Interfaces

**Facet**: Core 2022 Server Facet  
**Type**: Optional  
**Status**: ❌ Not Implemented  

## Description

The server must support Interfaces and the associated rules, including exposing the `InterfaceTypes` entry point and the types `BaseInterfaceType`, `HasInterface` ReferenceType, and all their supertypes in the AddressSpace.

**Server responsibilities**:
- Expose the `InterfaceTypes` Folder in the AddressSpace (`i=17708`).
- Expose the `BaseInterfaceType` ObjectType (`i=17602`).
- Expose the `HasInterface` ReferenceType (`i=17603`).
- For any ObjectType that implements an interface, add a `HasInterface` reference to the interface type.
- For any Object instance that implements an interface, follow the type hierarchy so the interface is discoverable.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-3 | §4.6 | Interfaces |
| profiles.opcfoundation.org | [CU 3560](https://profiles.opcfoundation.org/conformanceunit/3560) | Address Space Interfaces |
