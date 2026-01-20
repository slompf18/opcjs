// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { LocalizedText } from "../../types/localizedText";
import { IEncodable } from "../../coders/iEncodable";

/**
 * ReferenceTypeNode
 */
export class ReferenceTypeNode implements IEncodable {
    constructor(
        public IsAbstract: boolean,
        public Symmetric: boolean,
        public InverseName: LocalizedText
    ) { }

    public static decode(reader: BufferReader): ReferenceTypeNode {
        const obj = new ReferenceTypeNode(
            reader.readBoolean(),
            reader.readBoolean(),
            reader.readLocalizedText()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeBoolean(this.IsAbstract);
        writer.writeBoolean(this.Symmetric);
        this.InverseName.encode(writer);
    }
}
