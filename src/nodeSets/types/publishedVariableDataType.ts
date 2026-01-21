// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { Float64, UInt32 } from "../../types/baseTypes";
import { Variant } from "../../types/variant";
import { QualifiedName } from "../../types/qualifiedName";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.3/#6.2.3.7.1
 */
export class PublishedVariableDataType implements IIdentifiable {
    constructor(
        public PublishedVariable: NodeId,
        public AttributeId: UInt32,
        public SamplingIntervalHint: Float64,
        public DeadbandType: UInt32,
        public DeadbandValue: Float64,
        public IndexRange: string | undefined,
        public SubstituteValue: Variant,
        public MetaDataProperties: QualifiedName[]
    ) { }

    readonly id = 14273

    public static decode(reader: BufferReader): PublishedVariableDataType {
        const obj = new PublishedVariableDataType(
            reader.readNodeId(),
            reader.readUInt32(),
            reader.readFloat64(),
            reader.readUInt32(),
            reader.readFloat64(),
            reader.readString(),
            reader.readVariant(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readQualifiedName(); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.PublishedVariable.encode(writer);
        writer.writeUInt32(this.AttributeId);
        writer.writeFloat64(this.SamplingIntervalHint);
        writer.writeUInt32(this.DeadbandType);
        writer.writeFloat64(this.DeadbandValue);
        writer.writeString(this.IndexRange);
        this.SubstituteValue.encode(writer);
        {
            const arr = this.MetaDataProperties ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
