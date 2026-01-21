// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
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

    public static decode(reader: BufferReader): ReferenceDescriptionDataType {
        const obj = new ReferenceDescriptionDataType(
            reader.readNodeId(),
            reader.readNodeId(),
            reader.readBoolean(),
            reader.readExpandedNodeId()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.SourceNode.encode(writer);
        this.ReferenceType.encode(writer);
        writer.writeBoolean(this.IsForward);
        this.TargetNode.encode(writer);
    }
}
