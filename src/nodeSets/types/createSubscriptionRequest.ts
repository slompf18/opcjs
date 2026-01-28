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

    getId(): number { return 785; }
}
