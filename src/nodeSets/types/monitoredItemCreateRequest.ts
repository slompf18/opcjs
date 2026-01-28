// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ReadValueId } from "./readValueId";
import { MonitoringModeEnum } from "./monitoringMode";
import { MonitoringParameters } from "./monitoringParameters";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.13.2/#5.13.2.2
 */
export class MonitoredItemCreateRequest implements IIdentifiable {
    constructor(
        public ItemToMonitor: ReadValueId,
        public MonitoringMode: MonitoringModeEnum,
        public RequestedParameters: MonitoringParameters
    ) { }

    getId(): number { return 743; }
}
