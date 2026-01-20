// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IEncodable } from "../../coders/iEncodable";

/**
 * ObjectTypeNode
 */
export class ObjectTypeNode implements IEncodable {
    constructor(
        public IsAbstract: boolean
    ) { }

    public static decode(reader: BufferReader): ObjectTypeNode {
        const obj = new ObjectTypeNode(
            reader.readBoolean()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeBoolean(this.IsAbstract);
    }
}
