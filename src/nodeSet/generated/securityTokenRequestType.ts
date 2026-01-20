// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.3.12
 */
export enum SecurityTokenRequestTypeEnum {
    Issue = 0,
    Renew = 1,
}

export namespace SecurityTokenRequestTypeEnum {
    export function decode(reader: BufferReader): SecurityTokenRequestTypeEnum {
        return reader.readInt32() as SecurityTokenRequestTypeEnum;
    }

    export function encode(writer: BufferWriter, value: SecurityTokenRequestTypeEnum): void {
        writer.writeInt32(value as any);
    }
}
