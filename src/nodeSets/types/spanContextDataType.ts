// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { Guid } from "../../types/guid";
import { UInt64 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part26/5.5.2
 */
export class SpanContextDataType implements IIdentifiable {
    constructor(
        public TraceId: Guid,
        public SpanId: UInt64
    ) { }

    readonly id = 19746
}
