// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { Int32, UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.22
 */
export class RationalNumber implements IIdentifiable {
    constructor(
        public Numerator: Int32,
        public Denominator: UInt32
    ) { }

    readonly id = 18806

    public static decode(reader: BufferReader): RationalNumber {
        const obj = new RationalNumber(
            reader.readInt32(),
            reader.readUInt32()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeInt32(this.Numerator);
        writer.writeUInt32(this.Denominator);
    }
}
