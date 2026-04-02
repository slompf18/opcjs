# Base Info Diagnostics

**Facet**: Core 2022 Server Facet  
**Type**: Optional  
**Status**: ❌ Not Implemented  

## Description

The server must support the collection of diagnostic information and expose it under the `ServerDiagnostics` Object of the `Server` Object.

**Server responsibilities**:
- Expose `Server.ServerDiagnostics` (`ServerDiagnosticsType`) always present in the AddressSpace.
- Expose `EnabledFlag` (writable Boolean) on `ServerDiagnostics`.
- When `EnabledFlag = true`, expose and populate:
  - `ServerDiagnosticsSummary` — aggregate counters (sessions, subscriptions, requests, errors)
  - `SubscriptionDiagnosticsArray` — per-subscription diagnostic data
  - `SessionsDiagnosticsSummary` — per-session diagnostic data including `SessionDiagnosticsArray` and `SessionSecurityDiagnosticsArray`

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-5 | §8.7 | ServerDiagnosticsType |
| profiles.opcfoundation.org | [CU 3192](https://profiles.opcfoundation.org/conformanceunit/3192) | Base Info Diagnostics |
