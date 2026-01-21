import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

// https://reference.opcfoundation.org/Core/Part6/v105/docs/6.7.2.3
export class MsgSecurityHeaderAsymmetric {
    constructor(
        public securityPolicyUri: string,
        public senderCertificate?: Uint8Array,
        public receiverCertificateThumbprint?: Uint8Array
    ) { }

    static decode(buffer:BufferReader): MsgSecurityHeaderAsymmetric {
        const securityPolicyUri = buffer.readString();
        const senderCertificate = buffer.readByteString();
        const receiverCertificateThumbprint = buffer.readByteString();
        return new MsgSecurityHeaderAsymmetric(
            securityPolicyUri,
            senderCertificate,
            receiverCertificateThumbprint
        );
    }

    encode(buffer: BufferWriter) {
        buffer.writeString(this.securityPolicyUri);
        buffer.writeByteString(this.senderCertificate);
        buffer.writeByteString(this.receiverCertificateThumbprint);
    }
}