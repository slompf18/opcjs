// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { ExpandedNodeId } from "../../types/expandedNodeId";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.9.4/#5.9.4.2
 */
export class BrowsePathTarget implements IIdentifiable {
    constructor(
        public TargetId: ExpandedNodeId,
        public RemainingPathIndex: UInt32
    ) { }

    readonly id = 546

    public static decode(reader: BufferReader): BrowsePathTarget {
        const obj = new BrowsePathTarget(
            reader.readExpandedNodeId(),
            reader.readUInt32()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.TargetId.encode(writer);
        writer.writeUInt32(this.RemainingPathIndex);
    }
}
