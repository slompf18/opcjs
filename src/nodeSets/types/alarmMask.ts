// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part9/8.3
 */
export enum AlarmMaskEnum {
    Active = 0,
    Unacknowledged = 1,
    Unconfirmed = 2,
}

export namespace AlarmMaskEnum {
    export function decode(reader: BufferReader): AlarmMaskEnum {
        return reader.readInt32() as AlarmMaskEnum;
    }

    export function encode(writer: BufferWriter, value: AlarmMaskEnum): void {
        writer.writeInt32(value as any);
    }
}
