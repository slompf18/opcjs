// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt32, UInt8 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part22/5.3.2/#5.3.2.1
 */
export class PriorityMappingEntryType implements IIdentifiable {
    constructor(
        public MappingUri: string | undefined,
        public PriorityLabel: string | undefined,
        public PriorityValue_PCP: UInt8,
        public PriorityValue_DSCP: UInt32
    ) { }

    getId(): number { return 25220; }
}
