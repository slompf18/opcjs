// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { Float64 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part8/5.6.5
 */
export class DoubleComplexNumberType implements IIdentifiable {
    constructor(
        public Real: Float64,
        public Imaginary: Float64
    ) { }

    getId(): number { return 12172; }
}
