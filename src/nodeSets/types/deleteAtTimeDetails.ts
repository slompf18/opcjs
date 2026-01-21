// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { DateTime } from "../../types/dateTime";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.9.6/#6.9.6.1
 */
export class DeleteAtTimeDetails implements IIdentifiable {
    constructor(
        public NodeId: NodeId,
        public ReqTimes: DateTime[]
    ) { }

    readonly id = 689

    public static decode(reader: BufferReader): DeleteAtTimeDetails {
        const obj = new DeleteAtTimeDetails(
            reader.readNodeId(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = DateTime.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.NodeId.encode(writer);
        {
            const arr = this.ReqTimes ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
