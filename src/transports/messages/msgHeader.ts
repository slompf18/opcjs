import { BufferWriter } from "../../coders/binary/bufferWriter";
import { UInt32 } from "../../common/baseTypes";

export class MsgHeader {
    constructor(public messageType: UInt32, public messageSize: UInt32) {
    }

    encode(buffer: BufferWriter){
        buffer.writeUInt32(this.messageType);
        buffer.writeUInt32(this.messageSize);
    }
}