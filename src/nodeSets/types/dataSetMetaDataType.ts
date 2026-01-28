// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { LocalizedText } from "../../types/localizedText";
import { FieldMetaData } from "./fieldMetaData";
import { Guid } from "../../types/guid";
import { ConfigurationVersionDataType } from "./configurationVersionDataType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.3/#6.2.3.2.3
 */
export class DataSetMetaDataType implements IIdentifiable {
    constructor(
        public Name: string | undefined,
        public Description: LocalizedText,
        public Fields: FieldMetaData[],
        public DataSetClassId: Guid,
        public ConfigurationVersion: ConfigurationVersionDataType
    ) { }

    getId(): number { return 14523; }
}
