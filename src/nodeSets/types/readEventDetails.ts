// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { DateTime } from "../../types/dateTime";
import { EventFilter } from "./eventFilter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.5.2/#6.5.2.1
 */
export class ReadEventDetails implements IIdentifiable {
    constructor(
        public NumValuesPerNode: UInt32,
        public StartTime: DateTime,
        public EndTime: DateTime,
        public Filter: EventFilter
    ) { }

    readonly id = 644

    public static decode(reader: BufferReader): ReadEventDetails {
        const obj = new ReadEventDetails(
            reader.readUInt32(),
            DateTime.decode(reader),
            DateTime.decode(reader),
            EventFilter.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeUInt32(this.NumValuesPerNode);
        this.StartTime.encode(writer);
        this.EndTime.encode(writer);
        this.Filter.encode(writer);
    }
}
