// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.24.4
 */
export class MethodAttributes implements IIdentifiable {
    constructor(
        public Executable: boolean,
        public UserExecutable: boolean
    ) { }

    readonly id = 358

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
