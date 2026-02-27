import { IReader, UaString } from "@opcua/base";
import { IWriter } from "../../codecs/interfaces/iWriter";
import { MsgHeader } from "./msgHeader";
import { MsgTypeError } from "./msgTypes";

// https://reference.opcfoundation.org/Core/Part6/v105/docs/7.1.2.5
export class MsgError {
    private header: MsgHeader = new MsgHeader(MsgTypeError, 0);

    constructor(
        public error: number,
        public reason: UaString) {
    }

    static decode(buffer: IReader): MsgError {
        const msg = new MsgError(0, '');
        msg.header = MsgHeader.decode(buffer);
        msg.error = buffer.readUInt32();
        msg.reason = buffer.readString();
        return msg;
    }

    encode(buffer: IWriter) {
        this.header.encode(buffer);
        buffer.writeUInt32(this.error);
        buffer.writeString(this.reason);
    }
}