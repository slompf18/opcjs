// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ContentFilterElementResult } from "./contentFilterElementResult";
import { DiagnosticInfo } from "../../types/diagnosticInfo";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.7.2
 */
export class ContentFilterResult implements IIdentifiable {
    constructor(
        public ElementResults: ContentFilterElementResult[],
        public ElementDiagnosticInfos: DiagnosticInfo[]
    ) { }

    readonly id = 607
}
