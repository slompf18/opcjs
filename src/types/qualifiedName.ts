import { BufferReader } from "../codecs/binary/bufferReader";
import { BufferWriter } from "../codecs/binary/bufferWriter";

export class QualifiedName {
    public static decode(buffer: BufferReader): QualifiedName {
        const obj = new QualifiedName();
        return obj;
    }

    encode(buffer: BufferWriter) {
    }}