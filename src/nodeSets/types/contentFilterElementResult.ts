// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { StatusCode } from "../../types/statusCode";
import { DiagnosticInfo } from "../../types/diagnosticInfo";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.7.2
 */
export class ContentFilterElementResult implements IIdentifiable {
    constructor(
        public StatusCode: StatusCode,
        public OperandStatusCodes: StatusCode[],
        public OperandDiagnosticInfos: DiagnosticInfo[]
    ) { }

    readonly id = 604
}
