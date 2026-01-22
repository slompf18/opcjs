// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { BrowseResult } from "./browseResult";
import { DiagnosticInfo } from "../../types/diagnosticInfo";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.9.2/#5.9.2.2
 */
export class BrowseResponse implements IIdentifiable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public Results: BrowseResult[],
        public DiagnosticInfos: DiagnosticInfo[]
    ) { }

    readonly id = 528
}
