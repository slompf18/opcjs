import { ICertificate } from "../certificates/iCertificate";
import { EncryptionAlgorithmUnauthenticated } from "../cryption/encryptionAlgorithmUnauthenticated";
import { IEncryptionAlgorithm } from "../cryption/iEncryptionAlgorithm";
import { MessageSecurityModeEnum } from "../schema/enums";

export class SecurityPolicyNone{
    getSecurityMode(): MessageSecurityModeEnum{
        return MessageSecurityModeEnum.None;
    }

    getSecurityPolicyUri(): string{
        return 'http://opcfoundation.org/UA/SecurityPolicy#None';
    }

    getSecurityLevel(): number{
        return 1;
    }

    getCertificate(): Uint8Array{
        return new Uint8Array();
    }

    createNonce(): Uint8Array{
        return new Uint8Array();
    }

    verifyNonce(nonce: Uint8Array): boolean{
        return true;
    }

    getAlgorithmSymmetric(
        localCertificate: ICertificate,
        remoteCertificate: ICertificate
    ): IEncryptionAlgorithm {
        return new EncryptionAlgorithmUnauthenticated(
            1,
            1,
            false,
            (cleartext: Uint8Array) => cleartext,
            (ciphertext: Uint8Array) => ciphertext,
            (message: Uint8Array) => new Uint8Array(),
            (message: Uint8Array, signature: Uint8Array) => true,
            0,
            0,
            ''           
        )
    }

    getAlgorithmAsymmetric(
        localNonce: Uint8Array,
        remoteNonce: Uint8Array
    ): IEncryptionAlgorithm {
        return new EncryptionAlgorithmUnauthenticated(
            1,
            1,
            false,
            (cleartext: Uint8Array) => cleartext,
            (ciphertext: Uint8Array) => ciphertext,
            (message: Uint8Array) => new Uint8Array(),
            (message: Uint8Array, signature: Uint8Array) => true,
            0,
            0,
            ''           
        )
    }
    
}