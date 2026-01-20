// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { Float64 } from "../../types/baseTypes";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part8/5.6.5
 */
export class DoubleComplexNumberType implements IEncodable {
    constructor(
        public Real: Float64,
        public Imaginary: Float64
    ) { }

    public static decode(reader: BufferReader): DoubleComplexNumberType {
        const obj = new DoubleComplexNumberType(
            reader.readDouble(),
            reader.readDouble()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeDouble(this.Real);
        writer.writeDouble(this.Imaginary);
    }
}
