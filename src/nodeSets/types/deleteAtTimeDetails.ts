// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.9.6/#6.9.6.1
 */
export class DeleteAtTimeDetails implements IIdentifiable {
    constructor(
        public NodeId: NodeId,
        public ReqTimes: Date[]
    ) { }

    readonly id = 689

    public static decode(reader: BufferReader): DeleteAtTimeDetails {
        const obj = new DeleteAtTimeDetails(
            reader.readNodeId(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readDateTime(); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.NodeId.encode(writer);
        {
            const arr = this.ReqTimes ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeDateTime(v);
            }
        };
    }
}
