import { BufferReader } from "../codecs/binary/bufferReader";
import { BufferWriter } from "../codecs/binary/bufferWriter";
import { NodeId } from "./nodeId";

// https://reference.opcfoundation.org/v104/Core/docs/Part6/5.2.2/#5.2.2.10
export class ExpandedNodeId {

    public static hasNamespaceUri(nodeId: NodeId): boolean {
        return ((nodeId.Type >> 7) & 0x1) === 1
    }

    public static hasServerIndex(nodeId: NodeId): boolean {
        return ((nodeId.Type >> 6) & 0x1) === 1
    }

    public static decode(buffer: BufferReader): ExpandedNodeId {
        const nodeId = buffer.readNodeId()
        let namespaceUri = '';
        let serverIndex = 0;

        if (ExpandedNodeId.hasNamespaceUri(nodeId)) {
            namespaceUri = buffer.readString()
        }

        if (ExpandedNodeId.hasServerIndex(nodeId)) {
            serverIndex = buffer.readUInt32()
        }
        
        const obj = new ExpandedNodeId(nodeId, namespaceUri, serverIndex);
        return obj;
    }

    encode(buffer: BufferWriter) {
        buffer.writeNodeId(this.NodeId)
        if (ExpandedNodeId.hasNamespaceUri(this.NodeId)) {
            buffer.writeString(this.NamespaceUri)
        }
        if (ExpandedNodeId.hasServerIndex(this.NodeId)) {
            buffer.writeUInt32(this.ServerIndex)
        }
    }

    constructor(
        public NodeId: NodeId,
        public NamespaceUri: string = '',
        public ServerIndex: number = 0
    ) {
    }
}