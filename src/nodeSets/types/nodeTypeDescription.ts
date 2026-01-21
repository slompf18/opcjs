// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ExpandedNodeId } from "../../types/expandedNodeId";
import { QueryDataDescription } from "./queryDataDescription";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.10.3/#5.10.3.1
 */
export class NodeTypeDescription implements IIdentifiable {
    constructor(
        public TypeDefinitionNode: ExpandedNodeId,
        public IncludeSubTypes: boolean,
        public DataToReturn: QueryDataDescription[]
    ) { }

    readonly id = 573

    public static decode(reader: BufferReader): NodeTypeDescription {
        const obj = new NodeTypeDescription(
            reader.readExpandedNodeId(),
            reader.readBoolean(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = QueryDataDescription.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.TypeDefinitionNode.encode(writer);
        writer.writeBoolean(this.IncludeSubTypes);
        {
            const arr = this.DataToReturn ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
