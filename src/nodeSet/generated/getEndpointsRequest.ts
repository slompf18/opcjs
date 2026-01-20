// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.5.4/#5.5.4.2
 */
export class GetEndpointsRequest implements IEncodable {
    constructor(
        public RequestHeader: RequestHeader,
        public EndpointUrl: string | undefined,
        public LocaleIds: string | undefined[],
        public ProfileUris: string | undefined[]
    ) { }

    public static decode(reader: BufferReader): GetEndpointsRequest {
        const obj = new GetEndpointsRequest(
            RequestHeader.decode(reader),
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.RequestHeader.encode(writer);
        writer.writeString(this.EndpointUrl);
        {
            const arr = this.LocaleIds ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeString(v);
            }
        };
        {
            const arr = this.ProfileUris ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeString(v);
            }
        };
    }
}
