// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { UInt8 } from "../../types/baseTypes";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.35
 */
export class SimpleTypeDescription implements IEncodable {
    constructor(
        public BaseDataType: NodeId,
        public BuiltInType: UInt8
    ) { }

    public static decode(reader: BufferReader): SimpleTypeDescription {
        const obj = new SimpleTypeDescription(
            reader.readNodeId(),
            reader.readUInt8()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.BaseDataType.encode(writer);
        writer.writeUint8(this.BuiltInType);
    }
}
