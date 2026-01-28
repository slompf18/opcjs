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

    getId(): number { return 15582; }
}
