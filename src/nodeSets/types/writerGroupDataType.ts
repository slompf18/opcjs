// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { Float64, UInt16, UInt8 } from "../../types/baseTypes";
import { WriterGroupTransportDataType } from "./writerGroupTransportDataType";
import { WriterGroupMessageDataType } from "./writerGroupMessageDataType";
import { DataSetWriterDataType } from "./dataSetWriterDataType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.6/#6.2.6.7.1
 */
export class WriterGroupDataType implements IIdentifiable {
    constructor(
        public WriterGroupId: UInt16,
        public PublishingInterval: Float64,
        public KeepAliveTime: Float64,
        public Priority: UInt8,
        public LocaleIds: string[],
        public HeaderLayoutUri: string | undefined,
        public TransportSettings: WriterGroupTransportDataType,
        public MessageSettings: WriterGroupMessageDataType,
        public DataSetWriters: DataSetWriterDataType[]
    ) { }

    getId(): number { return 15480; }
}
