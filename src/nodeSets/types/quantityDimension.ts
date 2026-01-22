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
}
