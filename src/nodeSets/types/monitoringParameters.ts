// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { Float64, UInt32 } from "../../types/baseTypes";
import { ExtensionObject } from "../../types/extensionObject";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.21
 */
export class MonitoringParameters implements IIdentifiable {
    constructor(
        public ClientHandle: UInt32,
        public SamplingInterval: Float64,
        public Filter: ExtensionObject,
        public QueueSize: UInt32,
        public DiscardOldest: boolean
    ) { }

    getId(): number { return 740; }
}
