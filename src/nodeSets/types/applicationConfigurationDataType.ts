// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ApplicationIdentityDataType } from "./applicationIdentityDataType";
import { CertificateGroupDataType } from "./certificateGroupDataType";
import { ServerEndpointDataType } from "./serverEndpointDataType";
import { EndpointDataType } from "./endpointDataType";
import { SecuritySettingsDataType } from "./securitySettingsDataType";
import { UserTokenSettingsDataType } from "./userTokenSettingsDataType";
import { AuthorizationServiceConfigurationDataType } from "./authorizationServiceConfigurationDataType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * ApplicationConfigurationDataType
 */
export class ApplicationConfigurationDataType implements IIdentifiable {
    constructor(
        public ApplicationIdentity: ApplicationIdentityDataType,
        public CertificateGroups: CertificateGroupDataType[],
        public ServerEndpoints: ServerEndpointDataType[],
        public ClientEndpoints: EndpointDataType[],
        public SecuritySettings: SecuritySettingsDataType[],
        public UserTokenSettings: UserTokenSettingsDataType[],
        public AuthorizationServices: AuthorizationServiceConfigurationDataType[]
    ) { }

    readonly id = 23743
}
