// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/5.2.2
 */
export enum ExceptionDeviationFormatEnum {
    AbsoluteValue = 0,
    PercentOfValue = 1,
    PercentOfRange = 2,
    PercentOfEURange = 3,
    Unknown = 4,
}

export namespace ExceptionDeviationFormatEnum {
    export function decode(reader: BufferReader): ExceptionDeviationFormatEnum {
        return reader.readInt32() as ExceptionDeviationFormatEnum;
    }

    export function encode(writer: BufferWriter, value: ExceptionDeviationFormatEnum): void {
        writer.writeInt32(value as any);
    }
}
