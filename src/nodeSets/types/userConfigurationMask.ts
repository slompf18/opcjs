// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part18/5.2.3
 */
export enum UserConfigurationMaskEnum {
    NoDelete = 0,
    Disabled = 1,
    NoChangeByUser = 2,
    MustChangePassword = 3,
}

export namespace UserConfigurationMaskEnum {
    export function decode(reader: BufferReader): UserConfigurationMaskEnum {
        return reader.readInt32() as UserConfigurationMaskEnum;
    }

    export function encode(writer: BufferWriter, value: UserConfigurationMaskEnum): void {
        writer.writeInt32(value as any);
    }
}
