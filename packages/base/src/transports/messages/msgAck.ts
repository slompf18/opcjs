import { IReader } from "../../codecs/interfaces/iReader";
import { IWriter } from "../../codecs/interfaces/iWriter";
import { MsgHeader } from "./msgHeader";
import { MsgTypeAck } from "./msgTypes";

// https://reference.opcfoundation.org/Core/Part6/v105/docs/7.1.2.4
export class MsgAck {
    public header: MsgHeader = new MsgHeader(MsgTypeAck, 0);

    constructor(
        public ProtocolVersion: number,
        public ReceiveBufferSize: number,
        public SendBufferSize: number,
        public MaxMessageSize: number,
        public MaxChunkCount: number) {
    }

    static decode(buffer: IReader): MsgAck {
        const msg = new MsgAck(0, 0, 0, 0, 0);
        msg.header = MsgHeader.decode(buffer);
        msg.ProtocolVersion = buffer.readUInt32();
        msg.ReceiveBufferSize = buffer.readUInt32();
        msg.SendBufferSize = buffer.readUInt32();
        msg.MaxMessageSize = buffer.readUInt32();
        msg.MaxChunkCount = buffer.readUInt32();
        return msg;
    }

    encode(buffer: IWriter) {
        this.header.encode(buffer);
        buffer.writeUInt32(this.ProtocolVersion);
        buffer.writeUInt32(this.ReceiveBufferSize);
        buffer.writeUInt32(this.SendBufferSize);
        buffer.writeUInt32(this.MaxMessageSize);
        buffer.writeUInt32(this.MaxChunkCount);
    }
}