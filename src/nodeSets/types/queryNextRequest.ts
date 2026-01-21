// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { ByteString } from "../../types/baseTypes";
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
            reader.readByteString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.RequestHeader.encode(writer);
        writer.writeBoolean(this.ReleaseContinuationPoint);
        writer.writeByteString(this.ContinuationPoint);
    }
}
