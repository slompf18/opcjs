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

    public static decode(reader: BufferReader): ModificationInfo {
        const obj = new ModificationInfo(
            reader.readDateTime(),
            HistoryUpdateTypeEnum.decode(reader),
            reader.readString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeDateTime(this.ModificationTime);
        HistoryUpdateTypeEnum.encode(writer, this.UpdateType);
        writer.writeString(this.UserName);
    }
}
