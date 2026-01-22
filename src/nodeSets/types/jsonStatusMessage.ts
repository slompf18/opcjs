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
}
