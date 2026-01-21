// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { Variant } from "../../types/variant";
import { NodeId } from "../../types/nodeId";
import { Int32, UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * VariableTypeNode
 */
export class VariableTypeNode implements IIdentifiable {
    constructor(
        public Value: Variant,
        public DataType: NodeId,
        public ValueRank: Int32,
        public ArrayDimensions: UInt32[],
        public IsAbstract: boolean
    ) { }

    readonly id = 270

    public static decode(reader: BufferReader): VariableTypeNode {
        const obj = new VariableTypeNode(
            reader.readVariant(),
            reader.readNodeId(),
            reader.readInt32(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readUInt32(); } return arr; })(),
            reader.readBoolean()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.Value.encode(writer);
        this.DataType.encode(writer);
        writer.writeInt32(this.ValueRank);
        {
            const arr = this.ArrayDimensions ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeUInt32(v);
            }
        };
        writer.writeBoolean(this.IsAbstract);
    }
}
