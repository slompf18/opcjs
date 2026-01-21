// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.38
 */
export class PortableNodeId implements IIdentifiable {
    constructor(
        public NamespaceUri: string | undefined,
        public Identifier: NodeId
    ) { }

    readonly id = 24106

    public static decode(reader: BufferReader): PortableNodeId {
        const obj = new PortableNodeId(
            reader.readString(),
            reader.readNodeId()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.NamespaceUri);
        this.Identifier.encode(writer);
    }
}
