import { BufferReader } from "../codecs/binary/bufferReader";
import { BufferWriter } from "../codecs/binary/bufferWriter";
import { Float32, Float64, Int16, Int32, Int64, Int8, UInt16, UInt32, UInt64, UInt8 } from "./baseTypes";
import { DataValue } from "./dataValue";
import { DiagnosticInfo } from "./diagnosticInfo";
import { ExpandedNodeId } from "./expandedNodeId";
import { ExtensionObject } from "./extensionObject";
import { Guid } from "./guid";
import { LocalizedText } from "./localizedText";
import { NodeId } from "./nodeId";
import { QualifiedName } from "./qualifiedName";
import { StatusCode } from "./statusCode";
import { TypeId } from "./typeId";

// https://reference.opcfoundation.org/Core/Part6/v105/docs/5.2.2.16
export class Variant {
    private static readonly MaskArrayDimensions = 0x40;
    private static readonly MaskArrayValues = 0x80;

    public static HasArrayValues(encodingMask: UInt8): boolean {
        return (encodingMask & Variant.MaskArrayValues) === Variant.MaskArrayValues;
    }

    public static HasArrayDimensions(encodingMask: UInt8): boolean {
        return (encodingMask & Variant.MaskArrayDimensions) === Variant.MaskArrayDimensions;
    }

    public static GetType(encodingMask: UInt8): TypeId {
        return encodingMask & 0x3F;
    }

    public static decode(buffer: BufferReader): Variant {
        const encodingMask = buffer.readUInt8();
        const variantType = Variant.GetType(encodingMask);
        let arrayLength : Int32 | undefined;
        let arrayDimensions: Int32[] | undefined;

        if (Variant.HasArrayValues(encodingMask)) {
            // Read array of values based on variant type
            arrayLength = buffer.readInt32();
        }
        const value = Variant.decodeValue(buffer, encodingMask)

        return new Variant(encodingMask, value, arrayLength);
    }

private static decodeValue(b: BufferReader, encodingMask: UInt8): unknown {
    switch (Variant.GetType(encodingMask)) {
      case TypeId.Boolean: {
        return b.readInt8()
      }
      case TypeId.Byte: {
        return b.readUInt8()
      }
      case TypeId.Int16: {
        return b.readInt16()
      }
      case TypeId.Uint16: {
        return b.readUInt16()
      }
      case TypeId.Int32: {
        return b.readInt32()
      }
      case TypeId.Uint32: {
        return b.readUInt32()
      }
      case TypeId.Int64: {
        return b.readInt64()
      }
      case TypeId.Uint64: {
        return b.readUInt64()
      }
      case TypeId.Float: {
        return b.readFloat32()
      }
      case TypeId.Double: {
        return b.readFloat64()
      }
      case TypeId.String: {
        return b.readString()
      }
      case TypeId.DateTime: {
        return b.readDateTime()
      }
      case TypeId.GUID: {
        return b.readGuid()
      }
      case TypeId.ByteString: {
        return b.readByteString()
      }
      // case TypeIDXMLElement: {
      // return XMLElement(buf.ReadString())
      // break
      // }
      case TypeId.NodeID: {
        return b.readNodeId()
      }
      case TypeId.ExpandedNodeID: {
        return b.readExpandedNodeId()
      }
      case TypeId.StatusCode: {
        return b.readStatusCode()
      }
      case TypeId.QualifiedName: {
        return b.readQualifiedName()
      }
      case TypeId.LocalizedText: {
        return b.readLocalizedText()
      }
      case TypeId.ExtensionObject: {
        return b.readExtensionObject()
      }
      case TypeId.DataValue: {
        return b.readDataValue()
      }
      case TypeId.Variant: {
        // todo: limit recursion depth to 100
        return b.readVariant()
      }
      case TypeId.DiagnosticInfo: {
        // todo: limit recursion depth to 100
        return b.readDiagnosticInfo()
      }
      default:
        throw new Error(`unsupported type: ${Variant.GetType(encodingMask)}`)
    }
  }

    encode(buffer: BufferWriter) {
        buffer.writeUint8(this.EncodingMask);

        if (Variant.HasArrayValues(this.EncodingMask)) {
            buffer.writeInt32(this.ArrayLength as Int32);
        } 
        
        this.encodeRecursive(buffer, this.Value)
    }

  private encodeRecursive(b: BufferWriter, val: unknown): void {
    this.encodeValue(b, val)
  }
  
  private encodeValue(b: BufferWriter, v: unknown): void {
    switch (Variant.GetType(this.EncodingMask)) {
      case TypeId.Boolean: {
        b.writeBoolean(v as boolean)
        break
      }
      case TypeId.SByte: {
        b.writeInt8(v as Int8)
        break
      }
      case TypeId.Byte: {
        b.writeUint8(v as UInt8)
        break
      }
      case TypeId.Int16: {
        b.writeInt16(v as Int16)
        break
      }
      case TypeId.Uint16: {
        b.writeUInt16(v as UInt16)
        break
      }
      case TypeId.Int32: {
        b.writeInt32(v as Int32)
        break
      }
      case TypeId.Uint32: {
        b.writeUInt32(v as UInt32)
        break
      }
      case TypeId.Int64: {
        b.writeInt64(v as Int64)
        break
      }
      case TypeId.Uint64: {
        b.writeUInt64(v as UInt64)
        break
      }
      case TypeId.Float: {
        b.writeFloat32(v as Float32)
        break
      }
      case TypeId.Double: {
        b.writeFloat64(v as Float64)
        break
      }
      case TypeId.String: {
        b.writeString(v as string)
        break
      }
      case TypeId.DateTime: {
        b.writeDateTime(v as Date)
        break
      }
      case TypeId.GUID: {
        b.writeGuid(v as Guid)
        break
      }
      case TypeId.ByteString: {
        b.writeByteString(v as Uint8Array)
        break
      }
      //   case 'XMLElement': {
      //     b.writeString(string(v))
      //     break
      //   }
      case TypeId.NodeID: {
        b.writeNodeId(v as NodeId)
        break
      }
      case TypeId.ExpandedNodeID: {
        b.writeExpandedNodeId(v as ExpandedNodeId)
        break
      }
      case TypeId.StatusCode: {
        b.writeStatusCode(v as StatusCode)
        break
      }
      case TypeId.QualifiedName: {
        b.writeQualifiedName(v as QualifiedName)
        break
      }
      case TypeId.LocalizedText: {
        b.writeLocalizedText(v as LocalizedText)
        break
      }
      case TypeId.ExtensionObject: {
        b.writeExtensionObject(v as ExtensionObject)
        break
      }
      case TypeId.DataValue: {
        b.writeDataValue(v as DataValue)
        break
      }
      case TypeId.Variant: {
        b.writeVariant(v as Variant)
        break
      }
      case TypeId.DiagnosticInfo: {
        b.writeDiagnosticInfo(v as DiagnosticInfo)
        break
      }
      default:
        throw new Error(`unsupported type: ${Variant.GetType(this.EncodingMask)}`)
    }
  }

    constructor(
        public EncodingMask: UInt8 = 0,
        public Value: unknown,
        public ArrayLength?: Int32,
        public ArrayDimensionsLength?: Int32,
        public ArrayDimensions?: Int32[]
    ) { }
}