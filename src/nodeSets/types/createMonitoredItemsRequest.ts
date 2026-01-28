// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { UInt32 } from "../../types/baseTypes";
import { TimestampsToReturnEnum } from "./timestampsToReturn";
import { MonitoredItemCreateRequest } from "./monitoredItemCreateRequest";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.13.2/#5.13.2.2
 */
export class CreateMonitoredItemsRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public SubscriptionId: UInt32,
        public TimestampsToReturn: TimestampsToReturnEnum,
        public ItemsToCreate: MonitoredItemCreateRequest[]
    ) { }

    getId(): number { return 749; }
}
