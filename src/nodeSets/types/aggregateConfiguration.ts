// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
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

    getId(): number { return 948; }
}
