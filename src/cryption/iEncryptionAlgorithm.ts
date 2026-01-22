import { UInt32 } from "../types/baseTypes";

export interface IEncryptionAlgorithm {
    IsAuthenticated(): boolean
    GetMaxPayload(maxCipherTextSize: UInt32): UInt32

    GetEncryptedSize(dataSize: UInt32): UInt32

    GetPadding(bytesToWrite: UInt32): Uint8Array

    HasPadding(): boolean
    
    // Encrypt encrypts the input cleartext based on the algorithms and keys passed in
    Encrypt(cleartext: Uint8Array): Uint8Array

    // Decrypt decrypts the input ciphertext based on the algorithms and keys passed in
    Decrypt(ciphertext: Uint8Array): Uint8Array

    // CalculateSignature returns the cryptographic signature of message
    CalculateSignature(message: Uint8Array): Uint8Array

    // VerifySignature validates that 'signature' is the correct cryptographic signature
    // of 'message' or returns an error.
    // A return value of nil means the signature is valid
    VerifySignature(message: Uint8Array, signature: Uint8Array): boolean

    // GetSignatureLength returns the length in bytes for outgoing signatures.
    GetSignatureLength(): UInt32

    // SignatureURI returns the URI for the signature algorithm as defined
    // by the OPC-UA profiles in Part 7
    SignatureUri(): string
}