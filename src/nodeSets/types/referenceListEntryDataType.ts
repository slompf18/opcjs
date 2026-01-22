// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { ExpandedNodeId } from "../../types/expandedNodeId";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * ReferenceListEntryDataType
 */
export class ReferenceListEntryDataType implements IIdentifiable {
    constructor(
        public ReferenceType: NodeId,
        public IsForward: boolean,
        public TargetNode: ExpandedNodeId
    ) { }

    readonly id = 32660
}
