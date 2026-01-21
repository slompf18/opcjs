// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.23
 */
export enum MonitoringModeEnum {
    Disabled = 0,
    Sampling = 1,
    Reporting = 2,
}

export namespace MonitoringModeEnum {
    export function decode(reader: BufferReader): MonitoringModeEnum {
        return reader.readInt32() as MonitoringModeEnum;
    }

    export function encode(writer: BufferWriter, value: MonitoringModeEnum): void {
        writer.writeInt32(value as any);
    }
}
