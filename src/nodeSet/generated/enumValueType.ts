// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { Int64 } from "../../types/baseTypes";
import { LocalizedText } from "../../types/localizedText";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.2.12/#12.2.12.6
 */
export class EnumValueType implements IEncodable {
    constructor(
        public Value: Int64,
        public DisplayName: LocalizedText,
        public Description: LocalizedText
    ) { }

    public static decode(reader: BufferReader): EnumValueType {
        const obj = new EnumValueType(
            reader.readInt64(),
            reader.readLocalizedText(),
            reader.readLocalizedText()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeInt64(this.Value);
        this.DisplayName.encode(writer);
        this.Description.encode(writer);
    }
}
