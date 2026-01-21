import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

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