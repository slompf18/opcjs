# TypeScript Coding Guidelines

**Version**: 1.0.0  
**Last Updated**: 2026-02-16  
**Applies To**: opcuajs repository (OPC UA TypeScript/JavaScript library)

## Table of Contents

1. [File Organization](#file-organization)
2. [Naming Conventions](#naming-conventions)
3. [Code Formatting](#code-formatting)
4. [Type Definitions](#type-definitions)
5. [Classes and Interfaces](#classes-and-interfaces)
6. [Enumerations](#enumerations)
7. [Functions and Methods](#functions-and-methods)
8. [Import Organization](#import-organization)
9. [Comments and Documentation](#comments-and-documentation)
10. [Error Handling](#error-handling)
11. [Async/Await](#asyncawait)
12. [Testing](#testing)

---

## File Organization

### One Export Per File (Preferred)

**Preferred**: One primary class, interface, or type per file
```typescript
// ✅ Good: src/types/ApplicationDescription.ts
export interface ApplicationDescription {
    applicationUri: string;
    productUri: string;
    applicationName: LocalizedText;
    applicationType: ApplicationType;
}
```

**Exception**: Related types can be co-located
```typescript
// ✅ Acceptable: src/types/LocalizedText.ts
export interface LocalizedText {
    locale: string;
    text: string;
}

export type LocalizedTextMap = Map<string, string>;
```

**Avoid**: Multiple unrelated exports in one file
```typescript
// ❌ Bad: src/types/mixed.ts
export interface ApplicationDescription { /* ... */ }
export interface EndpointDescription { /* ... */ }
export enum MessageSecurityMode { /* ... */ }
```

### File Naming

- **Interfaces/Types**: PascalCase matching type name: `ApplicationDescription.ts`
- **Classes**: PascalCase matching class name: `OpcUaClient.ts`
- **Utilities**: camelCase describing purpose: `typeConverter.ts`, `nodeIdParser.ts`
- **Enums**: PascalCase matching enum name: `ApplicationType.ts`
- **Constants**: camelCase with suffix: `builtinTypes.constants.ts`
- **Tests**: Match source file with `.test.ts` or `.spec.ts`: `OpcUaClient.test.ts`

### Directory Structure

```
src/
├── index.ts                 # Public API exports
├── types/                   # Type definitions (interfaces, types, enums)
│   ├── ApplicationDescription.ts
│   ├── ApplicationType.ts
│   └── index.ts             # Re-export all types
├── client/                  # Client implementation
│   ├── OpcUaClient.ts
│   ├── Session.ts
│   └── index.ts
├── codecs/                  # Encoding/decoding
├── utils/                   # Utility functions
├── generators/              # Code generation tools
└── __tests__/              # Tests (or co-located *.test.ts)
```

---

## Naming Conventions

### Variables and Parameters

```typescript
// ✅ camelCase for variables and parameters
let nodeId: string;
const applicationUri = "urn:opcua:example";
function parseNodeId(nodeIdString: string): NodeId { /* ... */ }
```

### Constants

```typescript
// ✅ UPPER_SNAKE_CASE for true constants
const MAX_MESSAGE_SIZE = 65536;
const DEFAULT_TIMEOUT_MS = 5000;

// ✅ camelCase for configuration objects
const defaultClientConfig = {
    endpoint: "opc.tcp://localhost:4840",
    timeout: 5000
};
```

### Private/Protected Members

TypeScript uses `private` and `protected` keywords, NOT prefixes.

```typescript
// ✅ Good: No prefix, use access modifiers
class OpcUaClient {
    private sessionId: string;
    protected endpoint: string;
    public isConnected: boolean;

    private async connect(): Promise<void> { /* ... */ }
}

// ❌ Bad: Do not use underscore prefix
class OpcUaClient {
    private _sessionId: string;  // ❌ Unnecessary prefix
}
```

**Exception**: Backing fields for getters/setters may use underscore
```typescript
// ✅ Acceptable: Underscore for backing field of getter/setter
class Session {
    private _isActive: boolean = false;

    get isActive(): boolean {
        return this._isActive;
    }

    set isActive(value: boolean) {
        this._isActive = value;
        this.onActiveStateChanged();
    }
}
```

### Interfaces and Types

```typescript
// ✅ PascalCase, NO "I" prefix
interface ApplicationDescription { /* ... */ }
type NodeIdMap = Map<string, NodeId>;

// ❌ Bad: Do not use "I" prefix
interface IApplicationDescription { /* ... */ }  // ❌
```

### Type Parameters (Generics)

```typescript
// ✅ Single uppercase letter or descriptive PascalCase
function identity<T>(value: T): T { /* ... */ }
class ResponseHandler<TRequest, TResponse> { /* ... */ }

// ✅ Prefer descriptive names when multiple type parameters
interface DataModel<TDataType, TReference, TField> {
    types: TDataType[];
    references: TReference[];
}
```

---

## Code Formatting

### Indentation and Spacing

- **Indentation**: 2 spaces (configured in tsconfig.json and .editorconfig)
- **Max line length**: 100 characters (soft limit, 120 hard limit)
- **Semicolons**: Always use semicolons
- **Trailing commas**: Yes, for multiline arrays/objects

```typescript
// ✅ Good formatting
const config = {
  endpoint: "opc.tcp://localhost:4840",
  timeout: 5000,
  retryAttempts: 3,
};

const types = [
  ApplicationType.Server,
  ApplicationType.Client,
  ApplicationType.ClientAndServer,
];
```

### Braces and New Lines

**Opening brace on same line** (K&R style for TypeScript):
```typescript
// ✅ Good
function connect() {
  if (isConnected) {
    return;
  }
  // ...
}

// ❌ Bad (Allman style not used in TypeScript)
function connect()
{
  if (isConnected)
  {
    return;
  }
}
```

**Always use braces**, even for single-line blocks:
```typescript
// ✅ Good
if (isConnected) {
  return;
}

// ❌ Bad
if (isConnected) return;
```

### Blank Lines

- **One blank line** between methods
- **One blank line** between logical sections within a method
- **No blank lines** at the start or end of blocks

```typescript
class OpcUaClient {
  private sessionId: string;
  
  async connect(): Promise<void> {
    await this.establishConnection();
    await this.createSession();
  }

  async disconnect(): Promise<void> {
    await this.closeSession();
    this.sessionId = "";
  }

  private async establishConnection(): Promise<void> {
    // Connection logic here
    const endpoint = this.resolveEndpoint();
    
    // Security negotiation
    const securityPolicy = this.selectSecurityPolicy();
    
    // Final handshake
    await this.performHandshake(endpoint, securityPolicy);
  }
}
```

---

## Type Definitions

### Prefer Interfaces Over Type Aliases for Objects

```typescript
// ✅ Good: Interface for object shapes
interface ApplicationDescription {
  applicationUri: string;
  productUri: string;
  applicationName: LocalizedText;
  applicationType: ApplicationType;
}

// ✅ Good: Type alias for unions, primitives, tuples
type NodeIdFormat = "string" | "numeric" | "guid" | "opaque";
type NodeIdTuple = [number, number]; // [namespace, identifier]
```

### Explicit Return Types

**Always** specify return types for public functions and methods:
```typescript
// ✅ Good
export function parseNodeId(input: string): NodeId {
  // ...
}

// ❌ Bad (implicit return type)
export function parseNodeId(input: string) {
  // ...
}
```

### Avoid `any`

Use `unknown` or specific types instead:
```typescript
// ✅ Good
function processResponse(response: unknown): void {
  if (typeof response === "object" && response !== null) {
    // Type guard narrows to object
  }
}

// ❌ Bad
function processResponse(response: any): void {
  // Loses type safety
}
```

---

## Classes and Interfaces

### Class Structure Order

1. Static properties
2. Static methods
3. Instance properties (public → protected → private)
4. Constructor
5. Getters/setters
6. Public methods
7. Protected methods
8. Private methods

```typescript
class OpcUaClient {
  // 1. Static properties
  static readonly DEFAULT_PORT = 4840;

  // 2. Static methods
  static parseEndpoint(url: string): Endpoint {
    // ...
  }

  // 3. Instance properties
  public isConnected: boolean = false;
  protected endpoint: string;
  private sessionId: string = "";

  // 4. Constructor
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  // 5. Getters/setters
  get session(): string | null {
    return this.sessionId || null;
  }

  // 6. Public methods
  async connect(): Promise<void> {
    // ...
  }

  async disconnect(): Promise<void> {
    // ...
  }

  // 7. Protected methods
  protected async createSession(): Promise<void> {
    // ...
  }

  // 8. Private methods
  private async establishConnection(): Promise<void> {
    // ...
  }
}
```

### Interface Naming and Structure

```typescript
// ✅ Data structures: noun phrases
interface ApplicationDescription {
  applicationUri: string;
  productUri: string;
}

// ✅ Behavior contracts: adjective or verb phrase
interface Serializable {
  serialize(): Buffer;
  deserialize(buffer: Buffer): void;
}

interface ClientCallback {
  onConnect(): void;
  onDisconnect(reason: string): void;
}
```

---

## Enumerations

### Enum Declaration

**Prefer const enums** for generated types (eliminates runtime overhead):
```typescript
// ✅ Good: const enum for generated OPC UA types
export const enum ApplicationType {
  Server = 0,
  Client = 1,
  ClientAndServer = 2,
  DiscoveryServer = 3,
}
```

**Use regular enums** when you need runtime capabilities:
```typescript
// ✅ Good: regular enum when runtime access needed
export enum ConnectionState {
  Disconnected = "DISCONNECTED",
  Connecting = "CONNECTING",
  Connected = "CONNECTED",
  Reconnecting = "RECONNECTING",
}

// Can iterate or access at runtime
Object.values(ConnectionState).forEach(state => {
  console.log(state);
});
```

### Enum Value Assignment

**Numeric enums**: Always assign explicit values
```typescript
// ✅ Good: Explicit numeric values
export const enum MessageSecurityMode {
  Invalid = 0,
  None = 1,
  Sign = 2,
  SignAndEncrypt = 3,
}

// ❌ Bad: Auto-incrementing values (unclear)
export const enum MessageSecurityMode {
  Invalid,  // 0? or something else?
  None,     // 1?
  Sign,
}
```

**String enums**: Always assign explicit values
```typescript
// ✅ Good: String enums with explicit values
export enum LogLevel {
  Error = "ERROR",
  Warning = "WARNING",
  Info = "INFO",
  Debug = "DEBUG",
}
```

### Enum Formatting

```typescript
// ✅ Good: One member per line, aligned values
export const enum ApplicationType {
  Server = 0,
  Client = 1,
  ClientAndServer = 2,
  DiscoveryServer = 3,
}

// ✅ Good: Trailing comma on last member
export enum NodeClass {
  Object = 1,
  Variable = 2,
  Method = 4,
  ObjectType = 8,
}
```

---

## Functions and Methods

### Function Declaration Style

**Prefer function declarations for top-level functions**:
```typescript
// ✅ Good
export function parseNodeId(input: string): NodeId {
  // ...
}

// ❌ Avoid arrow functions for top-level exports
export const parseNodeId = (input: string): NodeId => {
  // ...
};
```

**Use arrow functions for callbacks and short utilities**:
```typescript
// ✅ Good
const nodeIds = strings.map(s => parseNodeId(s));

const isValid = (nodeId: NodeId): boolean => nodeId.value >= 0;
```

### Parameter Order

1. Required parameters
2. Optional parameters
3. Rest parameters

```typescript
// ✅ Good
function createClient(
  endpoint: string,
  options?: ClientOptions,
  ...middleware: Middleware[]
): OpcUaClient {
  // ...
}

// ❌ Bad (optional before required)
function createClient(
  options?: ClientOptions,
  endpoint: string  // ❌ required after optional
): OpcUaClient {
  // ...
}
```

### Default Parameters

```typescript
// ✅ Good: Default parameters in signature
function setTimeout(duration: number = 5000): void {
  // ...
}

// ✅ Good: Object with defaults
interface ConnectionOptions {
  timeout?: number;
  retryAttempts?: number;
}

function connect(options: ConnectionOptions = {}): void {
  const { timeout = 5000, retryAttempts = 3 } = options;
  // ...
}
```

---

## Import Organization

### Import Order

1. Node.js built-in modules
2. External dependencies (node_modules)
3. Internal absolute imports (from `src/`)
4. Relative imports (parent directories)
5. Relative imports (same directory)

Each group separated by a blank line:

```typescript
// 1. Node.js built-ins
import { Buffer } from "buffer";
import { EventEmitter } from "events";

// 2. External dependencies
import { XMLParser } from "fast-xml-parser";

// 3. Internal absolute imports
import { ApplicationType } from "@/types/ApplicationType";
import { NodeId } from "@/types/NodeId";

// 4. Relative imports (parent)
import { parseNodeId } from "../utils/nodeIdParser";

// 5. Relative imports (same directory)
import { ClientConfig } from "./ClientConfig";
```

### Import Style

**Prefer named imports**:
```typescript
// ✅ Good
import { ApplicationType, ApplicationDescription } from "./types";

// ❌ Avoid default exports unless necessary
import ApplicationType from "./ApplicationType";  // Avoid
```

**Group related imports**:
```typescript
// ✅ Good
import {
  ApplicationType,
  ApplicationDescription,
  EndpointDescription,
} from "./types";

// ❌ Bad (separate imports for same module)
import { ApplicationType } from "./types";
import { ApplicationDescription } from "./types";
import { EndpointDescription } from "./types";
```

---

## Comments and Documentation

### JSDoc for Public API

**All public exports** must have JSDoc:
```typescript
/**
 * Parses a NodeId from its string representation.
 * 
 * @param input - The NodeId string (e.g., "ns=2;i=308")
 * @returns Parsed NodeId object
 * @throws {Error} If input format is invalid
 * 
 * @example
 * ```typescript
 * const nodeId = parseNodeId("ns=0;i=308");
 * console.log(nodeId.namespace); // 0
 * console.log(nodeId.identifier); // 308
 * ```
 */
export function parseNodeId(input: string): NodeId {
  // ...
}
```

### Inline Comments

**Use `//` for inline comments**:
```typescript
// Check if endpoint uses secure transport
const isSecure = endpoint.startsWith("opc.tcp://");

// Parse namespace and identifier components
const [namespace, identifier] = input.split(";");
```

**Explain "why", not "what"**:
```typescript
// ✅ Good (explains reasoning)
// Use numeric identifier for builtin types to avoid string lookup overhead
const builtinId = this.getNumericId(type);

// ❌ Bad (obvious from code)
// Set x to 5
const x = 5;
```

### TODO and FIXME

```typescript
// TODO: Implement session timeout handling
// TODO(username): Add retry logic with exponential backoff
// FIXME: Race condition when multiple connections established simultaneously
// NOTE: This assumes namespace 0 for all builtin types
```

---

## Error Handling

### Prefer Custom Error Classes

```typescript
// ✅ Good: Custom error classes
export class OpcUaError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode?: number
  ) {
    super(message);
    this.name = "OpcUaError";
  }
}

export class ConnectionError extends OpcUaError {
  constructor(message: string) {
    super(message, "CONNECTION_ERROR");
    this.name = "ConnectionError";
  }
}

// Usage
throw new ConnectionError("Failed to connect to endpoint");
```

### Error Handling Patterns

```typescript
// ✅ Good: Specific error handling
try {
  await client.connect();
} catch (error) {
  if (error instanceof ConnectionError) {
    // Handle connection errors specifically
    await this.retryConnection();
  } else if (error instanceof OpcUaError) {
    // Handle other OPC UA errors
    this.logError(error.code, error.message);
  } else {
    // Re-throw unexpected errors
    throw error;
  }
}
```

### Input Validation

```typescript
// ✅ Good: Validate early, throw specific errors
export function parseNodeId(input: string): NodeId {
  if (!input || typeof input !== "string") {
    throw new TypeError("NodeId input must be a non-empty string");
  }

  if (!input.includes(";")) {
    throw new OpcUaError(
      `Invalid NodeId format: ${input}`,
      "INVALID_FORMAT"
    );
  }

  // Continue parsing...
}
```

---

## Async/Await

### Always Use Async/Await Over Promises

```typescript
// ✅ Good: async/await
async function connect(): Promise<void> {
  await this.establishConnection();
  await this.authenticateUser();
  await this.createSession();
}

// ❌ Bad: Promise chains
function connect(): Promise<void> {
  return this.establishConnection()
    .then(() => this.authenticateUser())
    .then(() => this.createSession());
}
```

### Error Handling in Async Functions

```typescript
// ✅ Good: try/catch with async/await
async function sendRequest(request: Request): Promise<Response> {
  try {
    const response = await this.transport.send(request);
    return this.parseResponse(response);
  } catch (error) {
    this.logger.error("Request failed", { error });
    throw new OpcUaError("Failed to send request", "REQUEST_FAILED");
  }
}
```

### Parallel vs Sequential Execution

```typescript
// ✅ Good: Parallel execution when operations are independent
async function loadResources(): Promise<void> {
  const [types, references, nodeIds] = await Promise.all([
    this.loadTypes(),
    this.loadReferences(),
    this.loadNodeIds(),
  ]);
}

// ✅ Good: Sequential when operations depend on each other
async function connect(): Promise<void> {
  await this.establishConnection();  // Must complete first
  await this.authenticate();         // Depends on connection
  await this.createSession();        // Depends on authentication
}
```

---

## Testing

### Test File Naming and Location

**Co-located tests** (preferred for unit tests):
```
src/
├── client/
│   ├── OpcUaClient.ts
│   └── OpcUaClient.test.ts
```

**Separate test directory** (for integration tests):
```
src/__tests__/
├── integration/
│   └── OpcUaClient.integration.test.ts
```

### Test Structure

Use **Arrange-Act-Assert** pattern:
```typescript
import { describe, it, expect } from "vitest";
import { parseNodeId } from "./nodeIdParser";

describe("parseNodeId", () => {
  it("should parse numeric NodeId with namespace", () => {
    // Arrange
    const input = "ns=2;i=308";

    // Act
    const result = parseNodeId(input);

    // Assert
    expect(result.namespace).toBe(2);
    expect(result.identifier).toBe(308);
    expect(result.identifierType).toBe("numeric");
  });

  it("should throw error for invalid format", () => {
    // Arrange
    const input = "invalid";

    // Act & Assert
    expect(() => parseNodeId(input)).toThrow("Invalid NodeId format");
  });
});
```

### Test Naming

- **Test functions**: `should [expected behavior] when [condition]`
- **Describe blocks**: Match function/class name being tested

```typescript
describe("ApplicationType enum", () => {
  it("should have Server value of 0", () => {
    expect(ApplicationType.Server).toBe(0);
  });

  it("should have all standard OPC UA application types", () => {
    expect(ApplicationType.Client).toBeDefined();
    expect(ApplicationType.ClientAndServer).toBeDefined();
  });
});
```

---

## Summary Checklist

When writing TypeScript code for opcuajs:

- [ ] One primary export per file (interface, class, enum, or utility)
- [ ] File name matches exported type/class name (PascalCase)
- [ ] camelCase for variables, parameters, functions
- [ ] PascalCase for classes, interfaces, types (no "I" prefix)
- [ ] UPPER_SNAKE_CASE for compile-time constants
- [ ] No underscore prefix for private members (use `private` keyword)
- [ ] 2-space indentation, semicolons always, trailing commas
- [ ] Opening braces on same line (K&R style)
- [ ] Always use braces for if/else/for/while blocks
- [ ] Explicit return types for all public functions
- [ ] JSDoc for all public API exports
- [ ] Prefer `const enum` for OPC UA generated types
- [ ] Organize imports: built-ins → external → internal → relative
- [ ] Use async/await over raw Promises
- [ ] Custom error classes extending Error
- [ ] Test file co-located with source (*.test.ts)
- [ ] Avoid `any`, prefer `unknown` or specific types

---

**Related Documents**:
- [TypeScript Implementation Plan](../opcuaspec/specs/generator/001-nodeset-type-gen/plan-ts.md)
- [TypeScript Data Model](../opcuaspec/specs/generator/001-nodeset-type-gen/data-model-ts.md)
