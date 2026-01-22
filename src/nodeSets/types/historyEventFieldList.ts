// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { Variant } from "../../types/variant";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.6.4
 */
export class HistoryEventFieldList implements IIdentifiable {
    constructor(
        public EventFields: Variant[]
    ) { }

    readonly id = 920
}
