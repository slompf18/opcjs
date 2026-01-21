// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part22/5.3.1/#5.3.1.2
 */
export enum InterfaceAdminStatusEnum {
    Up = 0,
    Down = 1,
    Testing = 2,
}

export namespace InterfaceAdminStatusEnum {
    export function decode(reader: BufferReader): InterfaceAdminStatusEnum {
        return reader.readInt32() as InterfaceAdminStatusEnum;
    }

    export function encode(writer: BufferWriter, value: InterfaceAdminStatusEnum): void {
        writer.writeInt32(value as any);
    }
}
