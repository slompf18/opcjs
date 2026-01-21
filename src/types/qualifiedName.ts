import { BufferReader } from "../codecs/binary/bufferReader";
import { BufferWriter } from "../codecs/binary/bufferWriter";
import { UInt16 } from "./baseTypes";

// https://reference.opcfoundation.org/Core/Part6/v105/docs/5.2.2.13
export class QualifiedName {
    public static decode(buffer: BufferReader): QualifiedName {
        const namespaceIndex = buffer.readUInt16();
        const name = buffer.readString();
        return new QualifiedName(namespaceIndex, name);
    }

    encode(buffer: BufferWriter) {
        buffer.writeUInt16(this.NamespaceIndex);
        buffer.writeString(this.Name);
    }

    constructor(
        public NamespaceIndex: UInt16,
        public Name: string
    ) {}
}