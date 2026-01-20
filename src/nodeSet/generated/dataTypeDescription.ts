// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { QualifiedName } from "../../types/qualifiedName";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.32
 */
export class DataTypeDescription implements IEncodable {
    constructor(
        public DataTypeId: NodeId,
        public Name: QualifiedName
    ) { }

    public static decode(reader: BufferReader): DataTypeDescription {
        const obj = new DataTypeDescription(
            reader.readNodeId(),
            reader.readQualifiedName()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.DataTypeId.encode(writer);
        this.Name.encode(writer);
    }
}
