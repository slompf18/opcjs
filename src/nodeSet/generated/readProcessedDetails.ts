// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { DateTime } from "../../types/dateTime";
import { Float64 } from "../../types/baseTypes";
import { NodeId } from "../../types/nodeId";
import { AggregateConfiguration } from "./aggregateConfiguration";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.5.4/#6.5.4.1
 */
export class ReadProcessedDetails implements IEncodable {
    constructor(
        public StartTime: DateTime,
        public EndTime: DateTime,
        public ProcessingInterval: Float64,
        public AggregateType: NodeId[],
        public AggregateConfiguration: AggregateConfiguration
    ) { }

    public static decode(reader: BufferReader): ReadProcessedDetails {
        const obj = new ReadProcessedDetails(
            DateTime.decode(reader),
            DateTime.decode(reader),
            reader.readDouble(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readNodeId(); } return arr; })(),
            AggregateConfiguration.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.StartTime.encode(writer);
        this.EndTime.encode(writer);
        writer.writeDouble(this.ProcessingInterval);
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
