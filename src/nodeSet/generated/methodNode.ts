// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";

/**
 * MethodNode
 */
export class MethodNode implements IEncodable {
    constructor(
        public Executable: boolean,
        public UserExecutable: boolean
    ) { }

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
