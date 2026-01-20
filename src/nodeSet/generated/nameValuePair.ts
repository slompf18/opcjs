// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { Variant } from "../../types/variant";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part26/5.6
 */
export class NameValuePair implements IEncodable {
    constructor(
        public Name: string | undefined,
        public Value: Variant
    ) { }

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
