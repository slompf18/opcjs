// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { Float64 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.24
 */
export class ThreeDVector implements IIdentifiable {
    constructor(
        public X: Float64,
        public Y: Float64,
        public Z: Float64
    ) { }

    readonly id = 18808

    public static decode(reader: BufferReader): ThreeDVector {
        const obj = new ThreeDVector(
            reader.readFloat64(),
            reader.readFloat64(),
            reader.readFloat64()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeFloat64(this.X);
        writer.writeFloat64(this.Y);
        writer.writeFloat64(this.Z);
    }
}
