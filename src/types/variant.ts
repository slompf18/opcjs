import { BufferReader } from "../codecs/binary/bufferReader";
import { BufferWriter } from "../codecs/binary/bufferWriter";

export class Variant {
    public static decode(buffer: BufferReader): Variant {
        const obj = new Variant();
        return obj;
    }

    encode(buffer: BufferWriter) {
    }}