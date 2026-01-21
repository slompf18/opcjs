// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { QualifiedName } from "../../types/qualifiedName";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.32
 */
export class DataTypeDescription implements IIdentifiable {
    constructor(
        public DataTypeId: NodeId,
        public Name: QualifiedName
    ) { }

    readonly id = 14525

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
