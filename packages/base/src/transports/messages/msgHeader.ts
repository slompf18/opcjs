import { IReader } from "../../codecs/interfaces/iReader";
import { IWriter } from "../../codecs/interfaces/iWriter";

export class MsgHeader {
    constructor(public messageType: number, public messageSize: number) {
    }

    public static decode(buffer: IReader): MsgHeader {
        const header = new MsgHeader(0, 0);
        header.messageType = buffer.readUInt32();
        header.messageSize = buffer.readUInt32();
        return header;
    }

    encode(buffer: IWriter) {
        buffer.writeUInt32(this.messageType);
        buffer.writeUInt32(this.messageSize);
    }
}