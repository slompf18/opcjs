// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { Int16 } from "../../types/baseTypes";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.2.12/#12.2.12.11
 */
export class TimeZoneDataType implements IEncodable {
    constructor(
        public Offset: Int16,
        public DaylightSavingInOffset: boolean
    ) { }

    public static decode(reader: BufferReader): TimeZoneDataType {
        const obj = new TimeZoneDataType(
            reader.readInt16(),
            reader.readBoolean()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeInt16(this.Offset);
        writer.writeBoolean(this.DaylightSavingInOffset);
    }
}
