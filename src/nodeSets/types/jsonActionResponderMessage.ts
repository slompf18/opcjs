// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
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
        public Timestamp: Date,
        public Connection: PubSubConnectionDataType
    ) { }

    readonly id = 19319

    public static decode(reader: BufferReader): JsonActionResponderMessage {
        const obj = new JsonActionResponderMessage(
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readDateTime(),
            PubSubConnectionDataType.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.MessageId);
        writer.writeString(this.MessageType);
        writer.writeString(this.PublisherId);
        writer.writeDateTime(this.Timestamp);
        this.Connection.encode(writer);
    }
}
