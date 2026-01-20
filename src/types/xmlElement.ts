import { BufferReader } from "../coders/binary/bufferReader";
import { BufferWriter } from "../coders/binary/bufferWriter";

export class XmlElement {
    public static decode(buffer: BufferReader): XmlElement {
        const obj = new XmlElement();
        return obj;
    }

    encode(buffer: BufferWriter) {
    }}