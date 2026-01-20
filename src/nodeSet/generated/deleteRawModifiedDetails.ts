// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { DateTime } from "../../types/dateTime";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.9.5/#6.9.5.1
 */
export class DeleteRawModifiedDetails implements IEncodable {
    constructor(
        public NodeId: NodeId,
        public IsDeleteModified: boolean,
        public StartTime: DateTime,
        public EndTime: DateTime
    ) { }

    public static decode(reader: BufferReader): DeleteRawModifiedDetails {
        const obj = new DeleteRawModifiedDetails(
            reader.readNodeId(),
            reader.readBoolean(),
            DateTime.decode(reader),
            DateTime.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.NodeId.encode(writer);
        writer.writeBoolean(this.IsDeleteModified);
        this.StartTime.encode(writer);
        this.EndTime.encode(writer);
    }
}
