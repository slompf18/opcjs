// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { UInt32 } from "../../types/baseTypes";
import { QualifiedName } from "../../types/qualifiedName";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.28
 */
export class ReadValueId implements IEncodable {
    constructor(
        public NodeId: NodeId,
        public AttributeId: UInt32,
        public IndexRange: string | undefined,
        public DataEncoding: QualifiedName
    ) { }

    public static decode(reader: BufferReader): ReadValueId {
        const obj = new ReadValueId(
            reader.readNodeId(),
            reader.readUInt32(),
            reader.readString(),
            reader.readQualifiedName()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.NodeId.encode(writer);
        writer.writeUInt32(this.AttributeId);
        writer.writeString(this.IndexRange);
        this.DataEncoding.encode(writer);
    }
}
