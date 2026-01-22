// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.5.5/#6.5.5.1
 */
export class ReadAtTimeDetails implements IIdentifiable {
    constructor(
        public ReqTimes: Date[],
        public UseSimpleBounds: boolean
    ) { }

    readonly id = 653
}
