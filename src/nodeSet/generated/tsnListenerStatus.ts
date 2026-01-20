// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part22/5.3.1/#5.3.1.8
 */
export enum TsnListenerStatusEnum {
    None = 0,
    Ready = 1,
    PartialFailed = 2,
    Failed = 3,
}

export namespace TsnListenerStatusEnum {
    export function decode(reader: BufferReader): TsnListenerStatusEnum {
        return reader.readInt32() as TsnListenerStatusEnum;
    }

    export function encode(writer: BufferWriter, value: TsnListenerStatusEnum): void {
        writer.writeInt32(value as any);
    }
}
