// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { ExtensionObject } from "../../types/extensionObject";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * DataTypeNode
 */
export class DataTypeNode implements IIdentifiable {
    constructor(
        public IsAbstract: boolean,
        public DataTypeDefinition: ExtensionObject
    ) { }

    readonly id = 282

    public static decode(reader: BufferReader): DataTypeNode {
        const obj = new DataTypeNode(
            reader.readBoolean(),
            reader.readExtensionObject()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeBoolean(this.IsAbstract);
        this.DataTypeDefinition.encode(writer);
    }
}
