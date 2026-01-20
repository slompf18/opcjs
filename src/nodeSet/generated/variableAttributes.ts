// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { Variant } from "../../types/variant";
import { NodeId } from "../../types/nodeId";
import { Float64, Int32, UInt32, UInt8 } from "../../types/baseTypes";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.24.3
 */
export class VariableAttributes implements IEncodable {
    constructor(
        public Value: Variant,
        public DataType: NodeId,
        public ValueRank: Int32,
        public ArrayDimensions: UInt32[],
        public AccessLevel: UInt8,
        public UserAccessLevel: UInt8,
        public MinimumSamplingInterval: Float64,
        public Historizing: boolean
    ) { }

    public static decode(reader: BufferReader): VariableAttributes {
        const obj = new VariableAttributes(
            reader.readVariant(),
            reader.readNodeId(),
            reader.readInt32(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readUInt32(); } return arr; })(),
            reader.readUInt8(),
            reader.readUInt8(),
            reader.readDouble(),
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
        writer.writeUint8(this.AccessLevel);
        writer.writeUint8(this.UserAccessLevel);
        writer.writeDouble(this.MinimumSamplingInterval);
        writer.writeBoolean(this.Historizing);
    }
}
