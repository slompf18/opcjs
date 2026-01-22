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
}
