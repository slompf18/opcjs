// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.5.6/#6.5.6.1
 */
export class ReadAnnotationDataDetails implements IIdentifiable {
    constructor(
        public ReqTimes: Date[]
    ) { }

    readonly id = 23497
}
