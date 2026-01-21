// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.40
 */
export class UnsignedRationalNumber implements IIdentifiable {
    constructor(
        public Numerator: UInt32,
        public Denominator: UInt32
    ) { }

    readonly id = 24107

    public static decode(reader: BufferReader): UnsignedRationalNumber {
        const obj = new UnsignedRationalNumber(
            reader.readUInt32(),
            reader.readUInt32()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeUInt32(this.Numerator);
        writer.writeUInt32(this.Denominator);
    }
}
