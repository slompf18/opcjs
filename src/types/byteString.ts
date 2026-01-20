import { BufferReader } from "../coders/binary/bufferReader";
import { BufferWriter } from "../coders/binary/bufferWriter";

export class ByteString {
    constructor(public value?: Uint8Array) { }

    public static decode(buffer: BufferReader): ByteString {
        return buffer.readByteString();
    }

    encode(buffer: BufferWriter) {
        buffer.writeByteString(this);
    }
}