// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.3.2/#6.3.2.1.1
 */
export enum JsonNetworkMessageContentMaskEnum {
    NetworkMessageHeader = 0,
    DataSetMessageHeader = 1,
    SingleDataSetMessage = 2,
    PublisherId = 3,
    DataSetClassId = 4,
    ReplyTo = 5,
    WriterGroupName = 6,
}

export namespace JsonNetworkMessageContentMaskEnum {
    export function decode(reader: BufferReader): JsonNetworkMessageContentMaskEnum {
        return reader.readInt32() as JsonNetworkMessageContentMaskEnum;
    }

    export function encode(writer: BufferWriter, value: JsonNetworkMessageContentMaskEnum): void {
        writer.writeInt32(value as any);
    }
}
