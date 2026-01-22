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
}
