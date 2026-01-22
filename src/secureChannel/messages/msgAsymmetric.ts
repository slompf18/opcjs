import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferUtils } from "../../codecs/binary/bufferUtils";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { IEncryptionAlgorithm } from "../../cryption/iEncryptionAlgorithm";
import { MsgBase } from "./msgBase";
import { MsgHeader } from "./msgHeader";
import { MsgSecurityHeaderAsymmetric } from "./msgSecurityHeaderAsymmetric";
import { MsgSequenceHeader } from "./msgSequenceHeader";

// https://reference.opcfoundation.org/Core/Part6/v105/docs/6.7.2
export class MsgAsymmetric extends MsgBase {
    constructor(
        public header: MsgHeader,
        public securityHeader: MsgSecurityHeaderAsymmetric,
        public sequenceHeader: MsgSequenceHeader,
        public body: Uint8Array) {
            super();
    }

    static decode(buffer: BufferReader,
        header: MsgHeader,
        headerSecurity: MsgSecurityHeaderAsymmetric,
        headerLength: number,
        encryptionAlgorithm: IEncryptionAlgorithm) {

                BufferUtils.Log('before decryption',buffer.readRemainingBytes(), buffer.getPosition());
                buffer.rewind();
        const decryptedBody = MsgBase.DecryptAndVerify(
            buffer.readRemainingBytes(), encryptionAlgorithm, headerLength);
        buffer = new BufferReader(decryptedBody);
                BufferUtils.Log('after decryption',decryptedBody, 0);
        const sequenceHeader = MsgSequenceHeader.decode(buffer);
        const body = buffer.readRemainingBytes();

        return new MsgAsymmetric(
            header,
            headerSecurity,
            sequenceHeader,
            body
        );
    }

    encode(
        buffer: BufferWriter,
        encryptionAlgorithm: IEncryptionAlgorithm) {
        
        this.header.encode(buffer);
        this.securityHeader.encode(buffer);
        const headerLength = buffer.getLength();
        this.sequenceHeader.encode(buffer);
        const bodyStartPos = buffer.getLength();
        buffer.writeBytes(this.body);
        
        const encryptedBody = super.Encrypt(buffer, encryptionAlgorithm, headerLength, bodyStartPos);
        buffer.writeBytesAt(encryptedBody, headerLength);

        // the size was written by encrypt
    }
}