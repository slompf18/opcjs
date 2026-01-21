// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part8/5.6.7
 */
export enum AxisScaleEnumerationEnum {
    Linear = 0,
    Log = 1,
    Ln = 2,
}

export namespace AxisScaleEnumerationEnum {
    export function decode(reader: BufferReader): AxisScaleEnumerationEnum {
        return reader.readInt32() as AxisScaleEnumerationEnum;
    }

    export function encode(writer: BufferWriter, value: AxisScaleEnumerationEnum): void {
        writer.writeInt32(value as any);
    }
}
