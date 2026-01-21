// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { QualifiedName } from "../../types/qualifiedName";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.7.4/#7.7.4.5
 */
export class SimpleAttributeOperand implements IIdentifiable {
    constructor(
        public TypeDefinitionId: NodeId,
        public BrowsePath: QualifiedName[],
        public AttributeId: UInt32,
        public IndexRange: string | undefined
    ) { }

    readonly id = 601

    public static decode(reader: BufferReader): SimpleAttributeOperand {
        const obj = new SimpleAttributeOperand(
            reader.readNodeId(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readQualifiedName(); } return arr; })(),
            reader.readUInt32(),
            reader.readString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.TypeDefinitionId.encode(writer);
        {
            const arr = this.BrowsePath ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        writer.writeUInt32(this.AttributeId);
        writer.writeString(this.IndexRange);
    }
}
