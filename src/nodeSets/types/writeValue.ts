// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { UInt32 } from "../../types/baseTypes";
import { DataValue } from "../../types/dataValue";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.11.4/#5.11.4.2
 */
export class WriteValue implements IIdentifiable {
    constructor(
        public NodeId: NodeId,
        public AttributeId: UInt32,
        public IndexRange: string | undefined,
        public Value: DataValue
    ) { }

    readonly id = 668

    public static decode(reader: BufferReader): WriteValue {
        const obj = new WriteValue(
            reader.readNodeId(),
            reader.readUInt32(),
            reader.readString(),
            reader.readDataValue()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.NodeId.encode(writer);
        writer.writeUInt32(this.AttributeId);
        writer.writeString(this.IndexRange);
        this.Value.encode(writer);
    }
}
