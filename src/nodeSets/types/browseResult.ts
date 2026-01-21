// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { StatusCode } from "../../types/statusCode";
import { ByteString } from "../../types/baseTypes";
import { ReferenceDescription } from "./referenceDescription";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.6
 */
export class BrowseResult implements IIdentifiable {
    constructor(
        public StatusCode: StatusCode,
        public ContinuationPoint: ByteString,
        public References: ReferenceDescription[]
    ) { }

    readonly id = 522

    public static decode(reader: BufferReader): BrowseResult {
        const obj = new BrowseResult(
            reader.readStatusCode(),
            reader.readByteString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = ReferenceDescription.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeStatusCode(this.StatusCode);
        writer.writeByteString(this.ContinuationPoint);
        {
            const arr = this.References ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
