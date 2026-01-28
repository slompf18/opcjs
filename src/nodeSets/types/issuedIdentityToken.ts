// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ByteString } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.3.15/#12.3.15.2
 */
export class IssuedIdentityToken implements IIdentifiable {
    constructor(
        public TokenData: ByteString,
        public EncryptionAlgorithm: string | undefined
    ) { }

    getId(): number { return 938; }
}
