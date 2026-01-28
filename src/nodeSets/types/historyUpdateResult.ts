// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { StatusCode } from "../../types/statusCode";
import { DiagnosticInfo } from "../../types/diagnosticInfo";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.11.5/#5.11.5.2
 */
export class HistoryUpdateResult implements IIdentifiable {
    constructor(
        public StatusCode: StatusCode,
        public OperationResults: StatusCode[],
        public DiagnosticInfos: DiagnosticInfo[]
    ) { }

    getId(): number { return 695; }
}
