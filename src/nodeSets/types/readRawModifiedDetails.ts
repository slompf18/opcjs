// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { DateTime } from "../../types/dateTime";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.5.3/#6.5.3.1
 */
export class ReadRawModifiedDetails implements IIdentifiable {
    constructor(
        public IsReadModified: boolean,
        public StartTime: DateTime,
        public EndTime: DateTime,
        public NumValuesPerNode: UInt32,
        public ReturnBounds: boolean
    ) { }

    readonly id = 647

    public static decode(reader: BufferReader): ReadRawModifiedDetails {
        const obj = new ReadRawModifiedDetails(
            reader.readBoolean(),
            DateTime.decode(reader),
            DateTime.decode(reader),
            reader.readUInt32(),
            reader.readBoolean()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeBoolean(this.IsReadModified);
        this.StartTime.encode(writer);
        this.EndTime.encode(writer);
        writer.writeUInt32(this.NumValuesPerNode);
        writer.writeBoolean(this.ReturnBounds);
    }
}
