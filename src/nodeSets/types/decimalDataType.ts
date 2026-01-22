// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ByteString, Int16 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * DecimalDataType
 */
export class DecimalDataType implements IIdentifiable {
    constructor(
        public Scale: Int16,
        public Value: ByteString
    ) { }

    readonly id = 17861
}
