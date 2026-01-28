// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { StatusCode } from "../../types/statusCode";
import { DiagnosticInfo } from "../../types/diagnosticInfo";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.5.6/#5.5.6.2
 */
export class RegisterServer2Response implements IIdentifiable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public ConfigurationResults: StatusCode[],
        public DiagnosticInfos: DiagnosticInfo[]
    ) { }

    getId(): number { return 12194; }
}
