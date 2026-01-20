// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { StatusCode } from "../../types/statusCode";
import { Float64, UInt32 } from "../../types/baseTypes";
import { ExtensionObject } from "../../types/extensionObject";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.13.3/#5.13.3.2
 */
export class MonitoredItemModifyResult implements IEncodable {
    constructor(
        public StatusCode: StatusCode,
        public RevisedSamplingInterval: Float64,
        public RevisedQueueSize: UInt32,
        public FilterResult: ExtensionObject
    ) { }

    public static decode(reader: BufferReader): MonitoredItemModifyResult {
        const obj = new MonitoredItemModifyResult(
            reader.readStatusCode(),
            reader.readDouble(),
            reader.readUInt32(),
            reader.readExtensionObject()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.StatusCode.encode(writer);
        writer.writeDouble(this.RevisedSamplingInterval);
        writer.writeUInt32(this.RevisedQueueSize);
        this.FilterResult.encode(writer);
    }
}
