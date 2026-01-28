// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { HistoryReadResult } from "./historyReadResult";
import { DiagnosticInfo } from "../../types/diagnosticInfo";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.11.3/#5.11.3.2
 */
export class HistoryReadResponse implements IIdentifiable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public Results: HistoryReadResult[],
        public DiagnosticInfos: DiagnosticInfo[]
    ) { }

    getId(): number { return 665; }
}
