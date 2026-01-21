// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { Float64 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.28
 */
export class ThreeDOrientation implements IIdentifiable {
    constructor(
        public A: Float64,
        public B: Float64,
        public C: Float64
    ) { }

    readonly id = 18812

    public static decode(reader: BufferReader): ThreeDOrientation {
        const obj = new ThreeDOrientation(
            reader.readFloat64(),
            reader.readFloat64(),
            reader.readFloat64()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeFloat64(this.A);
        writer.writeFloat64(this.B);
        writer.writeFloat64(this.C);
    }
}
