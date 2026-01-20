// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { DateTime } from "../../types/dateTime";
import { Float64 } from "../../types/baseTypes";
import { AggregateConfiguration } from "./aggregateConfiguration";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.22.4
 */
export class AggregateFilterResult implements IEncodable {
    constructor(
        public RevisedStartTime: DateTime,
        public RevisedProcessingInterval: Float64,
        public RevisedAggregateConfiguration: AggregateConfiguration
    ) { }

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
