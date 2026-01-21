// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { LocalizedText } from "../../types/localizedText";
import { NodeId } from "../../types/nodeId";
import { Int32, UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.2.12/#12.2.12.10
 */
export class StructureField implements IIdentifiable {
    constructor(
        public Name: string | undefined,
        public Description: LocalizedText,
        public DataType: NodeId,
        public ValueRank: Int32,
        public ArrayDimensions: UInt32[],
        public MaxStringLength: UInt32,
        public IsOptional: boolean
    ) { }

    readonly id = 101

    public static decode(reader: BufferReader): StructureField {
        const obj = new StructureField(
            reader.readString(),
            reader.readLocalizedText(),
            reader.readNodeId(),
            reader.readInt32(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readUInt32(); } return arr; })(),
            reader.readUInt32(),
            reader.readBoolean()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.Name);
        this.Description.encode(writer);
        this.DataType.encode(writer);
        writer.writeInt32(this.ValueRank);
        {
            const arr = this.ArrayDimensions ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeUInt32(v);
            }
        };
        writer.writeUInt32(this.MaxStringLength);
        writer.writeBoolean(this.IsOptional);
    }
}
