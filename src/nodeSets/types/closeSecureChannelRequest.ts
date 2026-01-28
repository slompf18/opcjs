// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * CloseSecureChannelRequest
 */
export class CloseSecureChannelRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader
    ) { }

    getId(): number { return 450; }
}
