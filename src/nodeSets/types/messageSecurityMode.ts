// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.3.10
 */
export enum MessageSecurityModeEnum {
    Invalid = 0,
    None = 1,
    Sign = 2,
    SignAndEncrypt = 3,
}

export namespace MessageSecurityModeEnum {
    export function decode(reader: BufferReader): MessageSecurityModeEnum {
        return reader.readInt32() as MessageSecurityModeEnum;
    }

    export function encode(writer: BufferWriter, value: MessageSecurityModeEnum): void {
        writer.writeInt32(value as any);
    }
}
