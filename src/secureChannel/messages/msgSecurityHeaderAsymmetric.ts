import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";

export class MsgSecurityHeaderAsymmetric {
    constructor(
        public securityPolicyUri: string,
        public senderCertificate: Uint8Array,
        public receiverCertificateThumbprint: Uint8Array
    ) { }

    static decode(buffer:BufferReader): MsgSecurityHeaderAsymmetric {
        const securityPolicyUri = buffer.readString();
        const senderCertificate = buffer.readByteArray();
        const receiverCertificateThumbprint = buffer.readByteArray();
        return new MsgSecurityHeaderAsymmetric(
            securityPolicyUri,
            senderCertificate,
            receiverCertificateThumbprint
        );
    }

    encode(buffer: BufferWriter) {
        buffer.writeString(this.securityPolicyUri);
        buffer.writeByteArray(this.senderCertificate);
        buffer.writeByteArray(this.receiverCertificateThumbprint);
    }
}