import { BufferReader } from "../coders/binary/bufferReader";
import { BufferWriter } from "../coders/binary/bufferWriter";

export class ExtensionObject {
    public static decode(buffer: BufferReader): ExtensionObject {
        const obj = new ExtensionObject();
        return obj;
    }

    encode(buffer: BufferWriter) {
    }}