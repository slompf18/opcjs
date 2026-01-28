// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { ExpandedNodeId } from "../../types/expandedNodeId";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.3.7
 */
export class DeleteReferencesItem implements IIdentifiable {
    constructor(
        public SourceNodeId: NodeId,
        public ReferenceTypeId: NodeId,
        public IsForward: boolean,
        public TargetNodeId: ExpandedNodeId,
        public DeleteBidirectional: boolean
    ) { }

    getId(): number { return 385; }
}
