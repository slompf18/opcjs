// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { MonitoringParameters } from "./monitoringParameters";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.13.3/#5.13.3.2
 */
export class MonitoredItemModifyRequest implements IIdentifiable {
    constructor(
        public MonitoredItemId: UInt32,
        public RequestedParameters: MonitoringParameters
    ) { }

    readonly id = 755
}
