// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * CloseSecureChannelRequest
 */
export class CloseSecureChannelRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader
    ) { }

    readonly id = 450

    public static decode(reader: BufferReader): CloseSecureChannelRequest {
        const obj = new CloseSecureChannelRequest(
            RequestHeader.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.RequestHeader.encode(writer);
    }
}
