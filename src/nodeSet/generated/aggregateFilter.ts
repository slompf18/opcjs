// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { DateTime } from "../../types/dateTime";
import { NodeId } from "../../types/nodeId";
import { Float64 } from "../../types/baseTypes";
import { AggregateConfiguration } from "./aggregateConfiguration";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.22.4
 */
export class AggregateFilter implements IEncodable {
    constructor(
        public StartTime: DateTime,
        public AggregateType: NodeId,
        public ProcessingInterval: Float64,
        public AggregateConfiguration: AggregateConfiguration
    ) { }

    public static decode(reader: BufferReader): AggregateFilter {
        const obj = new AggregateFilter(
            DateTime.decode(reader),
            reader.readNodeId(),
            reader.readDouble(),
            AggregateConfiguration.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.StartTime.encode(writer);
        this.AggregateType.encode(writer);
        writer.writeDouble(this.ProcessingInterval);
        this.AggregateConfiguration.encode(writer);
    }
}
