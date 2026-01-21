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

    public static decode(reader: BufferReader): ServiceCertificateDataType {
        const obj = new ServiceCertificateDataType(
            reader.readByteString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readByteString(); } return arr; })(),
            reader.readDateTime(),
            reader.readDateTime()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeByteString(this.Certificate);
        {
            const arr = this.Issuers ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeByteString(v);
            }
        };
        writer.writeDateTime(this.ValidFrom);
        writer.writeDateTime(this.ValidTo);
    }
}
