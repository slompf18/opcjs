import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { IEncodable } from "../../codecs/iEncodable";
import { UInt32 } from "../../types/baseTypes"
import { MsgHeader } from "./msgHeader";
import { MsgTypeError } from "./msgTypes";

// https://reference.opcfoundation.org/Core/Part6/v105/docs/7.1.2.5
export class MsgError implements IEncodable {
    private header: MsgHeader = new MsgHeader(MsgTypeError, 0);

    constructor(
        public error: UInt32,
        public reason: string) {
    }

    static decode(buffer: BufferReader): MsgError {
        const msg = new MsgError(0, '');
        msg.header = MsgHeader.decode(buffer);
        msg.error = buffer.readUInt32();
        msg.reason = buffer.readString();
        return msg;
    }

    encode(buffer: BufferWriter) {
        this.header.encode(buffer);
        buffer.writeUInt32(this.error);
        buffer.writeString(this.reason);
    }
}