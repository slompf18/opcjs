// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { AddNodesResult } from "./addNodesResult";
import { DiagnosticInfo } from "../../types/diagnosticInfo";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.8.2/#5.8.2.2
 */
export class AddNodesResponse implements IIdentifiable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public Results: AddNodesResult[],
        public DiagnosticInfos: DiagnosticInfo[]
    ) { }

    getId(): number { return 489; }
}
