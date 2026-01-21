// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { QosDataType } from "./qosDataType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.4.1/#6.4.1.2.7
 */
export class DatagramConnectionTransport2DataType implements IIdentifiable {
    constructor(
        public DiscoveryAnnounceRate: UInt32,
        public DiscoveryMaxMessageSize: UInt32,
        public QosCategory: string | undefined,
        public DatagramQos: QosDataType[]
    ) { }

    readonly id = 23612

    public static decode(reader: BufferReader): DatagramConnectionTransport2DataType {
        const obj = new DatagramConnectionTransport2DataType(
            reader.readUInt32(),
            reader.readUInt32(),
            reader.readString(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = QosDataType.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeUInt32(this.DiscoveryAnnounceRate);
        writer.writeUInt32(this.DiscoveryMaxMessageSize);
        writer.writeString(this.QosCategory);
        {
            const arr = this.DatagramQos ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
