// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ExpandedNodeId } from "../../types/expandedNodeId";
import { NodeId } from "../../types/nodeId";
import { QualifiedName } from "../../types/qualifiedName";
import { NodeClassEnum } from "./nodeClass";
import { ExtensionObject } from "../../types/extensionObject";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.3.1
 */
export class AddNodesItem implements IIdentifiable {
    constructor(
        public ParentNodeId: ExpandedNodeId,
        public ReferenceTypeId: NodeId,
        public RequestedNewNodeId: ExpandedNodeId,
        public BrowseName: QualifiedName,
        public NodeClass: NodeClassEnum,
        public NodeAttributes: ExtensionObject,
        public TypeDefinition: ExpandedNodeId
    ) { }

    getId(): number { return 376; }
}
