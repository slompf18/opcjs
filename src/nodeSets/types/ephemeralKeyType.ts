// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ByteString } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.15
 */
export class EphemeralKeyType implements IIdentifiable {
    constructor(
        public PublicKey: ByteString,
        public Signature: ByteString
    ) { }

    getId(): number { return 17548; }
}
