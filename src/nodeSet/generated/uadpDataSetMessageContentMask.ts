// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.3.1/#6.3.1.3.2
 */
export enum UadpDataSetMessageContentMaskEnum {
    Timestamp = 0,
    PicoSeconds = 1,
    Status = 2,
    MajorVersion = 3,
    MinorVersion = 4,
    SequenceNumber = 5,
}

export namespace UadpDataSetMessageContentMaskEnum {
    export function decode(reader: BufferReader): UadpDataSetMessageContentMaskEnum {
        return reader.readInt32() as UadpDataSetMessageContentMaskEnum;
    }

    export function encode(writer: BufferWriter, value: UadpDataSetMessageContentMaskEnum): void {
        writer.writeInt32(value as any);
    }
}
