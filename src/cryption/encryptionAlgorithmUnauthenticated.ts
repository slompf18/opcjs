import { UInt32 } from "../types/baseTypes";
import { IEncryptionAlgorithm } from "./iEncryptionAlgorithm";

export class EncryptionAlgorithmUnauthenticated implements IEncryptionAlgorithm {
    constructor(
        private cipherBlockSize: UInt32,
        private plainTextBlockSize: UInt32,
        private encrypt: (cleartext: Uint8Array) => Uint8Array,
        private decrypt: (ciphertext: Uint8Array) => Uint8Array,
        private calculateSignature: (message: Uint8Array) => Uint8Array,
        private verifySignature: (message: Uint8Array, signature: Uint8Array) => boolean,
        private signatureLength: UInt32,
        private remoteSignatureLength: UInt32,
        private signatureUri: string
    ) { }

    IsAuthenticated(): boolean {
        return false;
    }

    GetMaxPayload(maxCipherTextSize: UInt32): UInt32 {
        const maxCipherBlocks = maxCipherTextSize / this.cipherBlockSize
        const maxPlainTextSize = maxCipherBlocks * this.plainTextBlockSize
        const maxPayloadSize = maxPlainTextSize - this.signatureLength - 1

        return maxPayloadSize
    }

    GetEncryptedSize(dataSize: UInt32): UInt32 {
        const size = dataSize + this.signatureLength
        const blockCount = size / this.plainTextBlockSize
        const encryptedLength = blockCount * this.cipherBlockSize

        return encryptedLength
    }

    GetPadding(bytesToWrite: UInt32): Uint8Array {
        const plaintextBlockSize = this.plainTextBlockSize
        const signatureSize = this.GetSignatureLength()
        const extraPadding = this.remoteSignatureLength > 256
        const paddingBytes = 1

        // should be zero for non final chunks
        const paddingSize = plaintextBlockSize - ((bytesToWrite + signatureSize + paddingBytes) % plaintextBlockSize)
        const padding = new Uint8Array(paddingSize + 1 + (extraPadding ? 1 : 0))
        
        // Padding added to the end of the Message to ensure length of the data to encrypt is an integer
        // multiple of the encryption block size. The value of each byte of the padding is equal to PaddingSize.
        padding.fill(paddingSize, 0, paddingSize + 1)

        if (extraPadding) {
            // The most significant byte of a two-byte integer used to specify the padding size when the key used
            // to encrypt the message chunk is larger than 2048 bits. This field is omitted if the key length is
            // less than or equal to 2048 bits.
            padding[paddingSize + 1] = paddingSize >> 8
        }

        return padding
    }

    Encrypt(cleartext: Uint8Array): Uint8Array {
        return this.encrypt(cleartext);
    }
    Decrypt(ciphertext: Uint8Array): Uint8Array {
        return this.decrypt(ciphertext);
    }
    CalculateSignature(message: Uint8Array): Uint8Array {
        return this.calculateSignature(message);
    }
    VerifySignature(message: Uint8Array, signature: Uint8Array): boolean {
        return this.verifySignature(message, signature);
    }
    GetSignatureLength(): UInt32 {
        return this.signatureLength;
    }
    SignatureUri(): string {
        return this.signatureUri;
    }
}