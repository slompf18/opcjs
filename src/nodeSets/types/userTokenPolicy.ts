// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { UserTokenTypeEnum } from "./userTokenType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.41
 */
export class UserTokenPolicy implements IIdentifiable {
    constructor(
        public PolicyId: string | undefined,
        public TokenType: UserTokenTypeEnum,
        public IssuedTokenType: string | undefined,
        public IssuerEndpointUrl: string | undefined,
        public SecurityPolicyUri: string | undefined
    ) { }

    readonly id = 304

    public static decode(reader: BufferReader): UserTokenPolicy {
        const obj = new UserTokenPolicy(
            reader.readString(),
            UserTokenTypeEnum.decode(reader),
            reader.readString(),
            reader.readString(),
            reader.readString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.PolicyId);
        UserTokenTypeEnum.encode(writer, this.TokenType);
        writer.writeString(this.IssuedTokenType);
        writer.writeString(this.IssuerEndpointUrl);
        writer.writeString(this.SecurityPolicyUri);
    }
}
