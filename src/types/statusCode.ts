import { BufferReader } from "../codecs/binary/bufferReader";
import { BufferWriter } from "../codecs/binary/bufferWriter";

export class StatusCode {
    public static decode(buffer: BufferReader): StatusCode {
        const obj = new StatusCode();
        return obj;
    }

    encode(buffer: BufferWriter) {
    }}