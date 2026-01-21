// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { NetworkAddressDataType } from "./networkAddressDataType";
import { TransmitQosDataType } from "./transmitQosDataType";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.4.1/#6.4.1.3.9
 */
export class DatagramWriterGroupTransport2DataType implements IIdentifiable {
    constructor(
        public Address: NetworkAddressDataType,
        public QosCategory: string | undefined,
        public DatagramQos: TransmitQosDataType[],
        public DiscoveryAnnounceRate: UInt32,
        public Topic: string | undefined
    ) { }

    readonly id = 23613

    public static decode(reader: BufferReader): DatagramWriterGroupTransport2DataType {
        const obj = new DatagramWriterGroupTransport2DataType(
            NetworkAddressDataType.decode(reader),
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = TransmitQosDataType.decode(reader); } return arr; })(),
            reader.readUInt32(),
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
        writer.writeUInt32(this.DiscoveryAnnounceRate);
        writer.writeString(this.Topic);
    }
}
