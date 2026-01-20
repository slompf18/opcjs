// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { ExpandedNodeId } from "../../types/expandedNodeId";
import { IEncodable } from "../../coders/iEncodable";

/**
 * ReferenceNode
 */
export class ReferenceNode implements IEncodable {
    constructor(
        public ReferenceTypeId: NodeId,
        public IsInverse: boolean,
        public TargetId: ExpandedNodeId
    ) { }

    public static decode(reader: BufferReader): ReferenceNode {
        const obj = new ReferenceNode(
            reader.readNodeId(),
            reader.readBoolean(),
            reader.readExpandedNodeId()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.ReferenceTypeId.encode(writer);
        writer.writeBoolean(this.IsInverse);
        this.TargetId.encode(writer);
    }
}
