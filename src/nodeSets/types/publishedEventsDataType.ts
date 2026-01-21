// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { SimpleAttributeOperand } from "./simpleAttributeOperand";
import { ContentFilter } from "./contentFilter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.3/#6.2.3.8.4
 */
export class PublishedEventsDataType implements IIdentifiable {
    constructor(
        public EventNotifier: NodeId,
        public SelectedFields: SimpleAttributeOperand[],
        public Filter: ContentFilter
    ) { }

    readonly id = 15582

    public static decode(reader: BufferReader): PublishedEventsDataType {
        const obj = new PublishedEventsDataType(
            reader.readNodeId(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = SimpleAttributeOperand.decode(reader); } return arr; })(),
            ContentFilter.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.EventNotifier.encode(writer);
        {
            const arr = this.SelectedFields ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        this.Filter.encode(writer);
    }
}
