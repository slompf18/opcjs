// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt16 } from "../../types/baseTypes";
import { NodeId } from "../../types/nodeId";
import { LocalizedText } from "../../types/localizedText";
import { TraceContextDataType } from "./traceContextDataType";
import { NameValuePair } from "./nameValuePair";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part26/5.4
 */
export class LogRecord implements IIdentifiable {
    constructor(
        public Time: Date,
        public Severity: UInt16,
        public EventType?: NodeId,
        public SourceNode?: NodeId,
        public SourceName?: string | undefined,
        public Message: LocalizedText,
        public TraceContext?: TraceContextDataType,
        public AdditionalData?: NameValuePair[]
    ) { }

    readonly id = 19361
}
