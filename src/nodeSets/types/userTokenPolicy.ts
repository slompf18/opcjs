// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
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

    getId(): number { return 304; }
}
