// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { QueryDataSet } from "./queryDataSet";
import { ByteString } from "../../types/baseTypes";
import { ParsingResult } from "./parsingResult";
import { DiagnosticInfo } from "../../types/diagnosticInfo";
import { ContentFilterResult } from "./contentFilterResult";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.10.3/#5.10.3.1
 */
export class QueryFirstResponse implements IIdentifiable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public QueryDataSets: QueryDataSet[],
        public ContinuationPoint: ByteString,
        public ParsingResults: ParsingResult[],
        public DiagnosticInfos: DiagnosticInfo[],
        public FilterResult: ContentFilterResult
    ) { }

    readonly id = 616

    public static decode(reader: BufferReader): QueryFirstResponse {
        const obj = new QueryFirstResponse(
            ResponseHeader.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = QueryDataSet.decode(reader); } return arr; })(),
            reader.readByteString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = ParsingResult.decode(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDiagnosticInfo(); } return arr; })(),
            ContentFilterResult.decode(reader)
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
        writer.writeByteString(this.ContinuationPoint);
        {
            const arr = this.ParsingResults ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        {
            const arr = this.DiagnosticInfos ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        this.FilterResult.encode(writer);
    }
}
