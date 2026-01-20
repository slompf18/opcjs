import { BufferReader } from "../coders/binary/bufferReader";
import { BufferWriter } from "../coders/binary/bufferWriter";

export class LocalizedText {
    public static decode(buffer: BufferReader): LocalizedText {
        const obj = new LocalizedText();
        return obj;
    }

    encode(buffer: BufferWriter) {
    }}