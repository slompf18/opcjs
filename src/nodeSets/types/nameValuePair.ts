// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { Variant } from "../../types/variant";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part26/5.6
 */
export class NameValuePair implements IIdentifiable {
    constructor(
        public Name: string | undefined,
        public Value: Variant
    ) { }

    readonly id = 19748

    public static decode(reader: BufferReader): NameValuePair {
        const obj = new NameValuePair(
            reader.readString(),
            reader.readVariant()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.Name);
        this.Value.encode(writer);
    }
}
