// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { UInt16 } from "../../types/baseTypes";
import { LocalizedText } from "../../types/localizedText";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.3/#6.2.3.10.3
 */
export class ActionTargetDataType implements IIdentifiable {
    constructor(
        public ActionTargetId: UInt16,
        public Name: string | undefined,
        public Description: LocalizedText
    ) { }

    readonly id = 18593

    public static decode(reader: BufferReader): ActionTargetDataType {
        const obj = new ActionTargetDataType(
            reader.readUInt16(),
            reader.readString(),
            reader.readLocalizedText()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeUInt16(this.ActionTargetId);
        writer.writeString(this.Name);
        this.Description.encode(writer);
    }
}
