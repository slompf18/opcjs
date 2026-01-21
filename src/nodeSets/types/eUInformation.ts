// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { Int32 } from "../../types/baseTypes";
import { LocalizedText } from "../../types/localizedText";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part8/5.6.3/#5.6.3.3
 */
export class EUInformation implements IIdentifiable {
    constructor(
        public NamespaceUri: string | undefined,
        public UnitId: Int32,
        public DisplayName: LocalizedText,
        public Description: LocalizedText
    ) { }

    readonly id = 887

    public static decode(reader: BufferReader): EUInformation {
        const obj = new EUInformation(
            reader.readString(),
            reader.readInt32(),
            reader.readLocalizedText(),
            reader.readLocalizedText()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.NamespaceUri);
        writer.writeInt32(this.UnitId);
        this.DisplayName.encode(writer);
        this.Description.encode(writer);
    }
}
