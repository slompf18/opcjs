// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { BrowseDirectionEnum } from "./browseDirection";
import { UInt32 } from "../../types/baseTypes";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.9.2/#5.9.2.2
 */
export class BrowseDescription implements IEncodable {
    constructor(
        public NodeId: NodeId,
        public BrowseDirection: BrowseDirectionEnum,
        public ReferenceTypeId: NodeId,
        public IncludeSubtypes: boolean,
        public NodeClassMask: UInt32,
        public ResultMask: UInt32
    ) { }

    public static decode(reader: BufferReader): BrowseDescription {
        const obj = new BrowseDescription(
            reader.readNodeId(),
            BrowseDirectionEnum.decode(reader),
            reader.readNodeId(),
            reader.readBoolean(),
            reader.readUInt32(),
            reader.readUInt32()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.NodeId.encode(writer);
        BrowseDirectionEnum.encode(writer, this.BrowseDirection);
        this.ReferenceTypeId.encode(writer);
        writer.writeBoolean(this.IncludeSubtypes);
        writer.writeUInt32(this.NodeClassMask);
        writer.writeUInt32(this.ResultMask);
    }
}
