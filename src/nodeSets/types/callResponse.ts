// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { CallMethodResult } from "./callMethodResult";
import { DiagnosticInfo } from "../../types/diagnosticInfo";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.12.2/#5.12.2.2
 */
export class CallResponse implements IIdentifiable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public Results: CallMethodResult[],
        public DiagnosticInfos: DiagnosticInfo[]
    ) { }

    readonly id = 713
}
