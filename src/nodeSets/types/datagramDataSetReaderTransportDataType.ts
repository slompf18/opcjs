// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { NetworkAddressDataType } from "./networkAddressDataType";
import { ReceiveQosDataType } from "./receiveQosDataType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.4.1/#6.4.1.6.5
 */
export class DatagramDataSetReaderTransportDataType implements IIdentifiable {
    constructor(
        public Address: NetworkAddressDataType,
        public QosCategory: string | undefined,
        public DatagramQos: ReceiveQosDataType[],
        public Topic: string | undefined
    ) { }

    readonly id = 23614

    public static decode(reader: BufferReader): DatagramDataSetReaderTransportDataType {
        const obj = new DatagramDataSetReaderTransportDataType(
            NetworkAddressDataType.decode(reader),
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = ReceiveQosDataType.decode(reader); } return arr; })(),
            reader.readString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.Address.encode(writer);
        writer.writeString(this.QosCategory);
        {
            const arr = this.DatagramQos ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        writer.writeString(this.Topic);
    }
}
