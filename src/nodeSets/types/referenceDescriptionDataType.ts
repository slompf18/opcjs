// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { ExpandedNodeId } from "../../types/expandedNodeId";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * ReferenceDescriptionDataType
 */
export class ReferenceDescriptionDataType implements IIdentifiable {
    constructor(
        public SourceNode: NodeId,
        public ReferenceType: NodeId,
        public IsForward: boolean,
        public TargetNode: ExpandedNodeId
    ) { }

    readonly id = 32659
}
