import { BufferReader } from "../codecs/binary/bufferReader";
import { BufferWriter } from "../codecs/binary/bufferWriter";

export class LocalizedText {
    public static decode(buffer: BufferReader): LocalizedText {
        const obj = new LocalizedText();
        return obj;
    }

    encode(buffer: BufferWriter) {
    }}