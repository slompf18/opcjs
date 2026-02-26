import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";

export class MsgHeader {
    constructor(public messageType: UInt32, public messageSize: UInt32) {
    }

    public static decode(buffer: BufferReader): MsgHeader {
        const header = new MsgHeader(0, 0);
        header.messageType = buffer.readUInt32();
        header.messageSize = buffer.readUInt32();
        return header;
    }

    encode(buffer: BufferWriter) {
        buffer.writeUInt32(this.messageType);
        buffer.writeUInt32(this.messageSize);
    }
}