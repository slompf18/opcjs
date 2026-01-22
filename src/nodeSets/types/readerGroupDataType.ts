// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ReaderGroupTransportDataType } from "./readerGroupTransportDataType";
import { ReaderGroupMessageDataType } from "./readerGroupMessageDataType";
import { DataSetReaderDataType } from "./dataSetReaderDataType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.8/#6.2.8.2.1
 */
export class ReaderGroupDataType implements IIdentifiable {
    constructor(
        public TransportSettings: ReaderGroupTransportDataType,
        public MessageSettings: ReaderGroupMessageDataType,
        public DataSetReaders: DataSetReaderDataType[]
    ) { }

    readonly id = 15520
}
