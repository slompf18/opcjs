// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt16 } from "../../types/baseTypes";
import { DataSetMetaDataType } from "./dataSetMetaDataType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * JsonDataSetMetaDataMessage
 */
export class JsonDataSetMetaDataMessage implements IIdentifiable {
    constructor(
        public MessageId: string | undefined,
        public MessageType: string | undefined,
        public PublisherId: string | undefined,
        public DataSetWriterId: UInt16,
        public WriterGroupName: string | undefined,
        public DataSetWriterName: string | undefined,
        public Timestamp: Date,
        public MetaData: DataSetMetaDataType
    ) { }

    getId(): number { return 19313; }
}
