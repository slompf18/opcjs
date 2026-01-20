import { BufferReader } from "../coders/binary/bufferReader";
import { BufferWriter } from "../coders/binary/bufferWriter";

export class DateTime {
    public static decode(buffer: BufferReader): DateTime {
        const obj = new DateTime();
        return obj;
    }

    encode(buffer: BufferWriter) {
    }}