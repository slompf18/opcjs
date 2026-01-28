// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ByteString, Float64 } from "../../types/baseTypes";
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
        public Timestamp: Date,
        public ResponseAddress: string | undefined,
        public CorrelationData: ByteString,
        public RequestorId: string | undefined,
        public TimeoutHint: Float64,
        public Messages: ExtensionObject[]
    ) { }

    getId(): number { return 19320; }
}
