// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
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
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.9/#6.2.9.13.1
 */
export class DataSetReaderDataType implements IIdentifiable {
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

    readonly id = 15623
}
