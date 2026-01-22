import { BufferReader } from "../codecs/binary/bufferReader";
import { BufferWriter } from "../codecs/binary/bufferWriter";
import { ByteString, UInt16 } from "./baseTypes";
import { Guid } from "./guid";
import { NodeIdTypeEnum } from "./nodeIdTypeEnum";

// https://reference.opcfoundation.org/v104/Core/docs/Part6/5.2.2/#5.2.2.9
export class NodeId {
    public static NewTwoByte(identifier: number): NodeId {
        return new NodeId(NodeIdTypeEnum.TwoByte, identifier, 0);
    }

    public static NewFourByte(namespace: number, identifier: number): NodeId {
        return new NodeId(NodeIdTypeEnum.FourByte, identifier, namespace);
    }

    public static NewNumeric(namespace: number, identifier: number): NodeId {
        return new NodeId(NodeIdTypeEnum.Numeric, identifier, namespace);
    }

    public static NewString(namespace: number, identifier: string): NodeId {
        return new NodeId(NodeIdTypeEnum.String, identifier, namespace);
    }

    public static NewGuid(namespace: number, identifier: Guid): NodeId {
        return new NodeId(NodeIdTypeEnum.Guid, identifier, namespace);
    }

    public static NewByteString(namespace: number, identifier: ByteString): NodeId {
        return new NodeId(NodeIdTypeEnum.ByteString, identifier, namespace);
    }

    public static decode(buffer: BufferReader): NodeId {
        const type = buffer.readUInt8()
        let namespace: UInt16 = 0;
        let identifier: number | string | ByteString | Guid;

        switch (type) {
            case NodeIdTypeEnum.TwoByte:
                identifier = buffer.readUInt8()
                break;

            case NodeIdTypeEnum.FourByte:
                namespace = buffer.readUInt8()
                identifier = buffer.readUInt16()
                break;

            case NodeIdTypeEnum.Numeric:
                namespace = buffer.readUInt16()
                identifier = buffer.readUInt32()
                break;

            case NodeIdTypeEnum.ByteString:
                namespace = buffer.readUInt16()
                identifier = buffer.readByteString() as ByteString
                break;

            case NodeIdTypeEnum.String:
                namespace = buffer.readUInt16()
                identifier = buffer.readString()
                break;

            case NodeIdTypeEnum.Guid:
                namespace = buffer.readUInt16()
                identifier = buffer.readGuid()
                break;

            default:
                throw new Error(`invalid node id type ${type}`)
        }

        const obj = new NodeId(type, identifier, namespace);
        return obj;
    }

    encode(buffer: BufferWriter) {
        buffer.writeUint8(this.Type)

        switch (this.Type) {
            case NodeIdTypeEnum.TwoByte: {
                buffer.writeUint8(this.Identifier as number)
                break
            }
            case NodeIdTypeEnum.FourByte: {
                buffer.writeUint8(this.Namespace)
                buffer.writeUInt16(this.Identifier as number)
                break
            }
            case NodeIdTypeEnum.Numeric: {
                buffer.writeUInt16(this.Namespace)
                buffer.writeUInt32(this.Identifier as number)
                break
            }
            case NodeIdTypeEnum.Guid: {
                buffer.writeUInt16(this.Namespace)
                buffer.writeGuid(this.Identifier as Guid)
                break
            }
            case NodeIdTypeEnum.ByteString: {
                buffer.writeUInt16(this.Namespace)
                buffer.writeByteString(this.Identifier as ByteString)
                break
            }
            case NodeIdTypeEnum.String: {
                buffer.writeUInt16(this.Namespace)
                buffer.writeString(this.Identifier as string)
                break
            }
            default:
                throw new Error(`invalid node id type ${this.Type}`)
        }
    }

    constructor(
        public Type: NodeIdTypeEnum,
        public Identifier: number | string | ByteString | Guid,
        public Namespace: UInt16) {
    }
}