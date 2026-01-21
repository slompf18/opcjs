// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { PubSubStateEnum } from "./pubSubState";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * JsonStatusMessage
 */
export class JsonStatusMessage implements IIdentifiable {
    constructor(
        public MessageId: string | undefined,
        public MessageType: string | undefined,
        public PublisherId: string | undefined,
        public Timestamp: Date,
        public IsCyclic: boolean,
        public Status: PubSubStateEnum,
        public NextReportTime: Date
    ) { }

    readonly id = 19316

    public static decode(reader: BufferReader): JsonStatusMessage {
        const obj = new JsonStatusMessage(
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readDateTime(),
            reader.readBoolean(),
            PubSubStateEnum.decode(reader),
            reader.readDateTime()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.MessageId);
        writer.writeString(this.MessageType);
        writer.writeString(this.PublisherId);
        writer.writeDateTime(this.Timestamp);
        writer.writeBoolean(this.IsCyclic);
        PubSubStateEnum.encode(writer, this.Status);
        writer.writeDateTime(this.NextReportTime);
    }
}
