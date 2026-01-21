// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.10/#6.2.10.2.4
 */
export enum OverrideValueHandlingEnum {
    Disabled = 0,
    LastUsableValue = 1,
    OverrideValue = 2,
}

export namespace OverrideValueHandlingEnum {
    export function decode(reader: BufferReader): OverrideValueHandlingEnum {
        return reader.readInt32() as OverrideValueHandlingEnum;
    }

    export function encode(writer: BufferWriter, value: OverrideValueHandlingEnum): void {
        writer.writeInt32(value as any);
    }
}
