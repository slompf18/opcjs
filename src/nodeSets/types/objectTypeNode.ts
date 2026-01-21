// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * ObjectTypeNode
 */
export class ObjectTypeNode implements IIdentifiable {
    constructor(
        public IsAbstract: boolean
    ) { }

    readonly id = 264

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
