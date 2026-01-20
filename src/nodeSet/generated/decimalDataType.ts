// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { Int16 } from "../../types/baseTypes";
import { ByteString } from "../../types/byteString";
import { IEncodable } from "../../coders/iEncodable";

/**
 * DecimalDataType
 */
export class DecimalDataType implements IEncodable {
    constructor(
        public Scale: Int16,
        public Value: ByteString
    ) { }

    public static decode(reader: BufferReader): DecimalDataType {
        const obj = new DecimalDataType(
            reader.readInt16(),
            ByteString.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeInt16(this.Scale);
        this.Value.encode(writer);
    }
}
