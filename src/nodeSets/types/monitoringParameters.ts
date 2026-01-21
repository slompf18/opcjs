// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { Float64, UInt32 } from "../../types/baseTypes";
import { ExtensionObject } from "../../types/extensionObject";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.21
 */
export class MonitoringParameters implements IIdentifiable {
    constructor(
        public ClientHandle: UInt32,
        public SamplingInterval: Float64,
        public Filter: ExtensionObject,
        public QueueSize: UInt32,
        public DiscardOldest: boolean
    ) { }

    readonly id = 740

    public static decode(reader: BufferReader): MonitoringParameters {
        const obj = new MonitoringParameters(
            reader.readUInt32(),
            reader.readFloat64(),
            reader.readExtensionObject(),
            reader.readUInt32(),
            reader.readBoolean()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeUInt32(this.ClientHandle);
        writer.writeFloat64(this.SamplingInterval);
        this.Filter.encode(writer);
        writer.writeUInt32(this.QueueSize);
        writer.writeBoolean(this.DiscardOldest);
    }
}
