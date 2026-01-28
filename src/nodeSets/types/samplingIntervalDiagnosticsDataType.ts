// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { Float64, UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.8
 */
export class SamplingIntervalDiagnosticsDataType implements IIdentifiable {
    constructor(
        public SamplingInterval: Float64,
        public MonitoredItemCount: UInt32,
        public MaxMonitoredItemCount: UInt32,
        public DisabledMonitoredItemCount: UInt32
    ) { }

    getId(): number { return 856; }
}
