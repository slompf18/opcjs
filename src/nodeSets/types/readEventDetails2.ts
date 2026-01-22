// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.5.2/#6.5.2.3
 */
export class ReadEventDetails2 implements IIdentifiable {
    constructor(
        public ReadModified: boolean
    ) { }

    readonly id = 32799
}
