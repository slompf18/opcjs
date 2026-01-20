// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { ExtensionObject } from "../../types/extensionObject";
import { IEncodable } from "../../coders/iEncodable";

/**
 * JsonNetworkMessage
 */
export class JsonNetworkMessage implements IEncodable {
    constructor(
        public MessageId: string | undefined,
        public MessageType: string | undefined,
        public PublisherId: string | undefined,
        public WriterGroupName: string | undefined,
        public DataSetClassId: string | undefined,
        public Messages: ExtensionObject
    ) { }

    public static decode(reader: BufferReader): JsonNetworkMessage {
        const obj = new JsonNetworkMessage(
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readExtensionObject()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.MessageId);
        writer.writeString(this.MessageType);
        writer.writeString(this.PublisherId);
        writer.writeString(this.WriterGroupName);
        writer.writeString(this.DataSetClassId);
        this.Messages.encode(writer);
    }
}
