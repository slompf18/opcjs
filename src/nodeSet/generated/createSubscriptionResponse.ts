// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { Float64, UInt32 } from "../../types/baseTypes";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.14.2/#5.14.2.2
 */
export class CreateSubscriptionResponse implements IEncodable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public SubscriptionId: UInt32,
        public RevisedPublishingInterval: Float64,
        public RevisedLifetimeCount: UInt32,
        public RevisedMaxKeepAliveCount: UInt32
    ) { }

    public static decode(reader: BufferReader): CreateSubscriptionResponse {
        const obj = new CreateSubscriptionResponse(
            ResponseHeader.decode(reader),
            reader.readUInt32(),
            reader.readDouble(),
            reader.readUInt32(),
            reader.readUInt32()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.ResponseHeader.encode(writer);
        writer.writeUInt32(this.SubscriptionId);
        writer.writeDouble(this.RevisedPublishingInterval);
        writer.writeUInt32(this.RevisedLifetimeCount);
        writer.writeUInt32(this.RevisedMaxKeepAliveCount);
    }
}
