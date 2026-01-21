// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ByteString, Int16 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * DecimalDataType
 */
export class DecimalDataType implements IIdentifiable {
    constructor(
        public Scale: Int16,
        public Value: ByteString
    ) { }

    readonly id = 17861

    public static decode(reader: BufferReader): DecimalDataType {
        const obj = new DecimalDataType(
            reader.readInt16(),
            reader.readByteString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeInt16(this.Scale);
        writer.writeByteString(this.Value);
    }
}
