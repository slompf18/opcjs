// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.3.2/#6.3.2.3.1
 */
export enum JsonDataSetMessageContentMaskEnum {
    DataSetWriterId = 0,
    MetaDataVersion = 1,
    SequenceNumber = 2,
    Timestamp = 3,
    Status = 4,
    MessageType = 5,
    DataSetWriterName = 6,
    FieldEncoding1 = 7,
    PublisherId = 8,
    WriterGroupName = 9,
    MinorVersion = 10,
    FieldEncoding2 = 11,
}

export namespace JsonDataSetMessageContentMaskEnum {
    export function decode(reader: BufferReader): JsonDataSetMessageContentMaskEnum {
        return reader.readInt32() as JsonDataSetMessageContentMaskEnum;
    }

    export function encode(writer: BufferWriter, value: JsonDataSetMessageContentMaskEnum): void {
        writer.writeInt32(value as any);
    }
}
