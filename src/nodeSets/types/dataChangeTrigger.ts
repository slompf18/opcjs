// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.10
 */
export enum DataChangeTriggerEnum {
    Status = 0,
    StatusValue = 1,
    StatusValueTimestamp = 2,
}

export namespace DataChangeTriggerEnum {
    export function decode(reader: BufferReader): DataChangeTriggerEnum {
        return reader.readInt32() as DataChangeTriggerEnum;
    }

    export function encode(writer: BufferWriter, value: DataChangeTriggerEnum): void {
        writer.writeInt32(value as any);
    }
}
