import { BufferReader } from "../codecs/binary/bufferReader";
import { BufferWriter } from "../codecs/binary/bufferWriter";

export class ExpandedNodeId {
    public static decode(buffer: BufferReader): ExpandedNodeId {
        const obj = new ExpandedNodeId();
        return obj;
    }

    encode(buffer: BufferWriter) {
    }}