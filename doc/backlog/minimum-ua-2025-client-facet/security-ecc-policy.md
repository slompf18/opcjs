# Security ECC Policy

**Facet**: Minimum UA 2025 Client Facet  
**Type**: Optional  
**Status**: ❌ Not Implemented  

## Description

The client must support at least one ECC-based security policy suitable for devices with limited resources. The supported policies are:

- **SecurityPolicy [ECC-A]** — average security needs (equivalent to Aes128-Sha256-RsaOaep in terms of security level, but using ECC key sizes):
  - `ECC-nistP256` — NIST P-256 curve
  - `ECC-brainpoolP256r1` — Brainpool P-256 curve
  - `ECC-curve25519-ChaCha20Poly1305` — Curve25519 with ChaCha20-Poly1305
- **SecurityPolicy [ECC-B]** — high security needs (equivalent to Aes256-Sha256-RsaPss):
  - `ECC-nistP384` — NIST P-384 curve
  - `ECC-brainpoolP384r1` — Brainpool P-384 curve
  - `ECC-curve448-ChaCha20Poly1305` — Curve448 with ChaCha20-Poly1305

It is recommended to support both [ECC-A] and [ECC-B] to maximise interoperability and provide a fallback if one algorithm is compromised.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-6 | §7 | Security Policies |
| profiles.opcfoundation.org | [CU 3721](https://profiles.opcfoundation.org/conformanceunit/3721) | Security ECC Policy |
| profiles.opcfoundation.org | [profile 2064](https://profiles.opcfoundation.org/profile/2064) | SecurityPolicy [ECC-B] – ECC-nistP256 |
| profiles.opcfoundation.org | [profile 2065](https://profiles.opcfoundation.org/profile/2065) | SecurityPolicy – ECC-nistP384 |
