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

    readonly id = 650

    public static decode(reader: BufferReader): ReadProcessedDetails {
        const obj = new ReadProcessedDetails(
            reader.readDateTime(),
            reader.readDateTime(),
            reader.readFloat64(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readNodeId(); } return arr; })(),
            AggregateConfiguration.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeDateTime(this.StartTime);
        writer.writeDateTime(this.EndTime);
        writer.writeFloat64(this.ProcessingInterval);
        {
            const arr = this.AggregateType ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        this.AggregateConfiguration.encode(writer);
    }
}
