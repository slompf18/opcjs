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

    public static decode(reader: BufferReader): StandaloneSubscribedDataSetDataType {
        const obj = new StandaloneSubscribedDataSetDataType(
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = reader.readString(); } return arr; })(),
            DataSetMetaDataType.decode(reader),
            SubscribedDataSetDataType.decode(reader)
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
        this.SubscribedDataSet.encode(writer);
    }
}
