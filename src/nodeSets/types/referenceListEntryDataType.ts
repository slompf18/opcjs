// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { ExpandedNodeId } from "../../types/expandedNodeId";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * ReferenceListEntryDataType
 */
export class ReferenceListEntryDataType implements IIdentifiable {
    constructor(
        public ReferenceType: NodeId,
        public IsForward: boolean,
        public TargetNode: ExpandedNodeId
    ) { }

    readonly id = 32660

    public static decode(reader: BufferReader): ReferenceListEntryDataType {
        const obj = new ReferenceListEntryDataType(
            reader.readNodeId(),
            reader.readBoolean(),
            reader.readExpandedNodeId()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.ReferenceType.encode(writer);
        writer.writeBoolean(this.IsForward);
        this.TargetNode.encode(writer);
    }
}
