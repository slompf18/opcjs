// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UserTokenTypeEnum } from "./userTokenType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part12/7.10.25
 */
export class UserTokenSettingsDataType implements IIdentifiable {
    constructor(
        public TokenType: UserTokenTypeEnum,
        public IssuedTokenType: string | undefined,
        public IssuerEndpointUrl: string | undefined,
        public SecurityPolicyUri: string | undefined,
        public CertificateGroupName: string | undefined,
        public AuthorizationServiceName: string | undefined
    ) { }

    readonly id = 15560
}
