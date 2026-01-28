// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ByteString } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.2.12/#12.2.12.8
 */
export class OptionSet implements IIdentifiable {
    constructor(
        public Value: ByteString,
        public ValidBits: ByteString
    ) { }

    getId(): number { return 12755; }
}
