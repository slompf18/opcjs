// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ByteString } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.2.12/#12.2.12.8
 */
export class OptionSet implements IIdentifiable {
    constructor(
        public Value: ByteString,
        public ValidBits: ByteString
    ) { }

    readonly id = 12755

    public static decode(reader: BufferReader): OptionSet {
        const obj = new OptionSet(
            reader.readByteString(),
            reader.readByteString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeByteString(this.Value);
        writer.writeByteString(this.ValidBits);
    }
}
