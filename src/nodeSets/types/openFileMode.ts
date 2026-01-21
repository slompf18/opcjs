// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

/**
 * OpenFileMode
 */
export enum OpenFileModeEnum {
    Read = 1,
    Write = 2,
    EraseExisting = 4,
    Append = 8,
}

export namespace OpenFileModeEnum {
    export function decode(reader: BufferReader): OpenFileModeEnum {
        return reader.readInt32() as OpenFileModeEnum;
    }

    export function encode(writer: BufferWriter, value: OpenFileModeEnum): void {
        writer.writeInt32(value as any);
    }
}
