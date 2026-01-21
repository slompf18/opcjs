// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { LocalizedText } from "../../types/localizedText";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.45
 */
export class BitFieldDefinition implements IIdentifiable {
    constructor(
        public Name: string | undefined,
        public Description: LocalizedText,
        public Reserved: boolean,
        public StartingBitPosition: UInt32,
        public EndingBitPosition: UInt32
    ) { }

    readonly id = 32421

    public static decode(reader: BufferReader): BitFieldDefinition {
        const obj = new BitFieldDefinition(
            reader.readString(),
            reader.readLocalizedText(),
            reader.readBoolean(),
            reader.readUInt32(),
            reader.readUInt32()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.Name);
        this.Description.encode(writer);
        writer.writeBoolean(this.Reserved);
        writer.writeUInt32(this.StartingBitPosition);
        writer.writeUInt32(this.EndingBitPosition);
    }
}
