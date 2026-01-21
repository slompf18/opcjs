// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
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

    public static decode(reader: BufferReader): ReferenceDescription {
        const obj = new ReferenceDescription(
            reader.readNodeId(),
            reader.readBoolean(),
            reader.readExpandedNodeId(),
            reader.readQualifiedName(),
            reader.readLocalizedText(),
            NodeClassEnum.decode(reader),
            reader.readExpandedNodeId()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.ReferenceTypeId.encode(writer);
        writer.writeBoolean(this.IsForward);
        this.NodeId.encode(writer);
        this.BrowseName.encode(writer);
        this.DisplayName.encode(writer);
        NodeClassEnum.encode(writer, this.NodeClass);
        this.TypeDefinition.encode(writer);
    }
}
