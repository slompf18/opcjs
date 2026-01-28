// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt8 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * ObjectNode
 */
export class ObjectNode implements IIdentifiable {
    constructor(
        public EventNotifier: UInt8
    ) { }

    getId(): number { return 261; }
}
