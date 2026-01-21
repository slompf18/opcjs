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

    readonly id = 12171

    public static decode(reader: BufferReader): ComplexNumberType {
        const obj = new ComplexNumberType(
            reader.readFloat32(),
            reader.readFloat32()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeFloat32(this.Real);
        writer.writeFloat32(this.Imaginary);
    }
}
