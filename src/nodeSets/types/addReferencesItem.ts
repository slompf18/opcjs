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

    readonly id = 379

    public static decode(reader: BufferReader): AddReferencesItem {
        const obj = new AddReferencesItem(
            reader.readNodeId(),
            reader.readNodeId(),
            reader.readBoolean(),
            reader.readString(),
            reader.readExpandedNodeId(),
            NodeClassEnum.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.SourceNodeId.encode(writer);
        this.ReferenceTypeId.encode(writer);
        writer.writeBoolean(this.IsForward);
        writer.writeString(this.TargetServerUri);
        this.TargetNodeId.encode(writer);
        NodeClassEnum.encode(writer, this.TargetNodeClass);
    }
}
