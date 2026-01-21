// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
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

    public static decode(reader: BufferReader): UserTokenSettingsDataType {
        const obj = new UserTokenSettingsDataType(
            UserTokenTypeEnum.decode(reader),
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        UserTokenTypeEnum.encode(writer, this.TokenType);
        writer.writeString(this.IssuedTokenType);
        writer.writeString(this.IssuerEndpointUrl);
        writer.writeString(this.SecurityPolicyUri);
        writer.writeString(this.CertificateGroupName);
        writer.writeString(this.AuthorizationServiceName);
    }
}
