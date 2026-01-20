// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.37
 */
export class PortableQualifiedName implements IEncodable {
    constructor(
        public NamespaceUri: string | undefined,
        public Name: string | undefined
    ) { }

    public static decode(reader: BufferReader): PortableQualifiedName {
        const obj = new PortableQualifiedName(
            reader.readString(),
            reader.readString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.NamespaceUri);
        writer.writeString(this.Name);
    }
}
