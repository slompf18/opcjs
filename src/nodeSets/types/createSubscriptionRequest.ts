// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { Float64, UInt32, UInt8 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.14.2/#5.14.2.2
 */
export class CreateSubscriptionRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public RequestedPublishingInterval: Float64,
        public RequestedLifetimeCount: UInt32,
        public RequestedMaxKeepAliveCount: UInt32,
        public MaxNotificationsPerPublish: UInt32,
        public PublishingEnabled: boolean,
        public Priority: UInt8
    ) { }

    readonly id = 785

    public static decode(reader: BufferReader): CreateSubscriptionRequest {
        const obj = new CreateSubscriptionRequest(
            RequestHeader.decode(reader),
            reader.readFloat64(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readBoolean(),
            reader.readUInt8()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.RequestHeader.encode(writer);
        writer.writeFloat64(this.RequestedPublishingInterval);
        writer.writeUInt32(this.RequestedLifetimeCount);
        writer.writeUInt32(this.RequestedMaxKeepAliveCount);
        writer.writeUInt32(this.MaxNotificationsPerPublish);
        writer.writeBoolean(this.PublishingEnabled);
        writer.writeUint8(this.Priority);
    }
}
