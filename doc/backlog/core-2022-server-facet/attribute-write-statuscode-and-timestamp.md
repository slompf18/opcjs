# Attribute Write StatusCode & Timestamp

**Facet**: Core 2022 Server Facet  
**Type**: Optional  
**Status**: ❌ Not Implemented  

## Description

The server must support writing of `StatusCode` and `Timestamps` alongside the `Value` in a `Write` request. This allows clients (typically historian or data replay clients) to inject historical or synthetic values with their original quality and time metadata.

**Server responsibilities**:
- In `WriteRequest`, accept `WriteValue` entries where `value.statusCode` and/or `value.sourceTimestamp`/`value.serverTimestamp` are non-null.
- Store or apply the supplied status code and timestamps rather than generating them server-side.
- Set `AccessLevel.StatusWrite` and `AccessLevel.TimestampWrite` bits for Variable Nodes that support this capability (OPC 10000-3 §5.6.2).
- Return `Bad_WriteNotSupported` for nodes that do not accept status/timestamp writes.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-4 | §5.10.4 | Write Service |
| OPC 10000-3 | §5.6.2 | AccessLevel / AccessLevelEx |
| profiles.opcfoundation.org | [CU 2936](https://profiles.opcfoundation.org/conformanceunit/2936) | Attribute Write StatusCode & Timestamp |
