// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part12/7.8.2/#7.8.2.10
 */
export enum TrustListValidationOptionsEnum {
    SuppressCertificateExpired = 0,
    SuppressHostNameInvalid = 1,
    SuppressRevocationStatusUnknown = 2,
    SuppressIssuerCertificateExpired = 3,
    SuppressIssuerRevocationStatusUnknown = 4,
    CheckRevocationStatusOnline = 5,
    CheckRevocationStatusOffline = 6,
}

export namespace TrustListValidationOptionsEnum {
    export function decode(reader: BufferReader): TrustListValidationOptionsEnum {
        return reader.readInt32() as TrustListValidationOptionsEnum;
    }

    export function encode(writer: BufferWriter, value: TrustListValidationOptionsEnum): void {
        writer.writeInt32(value as any);
    }
}
