import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { MsgType } from "./msgType";

export class MsgHeader{
    constructor(
        public msgType: MsgType,
        public messageSize: UInt32, 
        public secureChannelId: UInt32
    ) {}

    static decode(buffer: BufferReader): MsgHeader {
        const msgType = buffer.readUInt32();
        const messageSize = buffer.readUInt32();
        const secureChannelId = buffer.readUInt32();

        return new MsgHeader(msgType, messageSize, secureChannelId);
    }

    encode(buffer: BufferWriter) {
        buffer.writeUInt32(this.msgType);
        buffer.writeUInt32(this.messageSize);
        buffer.writeUInt32(this.secureChannelId);
    }
}