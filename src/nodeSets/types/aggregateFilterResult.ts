// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { Float64 } from "../../types/baseTypes";
import { AggregateConfiguration } from "./aggregateConfiguration";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.22.4
 */
export class AggregateFilterResult implements IIdentifiable {
    constructor(
        public RevisedStartTime: Date,
        public RevisedProcessingInterval: Float64,
        public RevisedAggregateConfiguration: AggregateConfiguration
    ) { }

    readonly id = 737
}
