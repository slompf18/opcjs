// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part26/5.7
 */
export enum LogRecordMaskEnum {
    EventType = 0,
    SourceNode = 1,
    SourceName = 2,
    TraceContext = 3,
    AdditionalData = 4,
}

export namespace LogRecordMaskEnum {
    export function decode(reader: BufferReader): LogRecordMaskEnum {
        return reader.readInt32() as LogRecordMaskEnum;
    }

    export function encode(writer: BufferWriter, value: LogRecordMaskEnum): void {
        writer.writeInt32(value as any);
    }
}
