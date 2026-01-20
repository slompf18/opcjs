// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part3/8.59
 */
export enum EventNotifierTypeEnum {
    SubscribeToEvents = 0,
    HistoryRead = 2,
    HistoryWrite = 3,
}

export namespace EventNotifierTypeEnum {
    export function decode(reader: BufferReader): EventNotifierTypeEnum {
        return reader.readInt32() as EventNotifierTypeEnum;
    }

    export function encode(writer: BufferWriter, value: EventNotifierTypeEnum): void {
        writer.writeInt32(value as any);
    }
}
