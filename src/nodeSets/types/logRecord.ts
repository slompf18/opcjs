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

    public static decode(reader: BufferReader): LogRecord {
        const obj = new LogRecord(
            reader.readDateTime(),
            reader.readUInt16(),
            reader.readNodeId(),
            reader.readNodeId(),
            reader.readString(),
            reader.readLocalizedText(),
            TraceContextDataType.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = NameValuePair.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeDateTime(this.Time);
        writer.writeUInt16(this.Severity);
        (this.EventType ?? new NodeId()).encode(writer);
        (this.SourceNode ?? new NodeId()).encode(writer);
        writer.writeString((this.SourceName ?? undefined));
        this.Message.encode(writer);
        (this.TraceContext ?? new TraceContextDataType()).encode(writer);
        {
            const arr = (this.AdditionalData ?? []) ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
