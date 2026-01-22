// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ModificationInfo } from "./modificationInfo";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.6.3
 */
export class HistoryModifiedData implements IIdentifiable {
    constructor(
        public ModificationInfos: ModificationInfo[]
    ) { }

    readonly id = 11217
}
