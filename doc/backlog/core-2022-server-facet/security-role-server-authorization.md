# Security Role Server Authorization

**Facet**: Core 2022 Server Facet  
**Type**: Optional  
**Status**: ❌ Not Implemented  

## Description

The server must restrict access to Nodes and Services based on configured Roles and permissions. This requires implementing the OPC UA Role-Based Access Control (RBAC) model.

**Server responsibilities**:
- Associate each authenticated user session with one or more Roles.
- Evaluate `RolePermissions` and `UserRolePermissions` Attributes on Nodes before performing any service operation.
- Return `Bad_UserAccessDenied` when the user's roles do not include the required permission for the requested operation (e.g. Browse, Read, Write, Call).
- Expose the role configuration Information Model under `Server.ServerCapabilities.RoleSet` (see [User Role Base 2022 Server Facet](https://profiles.opcfoundation.org/profile/1351)).

**Well-Known Roles** (defined in OPC 10000-3):
- `Anonymous` — unauthenticated users
- `AuthenticatedUser` — any authenticated user
- `Observer` — read-only access
- `Operator` — can read and write process data
- `Engineer` — can configure the server
- `Supervisor` — can read and acknowledge alarms
- `ConfigureAdmin` — can configure the server's security
- `SecurityAdmin` — can manage certificates and roles

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-3 | §4.8 | Role-Based Access Control |
| OPC 10000-18 | | Role-Based Security |
| profiles.opcfoundation.org | [CU 2808](https://profiles.opcfoundation.org/conformanceunit/2808) | Security Role Server Authorization |
