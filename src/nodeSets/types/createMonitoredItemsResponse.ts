// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ResponseHeader } from "./responseHeader";
import { MonitoredItemCreateResult } from "./monitoredItemCreateResult";
import { DiagnosticInfo } from "../../types/diagnosticInfo";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.13.2/#5.13.2.2
 */
export class CreateMonitoredItemsResponse implements IIdentifiable {
    constructor(
        public ResponseHeader: ResponseHeader,
        public Results: MonitoredItemCreateResult[],
        public DiagnosticInfos: DiagnosticInfo[]
    ) { }

    readonly id = 752
}
