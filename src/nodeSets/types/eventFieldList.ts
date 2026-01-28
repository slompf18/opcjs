// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { Variant } from "../../types/variant";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.25.3
 */
export class EventFieldList implements IIdentifiable {
    constructor(
        public ClientHandle: UInt32,
        public EventFields: Variant[]
    ) { }

    getId(): number { return 917; }
}
