// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt16, UInt32 } from "../../types/baseTypes";
import { DataSetFieldContentMaskEnum } from "./dataSetFieldContentMask";
import { KeyValuePair } from "./keyValuePair";
import { DataSetWriterTransportDataType } from "./dataSetWriterTransportDataType";
import { DataSetWriterMessageDataType } from "./dataSetWriterMessageDataType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.4/#6.2.4.5.1
 */
export class DataSetWriterDataType implements IIdentifiable {
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

    readonly id = 15597
}
