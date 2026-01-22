// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { DataSetMetaDataType } from "./dataSetMetaDataType";
import { SubscribedDataSetDataType } from "./subscribedDataSetDataType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.10/#6.2.10.5
 */
export class StandaloneSubscribedDataSetDataType implements IIdentifiable {
    constructor(
        public Name: string | undefined,
        public DataSetFolder: string | undefined[],
        public DataSetMetaData: DataSetMetaDataType,
        public SubscribedDataSet: SubscribedDataSetDataType
    ) { }

    readonly id = 23600
}
