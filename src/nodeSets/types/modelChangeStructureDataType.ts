// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { UInt8 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.16
 */
export class ModelChangeStructureDataType implements IIdentifiable {
    constructor(
        public Affected: NodeId,
        public AffectedType: NodeId,
        public Verb: UInt8
    ) { }

    readonly id = 877

    public static decode(reader: BufferReader): ModelChangeStructureDataType {
        const obj = new ModelChangeStructureDataType(
            reader.readNodeId(),
            reader.readNodeId(),
            reader.readUInt8()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.Affected.encode(writer);
        this.AffectedType.encode(writer);
        writer.writeUint8(this.Verb);
    }
}
