// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { EventFilter } from "./eventFilter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.5.2/#6.5.2.1
 */
export class ReadEventDetails implements IIdentifiable {
    constructor(
        public NumValuesPerNode: UInt32,
        public StartTime: Date,
        public EndTime: Date,
        public Filter: EventFilter
    ) { }

    readonly id = 644

    public static decode(reader: BufferReader): ReadEventDetails {
        const obj = new ReadEventDetails(
            reader.readUInt32(),
            reader.readDateTime(),
            reader.readDateTime(),
            EventFilter.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeUInt32(this.NumValuesPerNode);
        writer.writeDateTime(this.StartTime);
        writer.writeDateTime(this.EndTime);
        this.Filter.encode(writer);
    }
}
