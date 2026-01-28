// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.13
 */
export class ServiceCounterDataType implements IIdentifiable {
    constructor(
        public TotalCount: UInt32,
        public ErrorCount: UInt32
    ) { }

    getId(): number { return 871; }
}
