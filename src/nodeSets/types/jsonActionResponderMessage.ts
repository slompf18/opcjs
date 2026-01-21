// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { DateTime } from "../../types/dateTime";
import { PubSubConnectionDataType } from "./pubSubConnectionDataType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * JsonActionResponderMessage
 */
export class JsonActionResponderMessage implements IIdentifiable {
    constructor(
        public MessageId: string | undefined,
        public MessageType: string | undefined,
        public PublisherId: string | undefined,
        public Timestamp: DateTime,
        public Connection: PubSubConnectionDataType
    ) { }

    readonly id = 19319

    public static decode(reader: BufferReader): JsonActionResponderMessage {
        const obj = new JsonActionResponderMessage(
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
