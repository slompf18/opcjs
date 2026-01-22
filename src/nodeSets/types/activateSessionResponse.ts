// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { ByteString } from "../../types/baseTypes";
import { StatusCode } from "../../types/statusCode";
import { DiagnosticInfo } from "../../types/diagnosticInfo";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.7.3/#5.7.3.2
 */
export class ActivateSessionResponse implements IIdentifiable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public ServerNonce: ByteString,
        public Results: StatusCode[],
        public DiagnosticInfos: DiagnosticInfo[]
    ) { }

    readonly id = 468
}
