// AUTO-GENERATED – DO NOT EDIT
import { ByteString } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";
import { UserIdentityToken } from "./userIdentityToken";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.3.15/#12.3.15.2
 */
export class IssuedIdentityToken extends UserIdentityToken implements IIdentifiable {
    constructor(
        public TokenData: ByteString,
        public EncryptionAlgorithm: string | undefined,
        public PolicyId: string | undefined = undefined
    ) {
        super(PolicyId);
    }

    getId(): number { return 938; }
}
