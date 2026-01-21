// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { DateTime } from "../../types/dateTime";
import { Float64 } from "../../types/baseTypes";
import { AggregateConfiguration } from "./aggregateConfiguration";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.22.4
 */
export class AggregateFilterResult implements IIdentifiable {
    constructor(
        public RevisedStartTime: DateTime,
        public RevisedProcessingInterval: Float64,
        public RevisedAggregateConfiguration: AggregateConfiguration
    ) { }

    readonly id = 737

    public static decode(reader: BufferReader): AggregateFilterResult {
        const obj = new AggregateFilterResult(
            DateTime.decode(reader),
            reader.readDouble(),
            AggregateConfiguration.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.RevisedStartTime.encode(writer);
        writer.writeDouble(this.RevisedProcessingInterval);
        this.RevisedAggregateConfiguration.encode(writer);
    }
}
