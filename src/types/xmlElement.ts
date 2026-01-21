import { BufferReader } from "../codecs/binary/bufferReader";
import { BufferWriter } from "../codecs/binary/bufferWriter";

export class XmlElement {
    public static decode(buffer: BufferReader): XmlElement {
        const obj = new XmlElement();
        return obj;
    }

    encode(buffer: BufferWriter) {
    }}