// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { DateTime } from "../../types/dateTime";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.44
 */
export class ViewDescription implements IIdentifiable {
    constructor(
        public ViewId: NodeId,
        public Timestamp: DateTime,
        public ViewVersion: UInt32
    ) { }

    readonly id = 511

    public static decode(reader: BufferReader): ViewDescription {
        const obj = new ViewDescription(
            reader.readNodeId(),
            DateTime.decode(reader),
            reader.readUInt32()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.ViewId.encode(writer);
        this.Timestamp.encode(writer);
        writer.writeUInt32(this.ViewVersion);
    }
}
