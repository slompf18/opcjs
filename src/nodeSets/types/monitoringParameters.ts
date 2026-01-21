// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
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
            reader.readDouble(),
            reader.readExtensionObject(),
            reader.readUInt32(),
            reader.readBoolean()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeUInt32(this.ClientHandle);
        writer.writeDouble(this.SamplingInterval);
        this.Filter.encode(writer);
        writer.writeUInt32(this.QueueSize);
        writer.writeBoolean(this.DiscardOldest);
    }
}
