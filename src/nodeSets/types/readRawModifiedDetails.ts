// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.5.3/#6.5.3.1
 */
export class ReadRawModifiedDetails implements IIdentifiable {
    constructor(
        public IsReadModified: boolean,
        public StartTime: Date,
        public EndTime: Date,
        public NumValuesPerNode: UInt32,
        public ReturnBounds: boolean
    ) { }

    getId(): number { return 647; }
}
