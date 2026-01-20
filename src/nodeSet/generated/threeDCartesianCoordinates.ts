// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { Float64 } from "../../types/baseTypes";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.26
 */
export class ThreeDCartesianCoordinates implements IEncodable {
    constructor(
        public X: Float64,
        public Y: Float64,
        public Z: Float64
    ) { }

    public static decode(reader: BufferReader): ThreeDCartesianCoordinates {
        const obj = new ThreeDCartesianCoordinates(
            reader.readDouble(),
            reader.readDouble(),
            reader.readDouble()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeDouble(this.X);
        writer.writeDouble(this.Y);
        writer.writeDouble(this.Z);
    }
}
