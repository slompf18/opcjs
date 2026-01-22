// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ByteString } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * ServiceCertificateDataType
 */
export class ServiceCertificateDataType implements IIdentifiable {
    constructor(
        public Certificate: ByteString,
        public Issuers: ByteString[],
        public ValidFrom: Date,
        public ValidTo: Date
    ) { }

    readonly id = 23724
}
