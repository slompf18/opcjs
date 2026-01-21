// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.3/#6.2.3.2.5
 */
export enum DataSetFieldFlagsEnum {
    PromotedField = 0,
}

export namespace DataSetFieldFlagsEnum {
    export function decode(reader: BufferReader): DataSetFieldFlagsEnum {
        return reader.readInt32() as DataSetFieldFlagsEnum;
    }

    export function encode(writer: BufferWriter, value: DataSetFieldFlagsEnum): void {
        writer.writeInt32(value as any);
    }
}
