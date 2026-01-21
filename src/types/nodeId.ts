import { BufferReader } from "../codecs/binary/bufferReader";
import { BufferWriter } from "../codecs/binary/bufferWriter";

export class NodeId {
    public static decode(buffer: BufferReader): NodeId {
        const obj = new NodeId();
        return obj;
    }

    encode(buffer: BufferWriter) {
    }}