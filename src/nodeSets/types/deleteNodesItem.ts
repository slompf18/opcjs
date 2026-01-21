// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.3.6
 */
export class DeleteNodesItem implements IIdentifiable {
    constructor(
        public NodeId: NodeId,
        public DeleteTargetReferences: boolean
    ) { }

    readonly id = 382

    public static decode(reader: BufferReader): DeleteNodesItem {
        const obj = new DeleteNodesItem(
            reader.readNodeId(),
            reader.readBoolean()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.NodeId.encode(writer);
        writer.writeBoolean(this.DeleteTargetReferences);
    }
}
