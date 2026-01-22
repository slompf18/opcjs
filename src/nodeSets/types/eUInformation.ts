// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { Int32 } from "../../types/baseTypes";
import { LocalizedText } from "../../types/localizedText";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part8/5.6.3/#5.6.3.3
 */
export class EUInformation implements IIdentifiable {
    constructor(
        public NamespaceUri: string | undefined,
        public UnitId: Int32,
        public DisplayName: LocalizedText,
        public Description: LocalizedText
    ) { }

    readonly id = 887
}
