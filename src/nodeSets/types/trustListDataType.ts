// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ByteString, UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part12/7.8.2/#7.8.2.8
 */
export class TrustListDataType implements IIdentifiable {
    constructor(
        public SpecifiedLists: UInt32,
        public TrustedCertificates: ByteString[],
        public TrustedCrls: ByteString[],
        public IssuerCertificates: ByteString[],
        public IssuerCrls: ByteString[]
    ) { }

    readonly id = 12554
}
