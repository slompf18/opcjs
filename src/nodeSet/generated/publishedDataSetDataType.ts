// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { DataSetMetaDataType } from "./dataSetMetaDataType";
import { KeyValuePair } from "./keyValuePair";
import { PublishedDataSetSourceDataType } from "./publishedDataSetSourceDataType";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.3/#6.2.3.5
 */
export class PublishedDataSetDataType implements IEncodable {
    constructor(
        public Name: string | undefined,
        public DataSetFolder: string | undefined[],
        public DataSetMetaData: DataSetMetaDataType,
        public ExtensionFields: KeyValuePair[],
        public DataSetSource: PublishedDataSetSourceDataType
    ) { }

    public static decode(reader: BufferReader): PublishedDataSetDataType {
        const obj = new PublishedDataSetDataType(
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            DataSetMetaDataType.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = KeyValuePair.decode(reader); } return arr; })(),
            PublishedDataSetSourceDataType.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.Name);
        {
            const arr = this.DataSetFolder ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                writer.writeString(v);
            }
        };
        this.DataSetMetaData.encode(writer);
        {
            const arr = this.ExtensionFields ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        this.DataSetSource.encode(writer);
    }
}
