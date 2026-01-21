// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.2.9/#12.2.9.13
 */
export enum AccessRestrictionTypeEnum {
    SigningRequired = 0,
    EncryptionRequired = 1,
    SessionRequired = 2,
    ApplyRestrictionsToBrowse = 3,
}

export namespace AccessRestrictionTypeEnum {
    export function decode(reader: BufferReader): AccessRestrictionTypeEnum {
        return reader.readInt32() as AccessRestrictionTypeEnum;
    }

    export function encode(writer: BufferWriter, value: AccessRestrictionTypeEnum): void {
        writer.writeInt32(value as any);
    }
}
