// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part18/5.2.2
 */
export enum PasswordOptionsMaskEnum {
    SupportInitialPasswordChange = 0,
    SupportDisableUser = 1,
    SupportDisableDeleteForUser = 2,
    SupportNoChangeForUser = 3,
    SupportDescriptionForUser = 4,
    RequiresUpperCaseCharacters = 5,
    RequiresLowerCaseCharacters = 6,
    RequiresDigitCharacters = 7,
    RequiresSpecialCharacters = 8,
}

export namespace PasswordOptionsMaskEnum {
    export function decode(reader: BufferReader): PasswordOptionsMaskEnum {
        return reader.readInt32() as PasswordOptionsMaskEnum;
    }

    export function encode(writer: BufferWriter, value: PasswordOptionsMaskEnum): void {
        writer.writeInt32(value as any);
    }
}
