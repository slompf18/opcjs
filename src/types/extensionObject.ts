import { BufferReader } from "../codecs/binary/bufferReader";
import { BufferWriter } from "../codecs/binary/bufferWriter";
import { ExpandedNodeId } from "./expandedNodeId";
import { NodeId } from "./nodeId";
import { ByteString, UInt8 } from "./baseTypes";
import { SchemaCodec } from "../nodeSets/schemaCodec";

// https://reference.opcfoundation.org/Core/Part6/v105/docs/5.2.2.15
export class ExtensionObject {
    private static readonly EncodingNone = 0x00;
    private static readonly EncodingByteString = 0x01;
    private static readonly EncodingXmlElement = 0x02;

    public static newEmpty(): ExtensionObject {
        return new ExtensionObject(new ExpandedNodeId(NodeId.NewTwoByte(0)), ExtensionObject.EncodingNone, undefined);
    }

    public static decode(buffer: BufferReader): ExtensionObject {
        const typeId = buffer.readExpandedNodeId();
        const encoding = buffer.readUInt8();
        let body: ByteString | string | undefined;

        if (encoding === ExtensionObject.EncodingByteString) {
            body = buffer.readByteString();
        } else if (encoding === ExtensionObject.EncodingXmlElement) {
            body = buffer.readString();
        }

        return new ExtensionObject(typeId, encoding, body);
    }

    decodeBody(): unknown {
        switch (this.Encoding) {
            case ExtensionObject.EncodingByteString:
                const buffer = new BufferReader(this.Body as Uint8Array)
                return SchemaCodec.decodeBinaryWithNodeId(buffer, this.TypeId);
            case ExtensionObject.EncodingXmlElement:
                throw new Error('Encoding of extension objects via XML is not implemented.')
            default:
                throw new Error('Unknown encoding mode in extension objectd.')
        }
    }

    encode(buffer: BufferWriter) {
        buffer.writeExpandedNodeId(this.TypeId);
        buffer.writeUint8(this.Encoding);

        if (this.Encoding === ExtensionObject.EncodingByteString && this.Body instanceof Uint8Array) {
            buffer.writeByteString(this.Body);
        } else if (this.Encoding === ExtensionObject.EncodingXmlElement && typeof this.Body === 'string') {
            buffer.writeString(this.Body);
        }
    }

    constructor(
        public TypeId: ExpandedNodeId = new ExpandedNodeId(NodeId.NewTwoByte(0)),
        public Encoding: UInt8 = ExtensionObject.EncodingNone,
        public Body?: ByteString | string
    ) { }
}