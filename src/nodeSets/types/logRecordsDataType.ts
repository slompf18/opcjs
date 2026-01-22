// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { LogRecord } from "./logRecord";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part26/5.9
 */
export class LogRecordsDataType implements IIdentifiable {
    constructor(
        public LogRecordArray: LogRecord[]
    ) { }

    readonly id = 19745
}
