// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { TransferResult } from "./transferResult";
import { DiagnosticInfo } from "../../types/diagnosticInfo";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.14.7/#5.14.7.2
 */
export class TransferSubscriptionsResponse implements IIdentifiable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public Results: TransferResult[],
        public DiagnosticInfos: DiagnosticInfo[]
    ) { }

    getId(): number { return 842; }
}
