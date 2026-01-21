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

    readonly id = 19313

    public static decode(reader: BufferReader): JsonDataSetMetaDataMessage {
        const obj = new JsonDataSetMetaDataMessage(
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readUInt16(),
            reader.readString(),
            reader.readString(),
            reader.readDateTime(),
            DataSetMetaDataType.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.MessageId);
        writer.writeString(this.MessageType);
        writer.writeString(this.PublisherId);
        writer.writeUInt16(this.DataSetWriterId);
        writer.writeString(this.WriterGroupName);
        writer.writeString(this.DataSetWriterName);
        writer.writeDateTime(this.Timestamp);
        this.MetaData.encode(writer);
    }
}
