// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.3.6
 */
export class DeleteNodesItem implements IEncodable {
    constructor(
        public NodeId: NodeId,
        public DeleteTargetReferences: boolean
    ) { }

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
