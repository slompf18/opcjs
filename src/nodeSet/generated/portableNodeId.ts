// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.38
 */
export class PortableNodeId implements IEncodable {
    constructor(
        public NamespaceUri: string | undefined,
        public Identifier: NodeId
    ) { }

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
