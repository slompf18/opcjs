// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { Float64 } from "../../types/baseTypes";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.28
 */
export class ThreeDOrientation implements IEncodable {
    constructor(
        public A: Float64,
        public B: Float64,
        public C: Float64
    ) { }

    public static decode(reader: BufferReader): ThreeDOrientation {
        const obj = new ThreeDOrientation(
            reader.readDouble(),
            reader.readDouble(),
            reader.readDouble()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeDouble(this.A);
        writer.writeDouble(this.B);
        writer.writeDouble(this.C);
    }
}
