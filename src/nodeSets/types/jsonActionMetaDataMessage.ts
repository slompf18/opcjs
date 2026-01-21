// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt16 } from "../../types/baseTypes";
import { ActionTargetDataType } from "./actionTargetDataType";
import { DataSetMetaDataType } from "./dataSetMetaDataType";
import { ActionMethodDataType } from "./actionMethodDataType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * JsonActionMetaDataMessage
 */
export class JsonActionMetaDataMessage implements IIdentifiable {
    constructor(
        public MessageId: string | undefined,
        public MessageType: string | undefined,
        public PublisherId: string | undefined,
        public DataSetWriterId: UInt16,
        public DataSetWriterName: string | undefined,
        public Timestamp: Date,
        public ActionTargets: ActionTargetDataType[],
        public Request: DataSetMetaDataType,
        public Response: DataSetMetaDataType,
        public ActionMethods: ActionMethodDataType[]
    ) { }

    readonly id = 19318

    public static decode(reader: BufferReader): JsonActionMetaDataMessage {
        const obj = new JsonActionMetaDataMessage(
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readUInt16(),
            reader.readString(),
            reader.readDateTime(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = ActionTargetDataType.decode(reader); } return arr; })(),
            DataSetMetaDataType.decode(reader),
            DataSetMetaDataType.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = ActionMethodDataType.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.MessageId);
        writer.writeString(this.MessageType);
        writer.writeString(this.PublisherId);
        writer.writeUInt16(this.DataSetWriterId);
        writer.writeString(this.DataSetWriterName);
        writer.writeDateTime(this.Timestamp);
        {
            const arr = this.ActionTargets ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        this.Request.encode(writer);
        this.Response.encode(writer);
        {
            const arr = this.ActionMethods ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
