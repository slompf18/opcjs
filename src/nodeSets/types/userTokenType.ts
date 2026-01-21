// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.42
 */
export enum UserTokenTypeEnum {
    Anonymous = 0,
    UserName = 1,
    Certificate = 2,
    IssuedToken = 3,
}

export namespace UserTokenTypeEnum {
    export function decode(reader: BufferReader): UserTokenTypeEnum {
        return reader.readInt32() as UserTokenTypeEnum;
    }

    export function encode(writer: BufferWriter, value: UserTokenTypeEnum): void {
        writer.writeInt32(value as any);
    }
}
