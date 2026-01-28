// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { StatusCode } from "../../types/statusCode";
import { DiagnosticInfo } from "../../types/diagnosticInfo";
import { Variant } from "../../types/variant";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.12.2/#5.12.2.2
 */
export class CallMethodResult implements IIdentifiable {
    constructor(
        public StatusCode: StatusCode,
        public InputArgumentResults: StatusCode[],
        public InputArgumentDiagnosticInfos: DiagnosticInfo[],
        public OutputArguments: Variant[]
    ) { }

    getId(): number { return 707; }
}
