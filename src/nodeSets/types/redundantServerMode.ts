// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.44
 */
export enum RedundantServerModeEnum {
    PrimaryWithBackup = 0,
    PrimaryOnly = 1,
    BackupReady = 2,
    BackupNotReady = 3,
}

export namespace RedundantServerModeEnum {
    export function decode(reader: BufferReader): RedundantServerModeEnum {
        return reader.readInt32() as RedundantServerModeEnum;
    }

    export function encode(writer: BufferWriter, value: RedundantServerModeEnum): void {
        writer.writeInt32(value as any);
    }
}
