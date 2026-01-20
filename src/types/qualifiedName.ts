import { BufferReader } from "../coders/binary/bufferReader";
import { BufferWriter } from "../coders/binary/bufferWriter";

export class QualifiedName {
    public static decode(buffer: BufferReader): QualifiedName {
        const obj = new QualifiedName();
        return obj;
    }

    encode(buffer: BufferWriter) {
    }}