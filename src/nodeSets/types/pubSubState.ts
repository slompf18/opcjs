// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.1
 */
export enum PubSubStateEnum {
    Disabled = 0,
    Paused = 1,
    Operational = 2,
    Error = 3,
    PreOperational = 4,
}

export namespace PubSubStateEnum {
    export function decode(reader: BufferReader): PubSubStateEnum {
        return reader.readInt32() as PubSubStateEnum;
    }

    export function encode(writer: BufferWriter, value: PubSubStateEnum): void {
        writer.writeInt32(value as any);
    }
}
