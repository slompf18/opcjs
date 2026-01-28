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

    getId(): number { return 23744; }
}
