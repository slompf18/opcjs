// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part8/6.6.4
 */
export class QuantityDimension implements IIdentifiable {
    constructor(
        public MassExponent: number,
        public LengthExponent: number,
        public TimeExponent: number,
        public ElectricCurrentExponent: number,
        public AmountOfSubstanceExponent: number,
        public LuminousIntensityExponent: number,
        public AbsoluteTemperatureExponent: number,
        public DimensionlessExponent: number
    ) { }

    readonly id = 32438

    public static decode(reader: BufferReader): QuantityDimension {
        const obj = new QuantityDimension(
            reader.readInt8(),
            reader.readInt8(),
            reader.readInt8(),
            reader.readInt8(),
            reader.readInt8(),
            reader.readInt8(),
            reader.readInt8(),
            reader.readInt8()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeInt8(this.MassExponent);
        writer.writeInt8(this.LengthExponent);
        writer.writeInt8(this.TimeExponent);
        writer.writeInt8(this.ElectricCurrentExponent);
        writer.writeInt8(this.AmountOfSubstanceExponent);
        writer.writeInt8(this.LuminousIntensityExponent);
        writer.writeInt8(this.AbsoluteTemperatureExponent);
        writer.writeInt8(this.DimensionlessExponent);
    }
}
