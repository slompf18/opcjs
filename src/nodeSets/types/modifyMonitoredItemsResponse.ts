// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { MonitoredItemModifyResult } from "./monitoredItemModifyResult";
import { DiagnosticInfo } from "../../types/diagnosticInfo";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.13.3/#5.13.3.2
 */
export class ModifyMonitoredItemsResponse implements IIdentifiable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public Results: MonitoredItemModifyResult[],
        public DiagnosticInfos: DiagnosticInfo[]
    ) { }

    getId(): number { return 764; }
}
