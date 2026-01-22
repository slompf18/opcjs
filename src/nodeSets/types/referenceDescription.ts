// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { ExpandedNodeId } from "../../types/expandedNodeId";
import { QualifiedName } from "../../types/qualifiedName";
import { LocalizedText } from "../../types/localizedText";
import { NodeClassEnum } from "./nodeClass";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.29
 */
export class ReferenceDescription implements IIdentifiable {
    constructor(
        public ReferenceTypeId: NodeId,
        public IsForward: boolean,
        public NodeId: ExpandedNodeId,
        public BrowseName: QualifiedName,
        public DisplayName: LocalizedText,
        public NodeClass: NodeClassEnum,
        public TypeDefinition: ExpandedNodeId
    ) { }

    readonly id = 518
}
