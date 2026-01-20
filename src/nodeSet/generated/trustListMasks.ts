// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part12/7.8.2/#7.8.2.9
 */
export enum TrustListMasksEnum {
    None = 0,
    TrustedCertificates = 1,
    TrustedCrls = 2,
    IssuerCertificates = 4,
    IssuerCrls = 8,
    All = 15,
}

export namespace TrustListMasksEnum {
    export function decode(reader: BufferReader): TrustListMasksEnum {
        return reader.readInt32() as TrustListMasksEnum;
    }

    export function encode(writer: BufferWriter, value: TrustListMasksEnum): void {
        writer.writeInt32(value as any);
    }
}
