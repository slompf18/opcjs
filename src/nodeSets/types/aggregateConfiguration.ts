// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { UInt8 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.22.4
 */
export class AggregateConfiguration implements IIdentifiable {
    constructor(
        public UseServerCapabilitiesDefaults: boolean,
        public TreatUncertainAsBad: boolean,
        public PercentDataBad: UInt8,
        public PercentDataGood: UInt8,
        public UseSlopedExtrapolation: boolean
    ) { }

    readonly id = 948

    public static decode(reader: BufferReader): AggregateConfiguration {
        const obj = new AggregateConfiguration(
            reader.readBoolean(),
            reader.readBoolean(),
            reader.readUInt8(),
            reader.readUInt8(),
            reader.readBoolean()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeBoolean(this.UseServerCapabilitiesDefaults);
        writer.writeBoolean(this.TreatUncertainAsBad);
        writer.writeUint8(this.PercentDataBad);
        writer.writeUint8(this.PercentDataGood);
        writer.writeBoolean(this.UseSlopedExtrapolation);
    }
}
