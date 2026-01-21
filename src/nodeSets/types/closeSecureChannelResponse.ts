// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * CloseSecureChannelResponse
 */
export class CloseSecureChannelResponse implements IIdentifiable {
    constructor(
        public ResponseHeader: ResponseHeader
    ) { }

    readonly id = 453

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
