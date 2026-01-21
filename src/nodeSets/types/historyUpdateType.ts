// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.7
 */
export enum HistoryUpdateTypeEnum {
    Insert = 1,
    Replace = 2,
    Update = 3,
    Delete = 4,
}

export namespace HistoryUpdateTypeEnum {
    export function decode(reader: BufferReader): HistoryUpdateTypeEnum {
        return reader.readInt32() as HistoryUpdateTypeEnum;
    }

    export function encode(writer: BufferWriter, value: HistoryUpdateTypeEnum): void {
        writer.writeInt32(value as any);
    }
}
