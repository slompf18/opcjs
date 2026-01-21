// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { Float64, UInt16, UInt8 } from "../../types/baseTypes";
import { WriterGroupTransportDataType } from "./writerGroupTransportDataType";
import { WriterGroupMessageDataType } from "./writerGroupMessageDataType";
import { DataSetWriterDataType } from "./dataSetWriterDataType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.6/#6.2.6.7.1
 */
export class WriterGroupDataType implements IIdentifiable {
    constructor(
        public WriterGroupId: UInt16,
        public PublishingInterval: Float64,
        public KeepAliveTime: Float64,
        public Priority: UInt8,
        public LocaleIds: string | undefined[],
        public HeaderLayoutUri: string | undefined,
        public TransportSettings: WriterGroupTransportDataType,
        public MessageSettings: WriterGroupMessageDataType,
        public DataSetWriters: DataSetWriterDataType[]
    ) { }

    readonly id = 15480

    public static decode(reader: BufferReader): WriterGroupDataType {
        const obj = new WriterGroupDataType(
            reader.readUInt16(),
            reader.readDouble(),
            reader.readDouble(),
            reader.readUInt8(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            reader.readString(),
            WriterGroupTransportDataType.decode(reader),
            WriterGroupMessageDataType.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = DataSetWriterDataType.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeUInt16(this.WriterGroupId);
        writer.writeDouble(this.PublishingInterval);
        writer.writeDouble(this.KeepAliveTime);
        writer.writeUint8(this.Priority);
        {
            const arr = this.LocaleIds ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeString(v);
            }
        };
        writer.writeString(this.HeaderLayoutUri);
        this.TransportSettings.encode(writer);
        this.MessageSettings.encode(writer);
        {
            const arr = this.DataSetWriters ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
