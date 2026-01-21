// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part3/8.58
 */
export enum AccessLevelExTypeEnum {
    CurrentRead = 0,
    CurrentWrite = 1,
    HistoryRead = 2,
    HistoryWrite = 3,
    SemanticChange = 4,
    StatusWrite = 5,
    TimestampWrite = 6,
    NonatomicRead = 8,
    NonatomicWrite = 9,
    WriteFullArrayOnly = 10,
    NoSubDataTypes = 11,
    NonVolatile = 12,
    Constant = 13,
}

export namespace AccessLevelExTypeEnum {
    export function decode(reader: BufferReader): AccessLevelExTypeEnum {
        return reader.readInt32() as AccessLevelExTypeEnum;
    }

    export function encode(writer: BufferWriter, value: AccessLevelExTypeEnum): void {
        writer.writeInt32(value as any);
    }
}
