// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.17
 */
export class SemanticChangeStructureDataType implements IIdentifiable {
    constructor(
        public Affected: NodeId,
        public AffectedType: NodeId
    ) { }

    readonly id = 897

    public static decode(reader: BufferReader): SemanticChangeStructureDataType {
        const obj = new SemanticChangeStructureDataType(
            reader.readNodeId(),
            reader.readNodeId()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.Affected.encode(writer);
        this.AffectedType.encode(writer);
    }
}
