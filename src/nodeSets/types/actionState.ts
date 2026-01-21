// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.11/#6.2.11.2.1
 */
export enum ActionStateEnum {
    Idle = 0,
    Executing = 1,
    Done = 2,
}

export namespace ActionStateEnum {
    export function decode(reader: BufferReader): ActionStateEnum {
        return reader.readInt32() as ActionStateEnum;
    }

    export function encode(writer: BufferWriter, value: ActionStateEnum): void {
        writer.writeInt32(value as any);
    }
}
