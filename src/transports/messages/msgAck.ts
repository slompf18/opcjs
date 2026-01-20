import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";
import { UInt32 } from "../../types/baseTypes"
import { MsgHeader } from "./msgHeader";
import { MsgTypeAck, MsgTypeHello } from "./msgTypes";

// https://reference.opcfoundation.org/Core/Part6/v105/docs/7.1.2.4
export class MsgAck implements IEncodable {
    public header: MsgHeader = new MsgHeader(MsgTypeAck, 0);

    constructor(
        public ProtocolVersion: UInt32,
        public ReceiveBufferSize: UInt32,
        public SendBufferSize: UInt32,
        public MaxMessageSize: UInt32,
        public MaxChunkCount: UInt32) {
    }

    public static decode(buffer: BufferReader): MsgAck {
        const msg = new MsgAck(0, 0, 0, 0, 0);
        msg.header = MsgHeader.decode(buffer);
        msg.ProtocolVersion = buffer.readUInt32();
        msg.ReceiveBufferSize = buffer.readUInt32();
        msg.SendBufferSize = buffer.readUInt32();
        msg.MaxMessageSize = buffer.readUInt32();
        msg.MaxChunkCount = buffer.readUInt32();
        return msg;
    }

    encode(buffer: BufferWriter) {
        this.header.encode(buffer);
        buffer.writeUInt32(this.ProtocolVersion);
        buffer.writeUInt32(this.ReceiveBufferSize);
        buffer.writeUInt32(this.SendBufferSize);
        buffer.writeUInt32(this.MaxMessageSize);
        buffer.writeUInt32(this.MaxChunkCount);
    }
}