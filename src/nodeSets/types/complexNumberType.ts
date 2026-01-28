// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { Float32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part8/5.6.4
 */
export class ComplexNumberType implements IIdentifiable {
    constructor(
        public Real: Float32,
        public Imaginary: Float32
    ) { }

    getId(): number { return 12171; }
}
