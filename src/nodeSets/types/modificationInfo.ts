// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { HistoryUpdateTypeEnum } from "./historyUpdateType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.6.5
 */
export class ModificationInfo implements IIdentifiable {
    constructor(
        public ModificationTime: Date,
        public UpdateType: HistoryUpdateTypeEnum,
        public UserName: string | undefined
    ) { }

    readonly id = 11216
}
