// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.17
 */
export class SemanticChangeStructureDataType implements IEncodable {
    constructor(
        public Affected: NodeId,
        public AffectedType: NodeId
    ) { }

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
