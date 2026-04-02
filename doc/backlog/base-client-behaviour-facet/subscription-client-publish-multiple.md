# Subscription Client Publish Multiple

**Facet**: Base Client Behaviour Facet  
**Type**: Required  
**Status**: ❌ Not Implemented  

## Description

The client must send multiple `Publish` service requests in parallel to ensure the server is always able to send notifications without being blocked by the client.

**Client responsibilities**:
- Maintain a pipeline of outstanding `Publish` requests on the server at all times (typically 2–3 pending requests).
- Send a new `Publish` request immediately upon receiving a `PublishResponse`, so the server always has at least one pending request to respond to.
- Respect the server's `maxNotificationsPerPublish` limit from `CreateSubscriptionResponse`.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-4 | §5.13.5 | Publish Service |
| profiles.opcfoundation.org | [CU 3117](https://profiles.opcfoundation.org/conformanceunit/3117) | Subscription Client Publish Multiple |
