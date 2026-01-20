// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { ExpandedNodeId } from "../../types/expandedNodeId";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.3.7
 */
export class DeleteReferencesItem implements IEncodable {
    constructor(
        public SourceNodeId: NodeId,
        public ReferenceTypeId: NodeId,
        public IsForward: boolean,
        public TargetNodeId: ExpandedNodeId,
        public DeleteBidirectional: boolean
    ) { }

    public static decode(reader: BufferReader): DeleteReferencesItem {
        const obj = new DeleteReferencesItem(
            reader.readNodeId(),
            reader.readNodeId(),
            reader.readBoolean(),
            reader.readExpandedNodeId(),
            reader.readBoolean()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.SourceNodeId.encode(writer);
        this.ReferenceTypeId.encode(writer);
        writer.writeBoolean(this.IsForward);
        this.TargetNodeId.encode(writer);
        writer.writeBoolean(this.DeleteBidirectional);
    }
}
