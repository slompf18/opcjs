// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
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

    readonly id = 14523

    public static decode(reader: BufferReader): DataSetMetaDataType {
        const obj = new DataSetMetaDataType(
            reader.readString(),
            reader.readLocalizedText(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = FieldMetaData.decode(reader); } return arr; })(),
            Guid.decode(reader),
            ConfigurationVersionDataType.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.Name);
        this.Description.encode(writer);
        {
            const arr = this.Fields ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        this.DataSetClassId.encode(writer);
        this.ConfigurationVersion.encode(writer);
    }
}
