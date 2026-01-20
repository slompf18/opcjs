// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { IEncodable } from "../../coders/iEncodable";

/**
 * CloseSecureChannelRequest
 */
export class CloseSecureChannelRequest implements IEncodable {
    constructor(
        public RequestHeader: RequestHeader
    ) { }

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
