// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { Float64, UInt32, UInt8 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.14.3/#5.14.3.2
 */
export class ModifySubscriptionRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public SubscriptionId: UInt32,
        public RequestedPublishingInterval: Float64,
        public RequestedLifetimeCount: UInt32,
        public RequestedMaxKeepAliveCount: UInt32,
        public MaxNotificationsPerPublish: UInt32,
        public Priority: UInt8
    ) { }

    readonly id = 791

    public static decode(reader: BufferReader): ModifySubscriptionRequest {
        const obj = new ModifySubscriptionRequest(
            RequestHeader.decode(reader),
            reader.readUInt32(),
            reader.readDouble(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt8()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.RequestHeader.encode(writer);
        writer.writeUInt32(this.SubscriptionId);
        writer.writeDouble(this.RequestedPublishingInterval);
        writer.writeUInt32(this.RequestedLifetimeCount);
        writer.writeUInt32(this.RequestedMaxKeepAliveCount);
        writer.writeUInt32(this.MaxNotificationsPerPublish);
        writer.writeUint8(this.Priority);
    }
}
