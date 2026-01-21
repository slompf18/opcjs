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

    public static decode(reader: BufferReader): ApplicationConfigurationDataType {
        const obj = new ApplicationConfigurationDataType(
            ApplicationIdentityDataType.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = CertificateGroupDataType.decode(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = ServerEndpointDataType.decode(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = EndpointDataType.decode(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = SecuritySettingsDataType.decode(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = UserTokenSettingsDataType.decode(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = AuthorizationServiceConfigurationDataType.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.ApplicationIdentity.encode(writer);
        {
            const arr = this.CertificateGroups ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        {
            const arr = this.ServerEndpoints ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        {
            const arr = this.ClientEndpoints ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        {
            const arr = this.SecuritySettings ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        {
            const arr = this.UserTokenSettings ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        {
            const arr = this.AuthorizationServices ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
