// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { DateTime } from "../../types/dateTime";
import { ApplicationDescription } from "./applicationDescription";
import { IEncodable } from "../../coders/iEncodable";

/**
 * JsonApplicationDescriptionMessage
 */
export class JsonApplicationDescriptionMessage implements IEncodable {
    constructor(
        public MessageId: string | undefined,
        public MessageType: string | undefined,
        public PublisherId: string | undefined,
        public Timestamp: DateTime,
        public Description: ApplicationDescription,
        public ServerCapabilities: string | undefined[]
    ) { }

    public static decode(reader: BufferReader): JsonApplicationDescriptionMessage {
        const obj = new JsonApplicationDescriptionMessage(
            reader.readString(),
            reader.readString(),
            reader.readString(),
            DateTime.decode(reader),
            ApplicationDescription.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.MessageId);
        writer.writeString(this.MessageType);
        writer.writeString(this.PublisherId);
        this.Timestamp.encode(writer);
        this.Description.encode(writer);
        {
            const arr = this.ServerCapabilities ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeString(v);
            }
        };
    }
}
