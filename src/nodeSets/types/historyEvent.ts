// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { HistoryEventFieldList } from "./historyEventFieldList";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.6.4
 */
export class HistoryEvent implements IIdentifiable {
    constructor(
        public Events: HistoryEventFieldList[]
    ) { }

    readonly id = 659
}
