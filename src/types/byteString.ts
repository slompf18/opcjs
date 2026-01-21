import { BufferReader } from "../codecs/binary/bufferReader";
import { BufferWriter } from "../codecs/binary/bufferWriter";

export class ByteString {
    constructor(public value?: Uint8Array) { }

    public static decode(buffer: BufferReader): ByteString {
        return buffer.readByteString();
    }

    encode(buffer: BufferWriter) {
        buffer.writeByteString(this);
    }
}