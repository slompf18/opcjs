// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt16 } from "../../types/baseTypes";
import { LocalizedText } from "../../types/localizedText";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.3/#6.2.3.10.3
 */
export class ActionTargetDataType implements IIdentifiable {
    constructor(
        public ActionTargetId: UInt16,
        public Name: string | undefined,
        public Description: LocalizedText
    ) { }

    readonly id = 18593
}
