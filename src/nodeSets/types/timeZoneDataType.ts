// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { Int16 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.2.12/#12.2.12.11
 */
export class TimeZoneDataType implements IIdentifiable {
    constructor(
        public Offset: Int16,
        public DaylightSavingInOffset: boolean
    ) { }

    getId(): number { return 8912; }
}
