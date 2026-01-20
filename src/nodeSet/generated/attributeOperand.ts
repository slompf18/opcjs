// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { RelativePath } from "./relativePath";
import { UInt32 } from "../../types/baseTypes";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.7.4/#7.7.4.4
 */
export class AttributeOperand implements IEncodable {
    constructor(
        public NodeId: NodeId,
        public Alias: string | undefined,
        public BrowsePath: RelativePath,
        public AttributeId: UInt32,
        public IndexRange: string | undefined
    ) { }

    public static decode(reader: BufferReader): AttributeOperand {
        const obj = new AttributeOperand(
            reader.readNodeId(),
            reader.readString(),
            RelativePath.decode(reader),
            reader.readUInt32(),
            reader.readString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.NodeId.encode(writer);
        writer.writeString(this.Alias);
        this.BrowsePath.encode(writer);
        writer.writeUInt32(this.AttributeId);
        writer.writeString(this.IndexRange);
    }
}
