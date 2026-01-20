import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncryptionAlgorithm } from "../../cryption/iEncryptionAlgorithm";
import { MsgBase } from "./msgBase";
import { MsgHeader } from "./msgHeader";
import { MsgSecurityHeaderAsymmetric } from "./msgSecurityHeaderAsymmetric";
import { MsgSequenceHeader } from "./msgSequenceHeader";

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

        const decryptedBody = MsgBase.DecryptAndVerify(
            buffer.readRemainingBytes(), encryptionAlgorithm, headerLength);
        buffer = new BufferReader(decryptedBody);
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
        buffer.writeDirect(this.body);
        
        const encryptedBody = super.Encrypt(buffer, encryptionAlgorithm, headerLength);
        buffer.writeDirectAt(encryptedBody, bodyStartPos);

        // the size was written by encrypt
    }
}