// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { DateTime } from "../../types/dateTime";
import { PubSubStateEnum } from "./pubSubState";
import { IEncodable } from "../../coders/iEncodable";

/**
 * JsonStatusMessage
 */
export class JsonStatusMessage implements IEncodable {
    constructor(
        public MessageId: string | undefined,
        public MessageType: string | undefined,
        public PublisherId: string | undefined,
        public Timestamp: DateTime,
        public IsCyclic: boolean,
        public Status: PubSubStateEnum,
        public NextReportTime: DateTime
    ) { }

    public static decode(reader: BufferReader): JsonStatusMessage {
        const obj = new JsonStatusMessage(
            reader.readString(),
            reader.readString(),
            reader.readString(),
            DateTime.decode(reader),
            reader.readBoolean(),
            PubSubStateEnum.decode(reader),
            DateTime.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.MessageId);
        writer.writeString(this.MessageType);
        writer.writeString(this.PublisherId);
        this.Timestamp.encode(writer);
        writer.writeBoolean(this.IsCyclic);
        PubSubStateEnum.encode(writer, this.Status);
        this.NextReportTime.encode(writer);
    }
}
