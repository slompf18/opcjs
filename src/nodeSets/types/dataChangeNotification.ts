// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { MonitoredItemNotification } from "./monitoredItemNotification";
import { DiagnosticInfo } from "../../types/diagnosticInfo";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.25.2
 */
export class DataChangeNotification implements IIdentifiable {
    constructor(
        public MonitoredItems: MonitoredItemNotification[],
        public DiagnosticInfos: DiagnosticInfo[]
    ) { }

    getId(): number { return 809; }
}
