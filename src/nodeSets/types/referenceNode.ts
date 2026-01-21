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

    readonly id = 285

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
