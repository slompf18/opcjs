// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { DataSetMetaDataType } from "./dataSetMetaDataType";
import { KeyValuePair } from "./keyValuePair";
import { PublishedDataSetSourceDataType } from "./publishedDataSetSourceDataType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.3/#6.2.3.5
 */
export class PublishedDataSetDataType implements IIdentifiable {
    constructor(
        public Name: string | undefined,
        public DataSetFolder: string[],
        public DataSetMetaData: DataSetMetaDataType,
        public ExtensionFields: KeyValuePair[],
        public DataSetSource: PublishedDataSetSourceDataType
    ) { }

    getId(): number { return 15578; }
}
