// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { LocalizedText } from "../../types/localizedText";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.24.1
 */
export class NodeAttributes implements IIdentifiable {
    constructor(
        public SpecifiedAttributes: UInt32,
        public DisplayName: LocalizedText,
        public Description: LocalizedText,
        public WriteMask: UInt32,
        public UserWriteMask: UInt32
    ) { }

    readonly id = 349

    public static decode(reader: BufferReader): NodeAttributes {
        const obj = new NodeAttributes(
            reader.readUInt32(),
            reader.readLocalizedText(),
            reader.readLocalizedText(),
            reader.readUInt32(),
            reader.readUInt32()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeUInt32(this.SpecifiedAttributes);
        this.DisplayName.encode(writer);
        this.Description.encode(writer);
        writer.writeUInt32(this.WriteMask);
        writer.writeUInt32(this.UserWriteMask);
    }
}
