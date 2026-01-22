// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { BrowsePathResult } from "./browsePathResult";
import { DiagnosticInfo } from "../../types/diagnosticInfo";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.9.4/#5.9.4.2
 */
export class TranslateBrowsePathsToNodeIdsResponse implements IIdentifiable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public Results: BrowsePathResult[],
        public DiagnosticInfos: DiagnosticInfo[]
    ) { }

    readonly id = 555
}
