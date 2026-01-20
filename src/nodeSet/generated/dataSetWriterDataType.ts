// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { UInt16, UInt32 } from "../../types/baseTypes";
import { DataSetFieldContentMaskEnum } from "./dataSetFieldContentMask";
import { KeyValuePair } from "./keyValuePair";
import { DataSetWriterTransportDataType } from "./dataSetWriterTransportDataType";
import { DataSetWriterMessageDataType } from "./dataSetWriterMessageDataType";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.4/#6.2.4.5.1
 */
export class DataSetWriterDataType implements IEncodable {
    constructor(
        public Name: string | undefined,
        public Enabled: boolean,
        public DataSetWriterId: UInt16,
        public DataSetFieldContentMask: DataSetFieldContentMaskEnum,
        public KeyFrameCount: UInt32,
        public DataSetName: string | undefined,
        public DataSetWriterProperties: KeyValuePair[],
        public TransportSettings: DataSetWriterTransportDataType,
        public MessageSettings: DataSetWriterMessageDataType
    ) { }

    public static decode(reader: BufferReader): DataSetWriterDataType {
        const obj = new DataSetWriterDataType(
            reader.readString(),
            reader.readBoolean(),
            reader.readUInt16(),
            DataSetFieldContentMaskEnum.decode(reader),
            reader.readUInt32(),
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = KeyValuePair.decode(reader); } return arr; })(),
            DataSetWriterTransportDataType.decode(reader),
            DataSetWriterMessageDataType.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.Name);
        writer.writeBoolean(this.Enabled);
        writer.writeUInt16(this.DataSetWriterId);
        DataSetFieldContentMaskEnum.encode(writer, this.DataSetFieldContentMask);
        writer.writeUInt32(this.KeyFrameCount);
        writer.writeString(this.DataSetName);
        {
            const arr = this.DataSetWriterProperties ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        this.TransportSettings.encode(writer);
        this.MessageSettings.encode(writer);
    }
}
