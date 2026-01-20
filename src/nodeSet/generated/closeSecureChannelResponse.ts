// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { IEncodable } from "../../coders/iEncodable";

/**
 * CloseSecureChannelResponse
 */
export class CloseSecureChannelResponse implements IEncodable {
    constructor(
        public ResponseHeader: ResponseHeader
    ) { }

    public static decode(reader: BufferReader): CloseSecureChannelResponse {
        const obj = new CloseSecureChannelResponse(
            ResponseHeader.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.ResponseHeader.encode(writer);
    }
}
