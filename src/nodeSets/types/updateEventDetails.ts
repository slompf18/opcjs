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

    readonly id = 683

    public static decode(reader: BufferReader): UpdateEventDetails {
        const obj = new UpdateEventDetails(
            reader.readNodeId(),
            PerformUpdateTypeEnum.decode(reader),
            EventFilter.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = HistoryEventFieldList.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.NodeId.encode(writer);
        PerformUpdateTypeEnum.encode(writer, this.PerformInsertReplace);
        this.Filter.encode(writer);
        {
            const arr = this.EventData ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
