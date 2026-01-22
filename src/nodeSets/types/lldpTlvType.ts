// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ByteString, UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part22/5.3.2/#5.3.2.4
 */
export class LldpTlvType implements IIdentifiable {
    constructor(
        public TlvType: UInt32,
        public TlvInfo: ByteString
    ) { }

    readonly id = 18955
}
