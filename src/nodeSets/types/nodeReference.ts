// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * NodeReference
 */
export class NodeReference implements IIdentifiable {
    constructor(
        public NodeId: NodeId,
        public ReferenceTypeId: NodeId,
        public IsForward: boolean,
        public ReferencedNodeIds: NodeId[]
    ) { }

    getId(): number { return 580; }
}
