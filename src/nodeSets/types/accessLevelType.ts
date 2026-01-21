// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part3/8.57
 */
export enum AccessLevelTypeEnum {
    CurrentRead = 0,
    CurrentWrite = 1,
    HistoryRead = 2,
    HistoryWrite = 3,
    SemanticChange = 4,
    StatusWrite = 5,
    TimestampWrite = 6,
}

export namespace AccessLevelTypeEnum {
    export function decode(reader: BufferReader): AccessLevelTypeEnum {
        return reader.readInt32() as AccessLevelTypeEnum;
    }

    export function encode(writer: BufferWriter, value: AccessLevelTypeEnum): void {
        writer.writeInt32(value as any);
    }
}
