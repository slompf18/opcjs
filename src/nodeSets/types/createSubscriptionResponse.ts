// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { Float64, UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.14.2/#5.14.2.2
 */
export class CreateSubscriptionResponse implements IIdentifiable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public SubscriptionId: UInt32,
        public RevisedPublishingInterval: Float64,
        public RevisedLifetimeCount: UInt32,
        public RevisedMaxKeepAliveCount: UInt32
    ) { }

    readonly id = 788

    public static decode(reader: BufferReader): CreateSubscriptionResponse {
        const obj = new CreateSubscriptionResponse(
            ResponseHeader.decode(reader),
            reader.readUInt32(),
            reader.readFloat64(),
            reader.readUInt32(),
            reader.readUInt32()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.ResponseHeader.encode(writer);
        writer.writeUInt32(this.SubscriptionId);
        writer.writeFloat64(this.RevisedPublishingInterval);
        writer.writeUInt32(this.RevisedLifetimeCount);
        writer.writeUInt32(this.RevisedMaxKeepAliveCount);
    }
}
