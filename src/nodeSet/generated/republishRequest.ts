// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { UInt32 } from "../../types/baseTypes";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.14.6/#5.14.6.2
 */
export class RepublishRequest implements IEncodable {
    constructor(
        public RequestHeader: RequestHeader,
        public SubscriptionId: UInt32,
        public RetransmitSequenceNumber: UInt32
    ) { }

    public static decode(reader: BufferReader): RepublishRequest {
        const obj = new RepublishRequest(
            RequestHeader.decode(reader),
            reader.readUInt32(),
            reader.readUInt32()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.RequestHeader.encode(writer);
        writer.writeUInt32(this.SubscriptionId);
        writer.writeUInt32(this.RetransmitSequenceNumber);
    }
}
