// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
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
            reader.readFloat64(),
            reader.readFloat64()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeFloat64(this.Low);
        writer.writeFloat64(this.High);
    }
}
