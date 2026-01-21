// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { Float64 } from "../../types/baseTypes";
import { AggregateConfiguration } from "./aggregateConfiguration";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.22.4
 */
export class AggregateFilter implements IIdentifiable {
    constructor(
        public StartTime: Date,
        public AggregateType: NodeId,
        public ProcessingInterval: Float64,
        public AggregateConfiguration: AggregateConfiguration
    ) { }

    readonly id = 728

    public static decode(reader: BufferReader): AggregateFilter {
        const obj = new AggregateFilter(
            reader.readDateTime(),
            reader.readNodeId(),
            reader.readFloat64(),
            AggregateConfiguration.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeDateTime(this.StartTime);
        this.AggregateType.encode(writer);
        writer.writeFloat64(this.ProcessingInterval);
        this.AggregateConfiguration.encode(writer);
    }
}
