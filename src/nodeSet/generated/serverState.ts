// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.6
 */
export enum ServerStateEnum {
    Running = 0,
    Failed = 1,
    NoConfiguration = 2,
    Suspended = 3,
    Shutdown = 4,
    Test = 5,
    CommunicationFault = 6,
    Unknown = 7,
}

export namespace ServerStateEnum {
    export function decode(reader: BufferReader): ServerStateEnum {
        return reader.readInt32() as ServerStateEnum;
    }

    export function encode(writer: BufferWriter, value: ServerStateEnum): void {
        writer.writeInt32(value as any);
    }
}
