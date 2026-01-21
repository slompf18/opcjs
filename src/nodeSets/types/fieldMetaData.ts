// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { LocalizedText } from "../../types/localizedText";
import { DataSetFieldFlagsEnum } from "./dataSetFieldFlags";
import { Int32, UInt32, UInt8 } from "../../types/baseTypes";
import { NodeId } from "../../types/nodeId";
import { Guid } from "../../types/guid";
import { KeyValuePair } from "./keyValuePair";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.3/#6.2.3.2.4
 */
export class FieldMetaData implements IIdentifiable {
    constructor(
        public Name: string | undefined,
        public Description: LocalizedText,
        public FieldFlags: DataSetFieldFlagsEnum,
        public BuiltInType: UInt8,
        public DataType: NodeId,
        public ValueRank: Int32,
        public ArrayDimensions: UInt32[],
        public MaxStringLength: UInt32,
        public DataSetFieldId: Guid,
        public Properties: KeyValuePair[]
    ) { }

    readonly id = 14524

    public static decode(reader: BufferReader): FieldMetaData {
        const obj = new FieldMetaData(
            reader.readString(),
            reader.readLocalizedText(),
            DataSetFieldFlagsEnum.decode(reader),
            reader.readUInt8(),
            reader.readNodeId(),
            reader.readInt32(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readUInt32(); } return arr; })(),
            reader.readUInt32(),
            reader.readGuid(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = KeyValuePair.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.Name);
        this.Description.encode(writer);
        DataSetFieldFlagsEnum.encode(writer, this.FieldFlags);
        writer.writeUint8(this.BuiltInType);
        this.DataType.encode(writer);
        writer.writeInt32(this.ValueRank);
        {
            const arr = this.ArrayDimensions ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeUInt32(v);
            }
        };
        writer.writeUInt32(this.MaxStringLength);
        writer.writeGuid(this.DataSetFieldId);
        {
            const arr = this.Properties ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
