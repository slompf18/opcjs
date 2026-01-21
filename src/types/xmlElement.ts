import { BufferReader } from "../codecs/binary/bufferReader";
import { BufferWriter } from "../codecs/binary/bufferWriter";

// https://reference.opcfoundation.org/Core/Part6/v105/docs/5.2.2.8
export class XmlElement {
    public static decode(buffer: BufferReader): XmlElement {
        const length = buffer.readInt32();
        if (length === -1) {
            return new XmlElement();
        }
        const value = buffer.readString();
        return new XmlElement(value);
    }

    encode(buffer: BufferWriter) {
        if (!this.Value) {
            buffer.writeInt32(-1);
        } else {
            buffer.writeString(this.Value);
        }
    }

    constructor(public Value?: string) {}
}