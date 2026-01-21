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

    readonly id = 12172

    public static decode(reader: BufferReader): DoubleComplexNumberType {
        const obj = new DoubleComplexNumberType(
            reader.readFloat64(),
            reader.readFloat64()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeFloat64(this.Real);
        writer.writeFloat64(this.Imaginary);
    }
}
