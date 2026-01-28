// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { ExpandedNodeId } from "../../types/expandedNodeId";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * ReferenceNode
 */
export class ReferenceNode implements IIdentifiable {
    constructor(
        public ReferenceTypeId: NodeId,
        public IsInverse: boolean,
        public TargetId: ExpandedNodeId
    ) { }

    getId(): number { return 285; }
}
