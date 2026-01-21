// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
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

    readonly id = 12171

    public static decode(reader: BufferReader): ComplexNumberType {
        const obj = new ComplexNumberType(
            reader.readFloat(),
            reader.readFloat()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeFloat(this.Real);
        writer.writeFloat(this.Imaginary);
    }
}
