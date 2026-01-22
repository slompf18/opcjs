// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { DataValue } from "../../types/dataValue";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.6.2
 */
export class HistoryData implements IIdentifiable {
    constructor(
        public DataValues: DataValue[]
    ) { }

    readonly id = 656
}
