// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.2.12/#12.2.12.7
 */
export class EnumField implements IEncodable {
    constructor(
        public Name: string | undefined
    ) { }

    public static decode(reader: BufferReader): EnumField {
        const obj = new EnumField(
            reader.readString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.Name);
    }
}
