// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { StatusCode } from "../../types/statusCode";
import { DiagnosticInfo } from "../../types/diagnosticInfo";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.11.4/#5.11.4.2
 */
export class WriteResponse implements IIdentifiable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public Results: StatusCode[],
        public DiagnosticInfos: DiagnosticInfo[]
    ) { }

    readonly id = 674
}
