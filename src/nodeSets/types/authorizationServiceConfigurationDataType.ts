// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ServiceCertificateDataType } from "./serviceCertificateDataType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * AuthorizationServiceConfigurationDataType
 */
export class AuthorizationServiceConfigurationDataType implements IIdentifiable {
    constructor(
        public ServiceUri: string | undefined,
        public ServiceCertificates: ServiceCertificateDataType[],
        public IssuerEndpointSettings: string | undefined
    ) { }

    readonly id = 23744

    public static decode(reader: BufferReader): AuthorizationServiceConfigurationDataType {
        const obj = new AuthorizationServiceConfigurationDataType(
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = ServiceCertificateDataType.decode(reader); } return arr; })(),
            reader.readString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.ServiceUri);
        {
            const arr = this.ServiceCertificates ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        writer.writeString(this.IssuerEndpointSettings);
    }
}
