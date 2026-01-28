// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { Float64 } from "../../types/baseTypes";
import { NodeId } from "../../types/nodeId";
import { AggregateConfiguration } from "./aggregateConfiguration";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.5.4/#6.5.4.1
 */
export class ReadProcessedDetails implements IIdentifiable {
    constructor(
        public StartTime: Date,
        public EndTime: Date,
        public ProcessingInterval: Float64,
        public AggregateType: NodeId[],
        public AggregateConfiguration: AggregateConfiguration
    ) { }

    getId(): number { return 650; }
}
