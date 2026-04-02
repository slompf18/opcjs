# Base Services Diagnostics

**Facet**: Core 2022 Server Facet  
**Type**: Optional  
**Status**: ❌ Not Implemented  

## Description

The server must return available diagnostic information as requested by the `returnDiagnostics` bitmask parameter in the `RequestHeader`. This allows clients to request additional troubleshooting information for failed operations.

**`returnDiagnostics` bitmask** (OPC 10000-4 §7.28):

| Bit | Name | Description |
|-----|------|-------------|
| 0 | ServiceLevel / SymbolicId | Return the symbolic Id of the top-level status |
| 1 | ServiceLevel / LocalizedText | Return the localised description |
| 2 | ServiceLevel / AdditionalInfo | Return extra info string |
| 3 | ServiceLevel / InnerStatusCode | Return inner status code |
| 4 | ServiceLevel / InnerDiagnostics | Return inner diagnostics |
| 5–9 | OperationLevel variants | Same for individual operation results |

**Server responsibilities**:
- Check the `returnDiagnostics` field in every `RequestHeader`.
- Populate the `diagnosticInfos` array in the response with the requested level of detail.
- When `returnDiagnostics = 0` (or the field is not set), omit diagnostic info for performance.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-4 | §7.8 | DiagnosticInfo |
| OPC 10000-4 | §7.28 | RequestHeader.returnDiagnostics |
| profiles.opcfoundation.org | [CU 3983](https://profiles.opcfoundation.org/conformanceunit/3983) | Base Services Diagnostics |
