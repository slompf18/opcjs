// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.40
 */
export class UnsignedRationalNumber implements IIdentifiable {
    constructor(
        public Numerator: UInt32,
        public Denominator: UInt32
    ) { }

    getId(): number { return 24107; }
}
