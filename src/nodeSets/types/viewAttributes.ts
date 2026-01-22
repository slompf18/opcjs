// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt8 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.24.9
 */
export class ViewAttributes implements IIdentifiable {
    constructor(
        public ContainsNoLoops: boolean,
        public EventNotifier: UInt8
    ) { }

    readonly id = 373
}
