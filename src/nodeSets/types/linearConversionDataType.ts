// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { Float32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part8/6.6.2
 */
export class LinearConversionDataType implements IIdentifiable {
    constructor(
        public InitialAddend: Float32,
        public Multiplicand: Float32,
        public Divisor: Float32,
        public FinalAddend: Float32
    ) { }

    readonly id = 32435
}
