// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.5.8
 */
export enum SortOrderTypeEnum {
    Ascending = 0,
    Descending = 1,
}

export namespace SortOrderTypeEnum {
    export function decode(reader: BufferReader): SortOrderTypeEnum {
        return reader.readInt32() as SortOrderTypeEnum;
    }

    export function encode(writer: BufferWriter, value: SortOrderTypeEnum): void {
        writer.writeInt32(value as any);
    }
}
