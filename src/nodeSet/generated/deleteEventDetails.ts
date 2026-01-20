// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { ByteString } from "../../types/byteString";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part11/6.9.7/#6.9.7.1
 */
export class DeleteEventDetails implements IEncodable {
    constructor(
        public NodeId: NodeId,
        public EventIds: ByteString[]
    ) { }

    public static decode(reader: BufferReader): DeleteEventDetails {
        const obj = new DeleteEventDetails(
            reader.readNodeId(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = ByteString.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.NodeId.encode(writer);
        {
            const arr = this.EventIds ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
