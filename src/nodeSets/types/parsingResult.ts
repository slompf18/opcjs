// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { StatusCode } from "../../types/statusCode";
import { DiagnosticInfo } from "../../types/diagnosticInfo";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.10.3/#5.10.3.1
 */
export class ParsingResult implements IIdentifiable {
    constructor(
        public StatusCode: StatusCode,
        public DataStatusCodes: StatusCode[],
        public DataDiagnosticInfos: DiagnosticInfo[]
    ) { }

    readonly id = 610
}
