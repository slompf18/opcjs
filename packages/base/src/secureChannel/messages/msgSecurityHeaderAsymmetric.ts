import { BinaryReader } from "../../codecs/binary/binaryReader";
import { BinaryWriter } from "../../codecs/binary/binaryWriter";

// https://reference.opcfoundation.org/Core/Part6/v105/docs/6.7.2.3
export class MsgSecurityHeaderAsymmetric {

    static decode(buffer:BinaryReader): MsgSecurityHeaderAsymmetric {
        const securityPolicyUri = buffer.readString() as string;
        const senderCertificate = buffer.readByteString() as Uint8Array;
        const receiverCertificateThumbprint = buffer.readByteString() as Uint8Array;
        const header =  new MsgSecurityHeaderAsymmetric(
            securityPolicyUri,
            senderCertificate,
            receiverCertificateThumbprint
        );
        return header;
    }

    encode(buffer: BinaryWriter) {
        buffer.writeString(this.securityPolicyUri);
        buffer.writeByteString(this.senderCertificate);
        buffer.writeByteString(this.receiverCertificateThumbprint);
    }
    
    constructor(
        public securityPolicyUri: string,
        public senderCertificate?: Uint8Array,
        public receiverCertificateThumbprint?: Uint8Array
    ) { }
}