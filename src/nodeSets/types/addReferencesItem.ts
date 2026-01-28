// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { ExpandedNodeId } from "../../types/expandedNodeId";
import { NodeClassEnum } from "./nodeClass";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.3.2
 */
export class AddReferencesItem implements IIdentifiable {
    constructor(
        public SourceNodeId: NodeId,
        public ReferenceTypeId: NodeId,
        public IsForward: boolean,
        public TargetServerUri: string | undefined,
        public TargetNodeId: ExpandedNodeId,
        public TargetNodeClass: NodeClassEnum
    ) { }

    getId(): number { return 379; }
}
