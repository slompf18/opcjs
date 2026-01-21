// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.5
 */
export enum RedundancySupportEnum {
    None = 0,
    Cold = 1,
    Warm = 2,
    Hot = 3,
    Transparent = 4,
    HotAndMirrored = 5,
}

export namespace RedundancySupportEnum {
    export function decode(reader: BufferReader): RedundancySupportEnum {
        return reader.readInt32() as RedundancySupportEnum;
    }

    export function encode(writer: BufferWriter, value: RedundancySupportEnum): void {
        writer.writeInt32(value as any);
    }
}
