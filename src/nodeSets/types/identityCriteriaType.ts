// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part18/4.4.4
 */
export enum IdentityCriteriaTypeEnum {
    UserName = 1,
    Thumbprint = 2,
    Role = 3,
    GroupId = 4,
    Anonymous = 5,
    AuthenticatedUser = 6,
    Application = 7,
    X509Subject = 8,
    TrustedApplication = 9,
}

export namespace IdentityCriteriaTypeEnum {
    export function decode(reader: BufferReader): IdentityCriteriaTypeEnum {
        return reader.readInt32() as IdentityCriteriaTypeEnum;
    }

    export function encode(writer: BufferWriter, value: IdentityCriteriaTypeEnum): void {
        writer.writeInt32(value as any);
    }
}
