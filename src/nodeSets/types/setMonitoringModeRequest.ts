// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { UInt32 } from "../../types/baseTypes";
import { MonitoringModeEnum } from "./monitoringMode";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.13.4/#5.13.4.2
 */
export class SetMonitoringModeRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public SubscriptionId: UInt32,
        public MonitoringMode: MonitoringModeEnum,
        public MonitoredItemIds: UInt32[]
    ) { }

    readonly id = 767
}
