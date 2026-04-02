# View Basic 2

**Facet**: Core 2022 Server Facet  
**Type**: Required  
**Status**: ❌ Not Implemented  

## Description

The server must support the View Service Set: `Browse` and `BrowseNext`. It must support a minimum of one continuation point per session.

**Server responsibilities**:

### Browse
- Handle `BrowseRequest` with one or more `BrowseDescription` entries.
- Support `BrowseDirection` (`Forward`, `Inverse`, `Both`).
- Support `ReferenceTypeId` filter (including `includeSubtypes`).
- Support `NodeClassMask` filter.
- Support `ResultMask` to control which fields are returned in `ReferenceDescription`.
- Honour `maxReferencesPerNode`; if more references exist, set `continuationPoint` in the response.
- Issue at least one continuation point per session simultaneously.

### BrowseNext
- Handle `BrowseNextRequest` using a previously issued `continuationPoint`.
- Support `releaseContinuationPoints = true` to explicitly release a continuation point.
- Return `Bad_ContinuationPointInvalid` if the continuation point is not recognised.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-4 | §5.8.2 | Browse Service |
| OPC 10000-4 | §5.8.3 | BrowseNext Service |
| profiles.opcfoundation.org | [CU 3530](https://profiles.opcfoundation.org/conformanceunit/3530) | View Basic 2 |
