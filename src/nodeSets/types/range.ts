// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { Float64 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part8/5.6.2
 */
export class Range implements IIdentifiable {
    constructor(
        public Low: Float64,
        public High: Float64
    ) { }

    readonly id = 884

    public static decode(reader: BufferReader): Range {
        const obj = new Range(
            reader.readDouble(),
            reader.readDouble()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeDouble(this.Low);
        writer.writeDouble(this.High);
    }
}
