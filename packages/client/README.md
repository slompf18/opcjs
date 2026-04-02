# opcjs-client

An OPC UA client library for TypeScript targeting the browser and Node.js, built on top of `opcjs-base`.

## Installation

```sh
npm install opcjs-client opcjs-base
```

## Quick Start

```ts
import { Client, ConfigurationClient, UserIdentity } from 'opcjs-client'
import { NodeId } from 'opcjs-base'

const config = ConfigurationClient.getSimple('MyApp', 'MyCompany')
const client = new Client('opc.tcp://localhost:4840', UserIdentity.newAnonymous(), config)

await client.connect()

// Read a node value
const results = await client.read([NodeId.newNumeric(0, 2258)]) // CurrentTime
console.log(results[0].value)

await client.disconnect()
```

## API

### `new Client(endpointUrl, identity, configuration)`

Creates a new client instance. Does not connect until `connect()` is called.

| Parameter | Type | Description |
|-----------|------|-------------|
| `endpointUrl` | `string` | OPC UA server endpoint (e.g. `opc.tcp://host:4840`) |
| `identity` | `UserIdentity` | Credentials used for `ActivateSession` |
| `configuration` | `ConfigurationClient` | Application description, encoder/decoder, and security settings |

### `client.connect(): Promise<void>`

Opens the WebSocket transport, establishes a TCP/SecureChannel, creates an OPC UA session, and starts the keep-alive timer.

Reconnects automatically on channel drops (Session Auto Reconnect, OPC UA Part 4 §5.7.1):
1. Attempts `ActivateSession` on the new channel to reuse the existing session.
2. Falls back to a full `CreateSession` + `ActivateSession` if reactivation fails.

### `client.disconnect(): Promise<void>`

Sends `CloseSession` (with `deleteSubscriptions=true`), closes the SecureChannel, and shuts down the WebSocket transport.

### `client.read(ids, options?): Promise<ReadValueResult[]>`

Reads the `Value` attribute of one or more nodes.

```ts
const [result] = await client.read([NodeId.newNumeric(0, 2258)])
// result.value          — the read value
// result.statusCode     — OPC UA StatusCode
// result.diagnosticInfo — populated when returnDiagnostics > 0
```

### `client.getSelectionList(nodeId): Promise<SelectionList | null>`

Reads `SelectionListType` metadata (OPC UA Part 5 §7.18) from a variable and exposes it to application code.

The method reads the variable's `HasProperty` references for:
- `Selections` (mandatory)
- `SelectionDescriptions` (optional)
- `RestrictToList` (optional)

It returns `null` when the variable does not expose a `Selections` property.

```ts
const list = await client.getSelectionList(nodeId)
if (list) {
  console.log(list.selections)
  console.log(list.selectionDescriptions.map(d => d.text))
  console.log('restrictToList:', list.restrictToList)
}
```

### `client.browse(nodeId, recursive?, options?): Promise<BrowseNodeResult[]>`

Browses the `HierarchicalReferences` of a node. Set `recursive` to `true` to traverse the full sub-tree.

Continuation points are handled automatically: all pages are fetched and merged before the promise resolves.

### `client.callMethod(objectId, methodId, inputArguments?, options?): Promise<CallMethodResult>`

Calls an OPC UA method.

```ts
import { CallMethodArgument } from 'opcjs-client'

const result = await client.callMethod(
  NodeId.newNumeric(0, 1000),  // Object that owns the method
  NodeId.newNumeric(0, 1001),  // Method node
  [42, 'hello'] as CallMethodArgument[],
)
// result.values         — output argument values
// result.statusCode     — OPC UA StatusCode
// result.diagnosticInfo — populated when returnDiagnostics > 0
```

### `client.subscribe(ids, callback, options?): Promise<void>`

Creates an OPC UA subscription and monitored items, then starts the Publish loop.

```ts
await client.subscribe(
  [NodeId.newNumeric(0, 2258)],
  (notifications) => {
    for (const { id, value } of notifications) {
      console.log(id, value)
    }
  },
  { requestedPublishingInterval: 1000 },
)
```

`SubscriptionOptions` (all optional, server may revise):

| Field | Default | Description |
|-------|---------|-------------|
| `requestedPublishingInterval` | `2000` ms | Publishing interval |
| `requestedLifetimeCount` | `360000` | Subscription lifetime in publishing intervals |
| `requestedMaxKeepAliveCount` | `60000` | Keep-alive count |
| `maxNotificationsPerPublish` | `200` | `0` = no limit |
| `priority` | `1` | Priority relative to other subscriptions |
| `samplingInterval` | `-1` (use publishing interval) | Monitored item sampling interval |
| `queueSize` | server default | Per-item notification queue |

## Authentication

```ts
// Anonymous (default)
const identity = UserIdentity.newAnonymous()

// Username / password
const identity = UserIdentity.newWithUserName('user', 'pass')

// Issued token (e.g. OAuth / JWT)
const identity = UserIdentity.newWithIssuerToken(async (config) => {
  return { tokenData: new TextEncoder().encode(await fetchJwt(config)) }
})
```

## Security Configuration

Attach a `SecurityConfiguration` to the `ConfigurationClient` to restrict which security options are accepted:

```ts
import { UserTokenTypeEnum } from 'opcjs-base'

const config = ConfigurationClient.getSimple('MyApp', 'MyCompany')
config.securityConfiguration = {
  // Require authentication — reject anonymous connections
  allowedUserTokenTypes: [UserTokenTypeEnum.UserName],
  // Require an encrypted channel (throws until non-None policies are supported)
  allowSecurityPolicyNone: false,
}
```

| Field | Default | Description |
|-------|---------|-------------|
| `allowedUserTokenTypes` | all types | Token types the client will accept |
| `allowSecurityPolicyNone` | `true` | Allow unencrypted SecurityPolicy None channels |
| `messageSecurityMode` | any | Required `MessageSecurityMode` |
| `trustedCAs` | — | DER-encoded trusted CA certificates (reserved for future use) |
| `unknownCertificatePolicy` | — | `'reject'` or `'trust'` for unverifiable server certificates (reserved for future use) |

> **Security note:** `allowSecurityPolicyNone: true` (the default) allows cleartext communication. Set it to `false` once non-None security policies are available in this client implementation.
