# User Token – User Name Password Server Facet

**Specification**: OPC 10000-7 §6.x (Profiles), version 1.05  
**Profile URI**: `http://opcfoundation.org/UA-Profile/Security/UserToken/Server/UserNamePassword`  
**Category**: Security  

## Overview

This Facet indicates that the server supports a user token comprised of a username and password.
This user token can affect the behaviour of the `ActivateSession` Service.
It is explicitly required by the Core 2022 Server Facet description which states that "authentication with UserName and Password" is a key requirement.

## Required Conformance Units

| Status | Document | Conformance Unit |
|--------|----------|-----------------|
| ❌ | [security-invalid-user-token.md](./security-invalid-user-token.md) | Security Invalid user token |
| ❌ | [security-user-name-password-2.md](./security-user-name-password-2.md) | Security User Name Password 2 |

## Optional Conformance Units

| Status | Document | Conformance Unit |
|--------|----------|-----------------|
| ❌ | [security-user-token-unencrypted.md](./security-user-token-unencrypted.md) | Security User Token Unencrypted |
