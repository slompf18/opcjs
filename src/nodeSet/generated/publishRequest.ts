// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { SubscriptionAcknowledgement } from "./subscriptionAcknowledgement";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.14.5/#5.14.5.2
 */
export class PublishRequest implements IEncodable {
    constructor(
        public RequestHeader: RequestHeader,
        public SubscriptionAcknowledgements: SubscriptionAcknowledgement[]
    ) { }

    public static decode(reader: BufferReader): PublishRequest {
        const obj = new PublishRequest(
            RequestHeader.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = SubscriptionAcknowledgement.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.RequestHeader.encode(writer);
        {
            const arr = this.SubscriptionAcknowledgements ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
