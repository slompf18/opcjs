// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { StatusCode } from "../../types/statusCode";
import { ByteString } from "../../types/byteString";
import { ReferenceDescription } from "./referenceDescription";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.6
 */
export class BrowseResult implements IEncodable {
    constructor(
        public StatusCode: StatusCode,
        public ContinuationPoint: ByteString,
        public References: ReferenceDescription[]
    ) { }

    public static decode(reader: BufferReader): BrowseResult {
        const obj = new BrowseResult(
            reader.readStatusCode(),
            ByteString.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = ReferenceDescription.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.StatusCode.encode(writer);
        this.ContinuationPoint.encode(writer);
        {
            const arr = this.References ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
