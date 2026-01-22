// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { Int64 } from "../../types/baseTypes";
import { LocalizedText } from "../../types/localizedText";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.2.12/#12.2.12.6
 */
export class EnumValueType implements IIdentifiable {
    constructor(
        public Value: Int64,
        public DisplayName: LocalizedText,
        public Description: LocalizedText
    ) { }

    readonly id = 7594
}
