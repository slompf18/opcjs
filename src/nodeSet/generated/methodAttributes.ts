// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.24.4
 */
export class MethodAttributes implements IEncodable {
    constructor(
        public Executable: boolean,
        public UserExecutable: boolean
    ) { }

    public static decode(reader: BufferReader): MethodAttributes {
        const obj = new MethodAttributes(
            reader.readBoolean(),
            reader.readBoolean()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeBoolean(this.Executable);
        writer.writeBoolean(this.UserExecutable);
    }
}
