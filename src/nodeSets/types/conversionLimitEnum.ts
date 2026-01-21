// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part8/6.6.3
 */
export enum ConversionLimitEnumEnum {
    NoConversion = 0,
    Limited = 1,
    Unlimited = 2,
}

export namespace ConversionLimitEnumEnum {
    export function decode(reader: BufferReader): ConversionLimitEnumEnum {
        return reader.readInt32() as ConversionLimitEnumEnum;
    }

    export function encode(writer: BufferWriter, value: ConversionLimitEnumEnum): void {
        writer.writeInt32(value as any);
    }
}
