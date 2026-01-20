// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { Int32, UInt32 } from "../../types/baseTypes";
import { LocalizedText } from "../../types/localizedText";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.2.12/#12.2.12.1
 */
export class Argument implements IEncodable {
    constructor(
        public Name: string | undefined,
        public DataType: NodeId,
        public ValueRank: Int32,
        public ArrayDimensions: UInt32[],
        public Description: LocalizedText
    ) { }

    public static decode(reader: BufferReader): Argument {
        const obj = new Argument(
            reader.readString(),
            reader.readNodeId(),
            reader.readInt32(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readUInt32(); } return arr; })(),
            reader.readLocalizedText()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.Name);
        this.DataType.encode(writer);
        writer.writeInt32(this.ValueRank);
        {
            const arr = this.ArrayDimensions ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeUInt32(v);
            }
        };
        this.Description.encode(writer);
    }
}
