// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { PubSubConnectionDataType } from "./pubSubConnectionDataType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * JsonPubSubConnectionMessage
 */
export class JsonPubSubConnectionMessage implements IIdentifiable {
    constructor(
        public MessageId: string | undefined,
        public MessageType: string | undefined,
        public PublisherId: string | undefined,
        public Timestamp: Date,
        public Connection: PubSubConnectionDataType
    ) { }

    readonly id = 19317
}
