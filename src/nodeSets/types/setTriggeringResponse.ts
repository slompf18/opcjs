// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { StatusCode } from "../../types/statusCode";
import { DiagnosticInfo } from "../../types/diagnosticInfo";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.13.5/#5.13.5.2
 */
export class SetTriggeringResponse implements IIdentifiable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public AddResults: StatusCode[],
        public AddDiagnosticInfos: DiagnosticInfo[],
        public RemoveResults: StatusCode[],
        public RemoveDiagnosticInfos: DiagnosticInfo[]
    ) { }

    getId(): number { return 776; }
}
