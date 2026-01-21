// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { UInt16, UInt32 } from "../../types/baseTypes";
import { ConfigurationVersionDataType } from "./configurationVersionDataType";
import { DateTime } from "../../types/dateTime";
import { ActionStateEnum } from "./actionState";
import { ExtensionObject } from "../../types/extensionObject";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * JsonActionRequestMessage
 */
export class JsonActionRequestMessage implements IIdentifiable {
    constructor(
        public DataSetWriterId: UInt16,
        public ActionTargetId: UInt16,
        public DataSetWriterName: string | undefined,
        public WriterGroupName: string | undefined,
        public MetaDataVersion: ConfigurationVersionDataType,
        public MinorVersion: UInt32,
        public Timestamp: DateTime,
        public MessageType: string | undefined,
        public RequestId: UInt16,
        public ActionState: ActionStateEnum,
        public Payload: ExtensionObject
    ) { }

    readonly id = 19321

    public static decode(reader: BufferReader): JsonActionRequestMessage {
        const obj = new JsonActionRequestMessage(
            reader.readUInt16(),
            reader.readUInt16(),
            reader.readString(),
            reader.readString(),
            ConfigurationVersionDataType.decode(reader),
            reader.readUInt32(),
            DateTime.decode(reader),
            reader.readString(),
            reader.readUInt16(),
            ActionStateEnum.decode(reader),
            reader.readExtensionObject()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeUInt16(this.DataSetWriterId);
        writer.writeUInt16(this.ActionTargetId);
        writer.writeString(this.DataSetWriterName);
        writer.writeString(this.WriterGroupName);
        this.MetaDataVersion.encode(writer);
        writer.writeUInt32(this.MinorVersion);
        this.Timestamp.encode(writer);
        writer.writeString(this.MessageType);
        writer.writeUInt16(this.RequestId);
        ActionStateEnum.encode(writer, this.ActionState);
        this.Payload.encode(writer);
    }
}
