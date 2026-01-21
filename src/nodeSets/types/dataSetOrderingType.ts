// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.3.1/#6.3.1.1.3
 */
export enum DataSetOrderingTypeEnum {
    Undefined = 0,
    AscendingWriterId = 1,
    AscendingWriterIdSingle = 2,
}

export namespace DataSetOrderingTypeEnum {
    export function decode(reader: BufferReader): DataSetOrderingTypeEnum {
        return reader.readInt32() as DataSetOrderingTypeEnum;
    }

    export function encode(writer: BufferWriter, value: DataSetOrderingTypeEnum): void {
        writer.writeInt32(value as any);
    }
}
