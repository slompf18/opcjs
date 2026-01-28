// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { PerformUpdateTypeEnum } from "./performUpdateType";
import { EventFilter } from "./eventFilter";
import { HistoryEventFieldList } from "./historyEventFieldList";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.9.4/#6.9.4.1
 */
export class UpdateEventDetails implements IIdentifiable {
    constructor(
        public NodeId: NodeId,
        public PerformInsertReplace: PerformUpdateTypeEnum,
        public Filter: EventFilter,
        public EventData: HistoryEventFieldList[]
    ) { }

    getId(): number { return 683; }
}
