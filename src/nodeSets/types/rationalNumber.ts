// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { Int32, UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.22
 */
export class RationalNumber implements IIdentifiable {
    constructor(
        public Numerator: Int32,
        public Denominator: UInt32
    ) { }

    readonly id = 18806
}
