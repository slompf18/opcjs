// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { RequestHeader } from "./requestHeader";
import { ByteString } from "../../types/byteString";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.9.3/#5.9.3.2
 */
export class BrowseNextRequest implements IEncodable {
    constructor(
        public RequestHeader: RequestHeader,
        public ReleaseContinuationPoints: boolean,
        public ContinuationPoints: ByteString[]
    ) { }

    public static decode(reader: BufferReader): BrowseNextRequest {
        const obj = new BrowseNextRequest(
            RequestHeader.decode(reader),
            reader.readBoolean(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = ByteString.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.RequestHeader.encode(writer);
        writer.writeBoolean(this.ReleaseContinuationPoints);
        {
            const arr = this.ContinuationPoints ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
