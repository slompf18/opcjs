import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";
import { UInt32 } from "../../types/baseTypes"
import { MsgHeader } from "./msgHeader";
import { MsgTypeHello } from "./msgTypes";

// https://reference.opcfoundation.org/Core/Part6/v105/docs/7.1.2.3
export class MsgHello implements IEncodable {
    private header: MsgHeader = new MsgHeader(MsgTypeHello, 0);

    constructor(
        public ProtocolVersion: UInt32,
        public ReceiveBufferSize: UInt32,
        public SendBufferSize: UInt32,
        public MaxMessageSize: UInt32,
        public MaxChunkCount: UInt32,
        public EndpointUrl: string) {
    }

    encode(buffer: BufferWriter) {
        this.header.encode(buffer);
        buffer.writeUInt32(this.ProtocolVersion);
        buffer.writeUInt32(this.ReceiveBufferSize);
        buffer.writeUInt32(this.SendBufferSize);
        buffer.writeUInt32(this.MaxMessageSize);
        buffer.writeUInt32(this.MaxChunkCount);
        buffer.writeString(this.EndpointUrl);
    }
}