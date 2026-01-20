// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { ExpandedNodeId } from "../../types/expandedNodeId";
import { Variant } from "../../types/variant";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/B.2.5
 */
export class QueryDataSet implements IEncodable {
    constructor(
        public NodeId: ExpandedNodeId,
        public TypeDefinitionNode: ExpandedNodeId,
        public Values: Variant[]
    ) { }

    public static decode(reader: BufferReader): QueryDataSet {
        const obj = new QueryDataSet(
            reader.readExpandedNodeId(),
            reader.readExpandedNodeId(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readVariant(); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.NodeId.encode(writer);
        this.TypeDefinitionNode.encode(writer);
        {
            const arr = this.Values ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
