import { BufferReader } from "../coders/binary/bufferReader";
import { BufferWriter } from "../coders/binary/bufferWriter";

export class Variant {
    public static decode(buffer: BufferReader): Variant {
        const obj = new Variant();
        return obj;
    }

    encode(buffer: BufferWriter) {
    }}