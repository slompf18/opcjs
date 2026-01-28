// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt64 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part26/5.5.3
 */
export class TraceContextDataType implements IIdentifiable {
    constructor(
        public ParentSpanId: UInt64,
        public ParentIdentifier: string | undefined
    ) { }

    getId(): number { return 19747; }
}
