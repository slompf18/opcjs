import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { MsgHeader } from "./msgHeader";
import { MsgSecurityHeaderSymmetric } from "./msgSecurityHeaderSymmetric";
import { MsgSequenceHeader } from "./msgSequenceHeader";
import { IEncryptionAlgorithm } from "../../cryption/iEncryptionAlgorithm";
import { MsgBase } from "./msgBase";

// https://reference.opcfoundation.org/Core/Part6/v105/docs/6.7.2
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
        securityHeader: MsgSecurityHeaderSymmetric,
        encryptionAlgorithm: IEncryptionAlgorithm) {

        const headerLength = buffer.getPosition();

        buffer.rewind();
        const decryptedData = MsgBase.DecryptAndVerify(
            buffer.readRemainingBytes(),
            encryptionAlgorithm, 
            headerLength
        );
        
        buffer = new BufferReader(decryptedData);
        const sequenceHeader = MsgSequenceHeader.decode(buffer);
        const body = buffer.readRemainingBytes();

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
        buffer.writeBytes(this.body);

        const encryptedBody=super.Encrypt(buffer, encryptionAlgorithm, headerLength, bodyStartPos)
        buffer.writeBytesAt(encryptedBody, headerLength);

        // the size was written by encrypt
    }
}