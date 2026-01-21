// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.3/#6.2.3.10.5
 */
export class ActionMethodDataType implements IIdentifiable {
    constructor(
        public ObjectId: NodeId,
        public MethodId: NodeId
    ) { }

    readonly id = 18597

    public static decode(reader: BufferReader): ActionMethodDataType {
        const obj = new ActionMethodDataType(
            reader.readNodeId(),
            reader.readNodeId()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.ObjectId.encode(writer);
        this.MethodId.encode(writer);
    }
}
