import { BufferReader } from "../coders/binary/bufferReader";
import { BufferWriter } from "../coders/binary/bufferWriter";

export class ExpandedNodeId {
    public static decode(buffer: BufferReader): ExpandedNodeId {
        const obj = new ExpandedNodeId();
        return obj;
    }

    encode(buffer: BufferWriter) {
    }}