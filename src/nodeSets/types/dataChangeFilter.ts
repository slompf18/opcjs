// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { DataChangeTriggerEnum } from "./dataChangeTrigger";
import { Float64, UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.22.2
 */
export class DataChangeFilter implements IIdentifiable {
    constructor(
        public Trigger: DataChangeTriggerEnum,
        public DeadbandType: UInt32,
        public DeadbandValue: Float64
    ) { }

    getId(): number { return 722; }
}
