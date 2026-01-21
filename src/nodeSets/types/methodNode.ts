// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * MethodNode
 */
export class MethodNode implements IIdentifiable {
    constructor(
        public Executable: boolean,
        public UserExecutable: boolean
    ) { }

    readonly id = 276

    public static decode(reader: BufferReader): MethodNode {
        const obj = new MethodNode(
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
