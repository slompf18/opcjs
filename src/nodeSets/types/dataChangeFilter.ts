// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { DataChangeTriggerEnum } from "./dataChangeTrigger";
import { Float64, UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.22.2
 */
export class DataChangeFilter implements IIdentifiable {
    constructor(
        public Trigger: DataChangeTriggerEnum,
        public DeadbandType: UInt32,
        public DeadbandValue: Float64
    ) { }

    readonly id = 722

    public static decode(reader: BufferReader): DataChangeFilter {
        const obj = new DataChangeFilter(
            DataChangeTriggerEnum.decode(reader),
            reader.readUInt32(),
            reader.readDouble()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        DataChangeTriggerEnum.encode(writer, this.Trigger);
        writer.writeUInt32(this.DeadbandType);
        writer.writeDouble(this.DeadbandValue);
    }
}
