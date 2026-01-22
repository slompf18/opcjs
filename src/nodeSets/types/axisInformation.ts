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
}
