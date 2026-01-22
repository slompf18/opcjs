// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { StatusCode } from "../../types/statusCode";
import { DiagnosticInfo } from "../../types/diagnosticInfo";
import { ContentFilterResult } from "./contentFilterResult";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.22.3
 */
export class EventFilterResult implements IIdentifiable {
    constructor(
        public SelectClauseResults: StatusCode[],
        public SelectClauseDiagnosticInfos: DiagnosticInfo[],
        public WhereClauseResult: ContentFilterResult
    ) { }

    readonly id = 734
}
