// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

/**
 * DeadbandType
 */
export enum DeadbandTypeEnum {
    None = 0,
    Absolute = 1,
    Percent = 2,
}

export namespace DeadbandTypeEnum {
    export function decode(reader: BufferReader): DeadbandTypeEnum {
        return reader.readInt32() as DeadbandTypeEnum;
    }

    export function encode(writer: BufferWriter, value: DeadbandTypeEnum): void {
        writer.writeInt32(value as any);
    }
}
