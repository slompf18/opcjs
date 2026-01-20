// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { DateTime } from "../../types/dateTime";
import { HistoryUpdateTypeEnum } from "./historyUpdateType";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.6.5
 */
export class ModificationInfo implements IEncodable {
    constructor(
        public ModificationTime: DateTime,
        public UpdateType: HistoryUpdateTypeEnum,
        public UserName: string | undefined
    ) { }

    public static decode(reader: BufferReader): ModificationInfo {
        const obj = new ModificationInfo(
            DateTime.decode(reader),
            HistoryUpdateTypeEnum.decode(reader),
            reader.readString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.ModificationTime.encode(writer);
        HistoryUpdateTypeEnum.encode(writer, this.UpdateType);
        writer.writeString(this.UserName);
    }
}
