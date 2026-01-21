// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt16, UInt32 } from "../../types/baseTypes";
import { ConfigurationVersionDataType } from "./configurationVersionDataType";
import { StatusCode } from "../../types/statusCode";
import { ExtensionObject } from "../../types/extensionObject";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * JsonDataSetMessage
 */
export class JsonDataSetMessage implements IIdentifiable {
    constructor(
        public DataSetWriterId: UInt16,
        public DataSetWriterName: string | undefined,
        public PublisherId: string | undefined,
        public WriterGroupName: string | undefined,
        public SequenceNumber: UInt32,
        public MetaDataVersion: ConfigurationVersionDataType,
        public MinorVersion: UInt32,
        public Timestamp: Date,
        public Status: StatusCode,
        public MessageType: string | undefined,
        public Payload: ExtensionObject
    ) { }

    readonly id = 19312

    public static decode(reader: BufferReader): JsonDataSetMessage {
        const obj = new JsonDataSetMessage(
            reader.readUInt16(),
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readUInt32(),
            ConfigurationVersionDataType.decode(reader),
            reader.readUInt32(),
            reader.readDateTime(),
            reader.readStatusCode(),
            reader.readString(),
            reader.readExtensionObject()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeUInt16(this.DataSetWriterId);
        writer.writeString(this.DataSetWriterName);
        writer.writeString(this.PublisherId);
        writer.writeString(this.WriterGroupName);
        writer.writeUInt32(this.SequenceNumber);
        this.MetaDataVersion.encode(writer);
        writer.writeUInt32(this.MinorVersion);
        writer.writeDateTime(this.Timestamp);
        writer.writeStatusCode(this.Status);
        writer.writeString(this.MessageType);
        this.Payload.encode(writer);
    }
}
