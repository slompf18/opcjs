// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ByteString } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";
import { UserIdentityToken } from "./userIdentityToken";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.3.15/#12.3.15.3
 */
export class UserNameIdentityToken extends UserIdentityToken implements IIdentifiable {
    constructor(
        public UserName: string | undefined,
        public Password: ByteString,
        public EncryptionAlgorithm: string | undefined,
        public PolicyId: string | undefined = undefined
    ) {
        super(PolicyId);
     }

    getId(): number { return 322; }
}
