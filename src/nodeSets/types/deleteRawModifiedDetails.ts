// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.9.5/#6.9.5.1
 */
export class DeleteRawModifiedDetails implements IIdentifiable {
    constructor(
        public NodeId: NodeId,
        public IsDeleteModified: boolean,
        public StartTime: Date,
        public EndTime: Date
    ) { }

    readonly id = 686

    public static decode(reader: BufferReader): DeleteRawModifiedDetails {
        const obj = new DeleteRawModifiedDetails(
            reader.readNodeId(),
            reader.readBoolean(),
            reader.readDateTime(),
            reader.readDateTime()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.NodeId.encode(writer);
        writer.writeBoolean(this.IsDeleteModified);
        writer.writeDateTime(this.StartTime);
        writer.writeDateTime(this.EndTime);
    }
}
