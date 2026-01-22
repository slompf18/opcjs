// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.14.6/#5.14.6.2
 */
export class RepublishRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public SubscriptionId: UInt32,
        public RetransmitSequenceNumber: UInt32
    ) { }

    readonly id = 830
}
