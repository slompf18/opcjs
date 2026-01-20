// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.39
 */
export enum TimestampsToReturnEnum {
    Source = 0,
    Server = 1,
    Both = 2,
    Neither = 3,
    Invalid = 4,
}

export namespace TimestampsToReturnEnum {
    export function decode(reader: BufferReader): TimestampsToReturnEnum {
        return reader.readInt32() as TimestampsToReturnEnum;
    }

    export function encode(writer: BufferWriter, value: TimestampsToReturnEnum): void {
        writer.writeInt32(value as any);
    }
}
