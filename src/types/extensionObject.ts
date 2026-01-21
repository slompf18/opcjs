import { BufferReader } from "../codecs/binary/bufferReader";
import { BufferWriter } from "../codecs/binary/bufferWriter";

export class ExtensionObject {
    public static decode(buffer: BufferReader): ExtensionObject {
        const obj = new ExtensionObject();
        return obj;
    }

    encode(buffer: BufferWriter) {
    }}