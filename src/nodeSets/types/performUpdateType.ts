// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.8
 */
export enum PerformUpdateTypeEnum {
    Insert = 1,
    Replace = 2,
    Update = 3,
    Remove = 4,
}

export namespace PerformUpdateTypeEnum {
    export function decode(reader: BufferReader): PerformUpdateTypeEnum {
        return reader.readInt32() as PerformUpdateTypeEnum;
    }

    export function encode(writer: BufferWriter, value: PerformUpdateTypeEnum): void {
        writer.writeInt32(value as any);
    }
}
