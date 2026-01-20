import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";

export class MsgSequenceHeader {
    constructor(public sequenceNumber: number, public requestId: number) { }

    static decode(buffer: BufferReader): MsgSequenceHeader {
        const sequenceNumber = buffer.readUInt32();
        const requestId = buffer.readUInt32();
        return new MsgSequenceHeader(sequenceNumber, requestId);
    }

    encode(buffer: BufferWriter) {
        buffer.writeUInt32(this.sequenceNumber);
        buffer.writeUInt32(this.requestId);
    }
}