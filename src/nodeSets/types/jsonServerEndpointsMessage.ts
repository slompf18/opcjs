// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ApplicationDescription } from "./applicationDescription";
import { EndpointDescription } from "./endpointDescription";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * JsonServerEndpointsMessage
 */
export class JsonServerEndpointsMessage implements IIdentifiable {
    constructor(
        public MessageId: string | undefined,
        public MessageType: string | undefined,
        public PublisherId: string | undefined,
        public Timestamp: Date,
        public Description: ApplicationDescription,
        public Endpoints: EndpointDescription[]
    ) { }

    readonly id = 19315

    public static decode(reader: BufferReader): JsonServerEndpointsMessage {
        const obj = new JsonServerEndpointsMessage(
            reader.readString(),
            reader.readString(),
            reader.readString(),
            reader.readDateTime(),
            ApplicationDescription.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = EndpointDescription.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.MessageId);
        writer.writeString(this.MessageType);
        writer.writeString(this.PublisherId);
        writer.writeDateTime(this.Timestamp);
        this.Description.encode(writer);
        {
            const arr = this.Endpoints ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
