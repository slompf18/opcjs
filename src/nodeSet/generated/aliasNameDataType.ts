// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { QualifiedName } from "../../types/qualifiedName";
import { ExpandedNodeId } from "../../types/expandedNodeId";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part17/7.2
 */
export class AliasNameDataType implements IEncodable {
    constructor(
        public AliasName: QualifiedName,
        public ReferencedNodes: ExpandedNodeId[]
    ) { }

    public static decode(reader: BufferReader): AliasNameDataType {
        const obj = new AliasNameDataType(
            reader.readQualifiedName(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readExpandedNodeId(); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.AliasName.encode(writer);
        {
            const arr = this.ReferencedNodes ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
