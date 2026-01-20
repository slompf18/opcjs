// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part22/5.3.1/#5.3.1.7
 */
export enum TsnTalkerStatusEnum {
    None = 0,
    Ready = 1,
    Failed = 2,
}

export namespace TsnTalkerStatusEnum {
    export function decode(reader: BufferReader): TsnTalkerStatusEnum {
        return reader.readInt32() as TsnTalkerStatusEnum;
    }

    export function encode(writer: BufferWriter, value: TsnTalkerStatusEnum): void {
        writer.writeInt32(value as any);
    }
}
