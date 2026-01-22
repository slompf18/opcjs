// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { HistoryUpdateResult } from "./historyUpdateResult";
import { DiagnosticInfo } from "../../types/diagnosticInfo";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.11.5/#5.11.5.2
 */
export class HistoryUpdateResponse implements IIdentifiable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public Results: HistoryUpdateResult[],
        public DiagnosticInfos: DiagnosticInfo[]
    ) { }

    readonly id = 701
}
