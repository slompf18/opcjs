// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { DateTime } from "../../types/dateTime";
import { ByteString } from "../../types/byteString";
import { Float64 } from "../../types/baseTypes";
import { ExtensionObject } from "../../types/extensionObject";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * JsonActionNetworkMessage
 */
export class JsonActionNetworkMessage implements IIdentifiable {
    constructor(
        public MessageId: string | undefined,
        public MessageType: string | undefined,
        public PublisherId: string | undefined,
        public Timestamp: DateTime,
        public ResponseAddress: string | undefined,
        public CorrelationData: ByteString,
        public RequestorId: string | undefined,
        public TimeoutHint: Float64,
        public Messages: ExtensionObject[]
    ) { }

    readonly id = 19320

    public static decode(reader: BufferReader): JsonActionNetworkMessage {
        const obj = new JsonActionNetworkMessage(
            reader.readString(),
            reader.readString(),
            reader.readString(),
            DateTime.decode(reader),
            reader.readString(),
            ByteString.decode(reader),
            reader.readString(),
            reader.readDouble(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readExtensionObject(); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.MessageId);
        writer.writeString(this.MessageType);
        writer.writeString(this.PublisherId);
        this.Timestamp.encode(writer);
        writer.writeString(this.ResponseAddress);
        this.CorrelationData.encode(writer);
        writer.writeString(this.RequestorId);
        writer.writeDouble(this.TimeoutHint);
        {
            const arr = this.Messages ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
