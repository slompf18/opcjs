// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part22/5.3.1/#5.3.1.6
 */
export enum TsnStreamStateEnum {
    Disabled = 0,
    Configuring = 1,
    Ready = 2,
    Operational = 3,
    Error = 4,
}

export namespace TsnStreamStateEnum {
    export function decode(reader: BufferReader): TsnStreamStateEnum {
        return reader.readInt32() as TsnStreamStateEnum;
    }

    export function encode(writer: BufferWriter, value: TsnStreamStateEnum): void {
        writer.writeInt32(value as any);
    }
}
