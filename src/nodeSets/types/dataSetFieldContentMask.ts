// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.4/#6.2.4.2
 */
export enum DataSetFieldContentMaskEnum {
    StatusCode = 0,
    SourceTimestamp = 1,
    ServerTimestamp = 2,
    SourcePicoSeconds = 3,
    ServerPicoSeconds = 4,
    RawData = 5,
}

export namespace DataSetFieldContentMaskEnum {
    export function decode(reader: BufferReader): DataSetFieldContentMaskEnum {
        return reader.readInt32() as DataSetFieldContentMaskEnum;
    }

    export function encode(writer: BufferWriter, value: DataSetFieldContentMaskEnum): void {
        writer.writeInt32(value as any);
    }
}
