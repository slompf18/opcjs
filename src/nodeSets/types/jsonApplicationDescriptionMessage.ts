// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ApplicationDescription } from "./applicationDescription";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * JsonApplicationDescriptionMessage
 */
export class JsonApplicationDescriptionMessage implements IIdentifiable {
    constructor(
        public MessageId: string | undefined,
        public MessageType: string | undefined,
        public PublisherId: string | undefined,
        public Timestamp: Date,
        public Description: ApplicationDescription,
        public ServerCapabilities: string[]
    ) { }

    getId(): number { return 19314; }
}
