import { BufferReader } from "../codecs/binary/bufferReader";
import { BufferWriter } from "../codecs/binary/bufferWriter";

export class DateTime {
    public static decode(buffer: BufferReader): DateTime {
        const obj = new DateTime();
        return obj;
    }

    encode(buffer: BufferWriter) {
    }}