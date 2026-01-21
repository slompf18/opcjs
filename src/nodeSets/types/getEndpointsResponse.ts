// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { EndpointDescription } from "./endpointDescription";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.5.4/#5.5.4.2
 */
export class GetEndpointsResponse implements IIdentifiable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public Endpoints: EndpointDescription[]
    ) { }

    readonly id = 429

    public static decode(reader: BufferReader): GetEndpointsResponse {
        const obj = new GetEndpointsResponse(
            ResponseHeader.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = EndpointDescription.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.ResponseHeader.encode(writer);
        {
            const arr = this.Endpoints ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
