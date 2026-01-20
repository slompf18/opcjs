// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { UInt16 } from "../../types/baseTypes";
import { DateTime } from "../../types/dateTime";
import { DataSetMetaDataType } from "./dataSetMetaDataType";
import { IEncodable } from "../../coders/iEncodable";

/**
 * JsonDataSetMetaDataMessage
 */
export class JsonDataSetMetaDataMessage implements IEncodable {
    constructor(
        public MessageId: string | undefined,
        public MessageType: string | undefined,
        public PublisherId: string | undefined,
        public DataSetWriterId: UInt16,
        public WriterGroupName: string | undefined,
        public DataSetWriterName: string | undefined,
        public Timestamp: DateTime,
        public MetaData: DataSetMetaDataType
    ) { }

    public static decode(reader: BufferReader): JsonDataSetMetaDataMessage {
        const obj = new JsonDataSetMetaDataMessage(
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readUInt16(),
            reader.readString(),
            reader.readString(),
            DateTime.decode(reader),
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
        this.Timestamp.encode(writer);
        this.MetaData.encode(writer);
    }
}
