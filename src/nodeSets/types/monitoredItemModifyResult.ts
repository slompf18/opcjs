// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { StatusCode } from "../../types/statusCode";
import { Float64, UInt32 } from "../../types/baseTypes";
import { ExtensionObject } from "../../types/extensionObject";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.13.3/#5.13.3.2
 */
export class MonitoredItemModifyResult implements IIdentifiable {
    constructor(
        public StatusCode: StatusCode,
        public RevisedSamplingInterval: Float64,
        public RevisedQueueSize: UInt32,
        public FilterResult: ExtensionObject
    ) { }

    readonly id = 758

    public static decode(reader: BufferReader): MonitoredItemModifyResult {
        const obj = new MonitoredItemModifyResult(
            reader.readStatusCode(),
            reader.readFloat64(),
            reader.readUInt32(),
            reader.readExtensionObject()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeStatusCode(this.StatusCode);
        writer.writeFloat64(this.RevisedSamplingInterval);
        writer.writeUInt32(this.RevisedQueueSize);
        this.FilterResult.encode(writer);
    }
}
