// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
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

    public static decode(reader: BufferReader): ReaderGroupDataType {
        const obj = new ReaderGroupDataType(
            ReaderGroupTransportDataType.decode(reader),
            ReaderGroupMessageDataType.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = DataSetReaderDataType.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.TransportSettings.encode(writer);
        this.MessageSettings.encode(writer);
        {
            const arr = this.DataSetReaders ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
