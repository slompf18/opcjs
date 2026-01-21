import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

// https://reference.opcfoundation.org/Core/Part6/v105/docs/6.7.2.3
export class MsgSecurityHeaderSymmetric {
    constructor(public tokenId: number) { }

    static decode(buffer: BufferReader): MsgSecurityHeaderSymmetric {
        const tokenId = buffer.readUInt32();
        return new MsgSecurityHeaderSymmetric(tokenId);
    }

    encode(buffer: BufferWriter) {
        buffer.writeUInt32(this.tokenId);
    }
}