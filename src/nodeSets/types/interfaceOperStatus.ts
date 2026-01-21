// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part22/5.3.1/#5.3.1.3
 */
export enum InterfaceOperStatusEnum {
    Up = 0,
    Down = 1,
    Testing = 2,
    Unknown = 3,
    Dormant = 4,
    NotPresent = 5,
    LowerLayerDown = 6,
}

export namespace InterfaceOperStatusEnum {
    export function decode(reader: BufferReader): InterfaceOperStatusEnum {
        return reader.readInt32() as InterfaceOperStatusEnum;
    }

    export function encode(writer: BufferWriter, value: InterfaceOperStatusEnum): void {
        writer.writeInt32(value as any);
    }
}
