// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt8 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * ViewNode
 */
export class ViewNode implements IIdentifiable {
    constructor(
        public ContainsNoLoops: boolean,
        public EventNotifier: UInt8
    ) { }

    getId(): number { return 279; }
}
