// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { ByteString } from "../../types/byteString";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.10.4/#5.10.4.2
 */
export class QueryNextRequest implements IIdentifiable {
    constructor(
        public RequestHeader: RequestHeader,
        public ReleaseContinuationPoint: boolean,
        public ContinuationPoint: ByteString
    ) { }

    readonly id = 619

    public static decode(reader: BufferReader): QueryNextRequest {
        const obj = new QueryNextRequest(
            RequestHeader.decode(reader),
            reader.readBoolean(),
            ByteString.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.RequestHeader.encode(writer);
        writer.writeBoolean(this.ReleaseContinuationPoint);
        this.ContinuationPoint.encode(writer);
    }
}
