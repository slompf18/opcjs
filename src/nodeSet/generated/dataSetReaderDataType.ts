// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { Variant } from "../../types/variant";
import { Float64, UInt16, UInt32 } from "../../types/baseTypes";
import { DataSetMetaDataType } from "./dataSetMetaDataType";
import { DataSetFieldContentMaskEnum } from "./dataSetFieldContentMask";
import { MessageSecurityModeEnum } from "./messageSecurityMode";
import { EndpointDescription } from "./endpointDescription";
import { KeyValuePair } from "./keyValuePair";
import { DataSetReaderTransportDataType } from "./dataSetReaderTransportDataType";
import { DataSetReaderMessageDataType } from "./dataSetReaderMessageDataType";
import { SubscribedDataSetDataType } from "./subscribedDataSetDataType";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.9/#6.2.9.13.1
 */
export class DataSetReaderDataType implements IEncodable {
    constructor(
        public Name: string | undefined,
        public Enabled: boolean,
        public PublisherId: Variant,
        public WriterGroupId: UInt16,
        public DataSetWriterId: UInt16,
        public DataSetMetaData: DataSetMetaDataType,
        public DataSetFieldContentMask: DataSetFieldContentMaskEnum,
        public MessageReceiveTimeout: Float64,
        public KeyFrameCount: UInt32,
        public HeaderLayoutUri: string | undefined,
        public SecurityMode: MessageSecurityModeEnum,
        public SecurityGroupId: string | undefined,
        public SecurityKeyServices: EndpointDescription[],
        public DataSetReaderProperties: KeyValuePair[],
        public TransportSettings: DataSetReaderTransportDataType,
        public MessageSettings: DataSetReaderMessageDataType,
        public SubscribedDataSet: SubscribedDataSetDataType
    ) { }

    public static decode(reader: BufferReader): DataSetReaderDataType {
        const obj = new DataSetReaderDataType(
            reader.readString(),
            reader.readBoolean(),
            reader.readVariant(),
            reader.readUInt16(),
            reader.readUInt16(),
            DataSetMetaDataType.decode(reader),
            DataSetFieldContentMaskEnum.decode(reader),
            reader.readDouble(),
            reader.readUInt32(),
            reader.readString(),
            MessageSecurityModeEnum.decode(reader),
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = EndpointDescription.decode(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = KeyValuePair.decode(reader); } return arr; })(),
            DataSetReaderTransportDataType.decode(reader),
            DataSetReaderMessageDataType.decode(reader),
            SubscribedDataSetDataType.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.Name);
        writer.writeBoolean(this.Enabled);
        this.PublisherId.encode(writer);
        writer.writeUInt16(this.WriterGroupId);
        writer.writeUInt16(this.DataSetWriterId);
        this.DataSetMetaData.encode(writer);
        DataSetFieldContentMaskEnum.encode(writer, this.DataSetFieldContentMask);
        writer.writeDouble(this.MessageReceiveTimeout);
        writer.writeUInt32(this.KeyFrameCount);
        writer.writeString(this.HeaderLayoutUri);
        MessageSecurityModeEnum.encode(writer, this.SecurityMode);
        writer.writeString(this.SecurityGroupId);
        {
            const arr = this.SecurityKeyServices ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        {
            const arr = this.DataSetReaderProperties ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        this.TransportSettings.encode(writer);
        this.MessageSettings.encode(writer);
        this.SubscribedDataSet.encode(writer);
    }
}
