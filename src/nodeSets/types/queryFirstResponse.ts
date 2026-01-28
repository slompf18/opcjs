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

    getId(): number { return 616; }
}
