// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { DateTime } from "../../types/dateTime";
import { PubSubConnectionDataType } from "./pubSubConnectionDataType";
import { IEncodable } from "../../coders/iEncodable";

/**
 * JsonPubSubConnectionMessage
 */
export class JsonPubSubConnectionMessage implements IEncodable {
    constructor(
        public MessageId: string | undefined,
        public MessageType: string | undefined,
        public PublisherId: string | undefined,
        public Timestamp: DateTime,
        public Connection: PubSubConnectionDataType
    ) { }

    public static decode(reader: BufferReader): JsonPubSubConnectionMessage {
        const obj = new JsonPubSubConnectionMessage(
            reader.readString(),
            reader.readString(),
            reader.readString(),
            DateTime.decode(reader),
            PubSubConnectionDataType.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.MessageId);
        writer.writeString(this.MessageType);
        writer.writeString(this.PublisherId);
        this.Timestamp.encode(writer);
        this.Connection.encode(writer);
    }
}
