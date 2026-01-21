import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { MsgHeader } from "./msgHeader";
import { MsgSecurityHeaderSymmetric } from "./msgSecurityHeaderSymmetric";
import { MsgSequenceHeader } from "./msgSequenceHeader";
import { IEncryptionAlgorithm } from "../../cryption/iEncryptionAlgorithm";
import { MsgBase } from "./msgBase";

export class MsgSymmetric extends MsgBase {
    constructor(
        public header: MsgHeader,
        public securityHeader: MsgSecurityHeaderSymmetric,
        public sequenceHeader: MsgSequenceHeader,
        public body: Uint8Array) {
        super();
    }

    static decode(
        buffer: BufferReader,
        header: MsgHeader,
        encryptionAlgorithm: IEncryptionAlgorithm) {

        const securityHeader = MsgSecurityHeaderSymmetric.decode(buffer);
        const headerLength = buffer.getPosition();
        const sequenceHeader = MsgSequenceHeader.decode(buffer);

        const body = MsgBase.DecryptAndVerify(
            buffer.readRemainingBytes(),
            encryptionAlgorithm, 
            headerLength
        );
        return new MsgSymmetric(header, securityHeader, sequenceHeader, body);
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

        const dataToPrependForSignature = buffer.getData().slice(0, buffer.getLength());
        const encryptedBody=super.Encrypt(buffer, encryptionAlgorithm, headerLength)
        buffer.writeDirectAt(encryptedBody, bodyStartPos);

        // the size was written by encrypt
    }
}