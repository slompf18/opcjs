// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * NodeReference
 */
export class NodeReference implements IIdentifiable {
    constructor(
        public NodeId: NodeId,
        public ReferenceTypeId: NodeId,
        public IsForward: boolean,
        public ReferencedNodeIds: NodeId[]
    ) { }

    readonly id = 580

    public static decode(reader: BufferReader): NodeReference {
        const obj = new NodeReference(
            reader.readNodeId(),
            reader.readNodeId(),
            reader.readBoolean(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readNodeId(); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.NodeId.encode(writer);
        this.ReferenceTypeId.encode(writer);
        writer.writeBoolean(this.IsForward);
        {
            const arr = this.ReferencedNodeIds ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
