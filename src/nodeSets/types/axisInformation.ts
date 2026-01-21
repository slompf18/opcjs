// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { EUInformation } from "./eUInformation";
import { Range } from "./range";
import { LocalizedText } from "../../types/localizedText";
import { AxisScaleEnumerationEnum } from "./axisScaleEnumeration";
import { Float64 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part8/5.6.6
 */
export class AxisInformation implements IIdentifiable {
    constructor(
        public EngineeringUnits: EUInformation,
        public EURange: Range,
        public Title: LocalizedText,
        public AxisScaleType: AxisScaleEnumerationEnum,
        public AxisSteps: Float64[]
    ) { }

    readonly id = 12079

    public static decode(reader: BufferReader): AxisInformation {
        const obj = new AxisInformation(
            EUInformation.decode(reader),
            Range.decode(reader),
            reader.readLocalizedText(),
            AxisScaleEnumerationEnum.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readFloat64(); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.EngineeringUnits.encode(writer);
        this.EURange.encode(writer);
        this.Title.encode(writer);
        AxisScaleEnumerationEnum.encode(writer, this.AxisScaleType);
        {
            const arr = this.AxisSteps ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeFloat64(v);
            }
        };
    }
}
