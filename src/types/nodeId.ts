import { BufferReader } from "../coders/binary/bufferReader";
import { BufferWriter } from "../coders/binary/bufferWriter";

export class NodeId {
    public static decode(buffer: BufferReader): NodeId {
        const obj = new NodeId();
        return obj;
    }

    encode(buffer: BufferWriter) {
    }}