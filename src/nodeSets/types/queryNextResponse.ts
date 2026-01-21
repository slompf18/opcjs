// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { QueryDataSet } from "./queryDataSet";
import { ByteString } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.10.4/#5.10.4.2
 */
export class QueryNextResponse implements IIdentifiable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public QueryDataSets: QueryDataSet[],
        public RevisedContinuationPoint: ByteString
    ) { }

    readonly id = 622

    public static decode(reader: BufferReader): QueryNextResponse {
        const obj = new QueryNextResponse(
            ResponseHeader.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = QueryDataSet.decode(reader); } return arr; })(),
            reader.readByteString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.ResponseHeader.encode(writer);
        {
            const arr = this.QueryDataSets ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        writer.writeByteString(this.RevisedContinuationPoint);
    }
}
