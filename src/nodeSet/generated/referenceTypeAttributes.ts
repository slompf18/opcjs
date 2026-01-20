// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { LocalizedText } from "../../types/localizedText";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.24.7
 */
export class ReferenceTypeAttributes implements IEncodable {
    constructor(
        public IsAbstract: boolean,
        public Symmetric: boolean,
        public InverseName: LocalizedText
    ) { }

    public static decode(reader: BufferReader): ReferenceTypeAttributes {
        const obj = new ReferenceTypeAttributes(
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
