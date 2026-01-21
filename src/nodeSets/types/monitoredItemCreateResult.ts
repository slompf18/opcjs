// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { StatusCode } from "../../types/statusCode";
import { Float64, UInt32 } from "../../types/baseTypes";
import { ExtensionObject } from "../../types/extensionObject";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.13.2/#5.13.2.2
 */
export class MonitoredItemCreateResult implements IIdentifiable {
    constructor(
        public StatusCode: StatusCode,
        public MonitoredItemId: UInt32,
        public RevisedSamplingInterval: Float64,
        public RevisedQueueSize: UInt32,
        public FilterResult: ExtensionObject
    ) { }

    readonly id = 746

    public static decode(reader: BufferReader): MonitoredItemCreateResult {
        const obj = new MonitoredItemCreateResult(
            reader.readStatusCode(),
            reader.readUInt32(),
            reader.readFloat64(),
            reader.readUInt32(),
            reader.readExtensionObject()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeStatusCode(this.StatusCode);
        writer.writeUInt32(this.MonitoredItemId);
        writer.writeFloat64(this.RevisedSamplingInterval);
        writer.writeUInt32(this.RevisedQueueSize);
        this.FilterResult.encode(writer);
    }
}
