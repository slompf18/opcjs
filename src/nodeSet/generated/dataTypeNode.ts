// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { ExtensionObject } from "../../types/extensionObject";
import { IEncodable } from "../../coders/iEncodable";

/**
 * DataTypeNode
 */
export class DataTypeNode implements IEncodable {
    constructor(
        public IsAbstract: boolean,
        public DataTypeDefinition: ExtensionObject
    ) { }

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
