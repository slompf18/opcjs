// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { ByteString } from "../../types/byteString";
import { DateTime } from "../../types/dateTime";
import { IEncodable } from "../../coders/iEncodable";

/**
 * ServiceCertificateDataType
 */
export class ServiceCertificateDataType implements IEncodable {
    constructor(
        public Certificate: ByteString,
        public Issuers: ByteString[],
        public ValidFrom: DateTime,
        public ValidTo: DateTime
    ) { }

    public static decode(reader: BufferReader): ServiceCertificateDataType {
        const obj = new ServiceCertificateDataType(
            ByteString.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = ByteString.decode(reader); } return arr; })(),
            DateTime.decode(reader),
            DateTime.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.Certificate.encode(writer);
        {
            const arr = this.Issuers ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        this.ValidFrom.encode(writer);
        this.ValidTo.encode(writer);
    }
}
