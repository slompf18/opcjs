import { BufferReader } from "../coders/binary/bufferReader";
import { BufferWriter } from "../coders/binary/bufferWriter";

export class StatusCode {
    public static decode(buffer: BufferReader): StatusCode {
        const obj = new StatusCode();
        return obj;
    }

    encode(buffer: BufferWriter) {
    }}