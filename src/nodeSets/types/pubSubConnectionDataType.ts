// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { Variant } from "../../types/variant";
import { NetworkAddressDataType } from "./networkAddressDataType";
import { KeyValuePair } from "./keyValuePair";
import { ConnectionTransportDataType } from "./connectionTransportDataType";
import { WriterGroupDataType } from "./writerGroupDataType";
import { ReaderGroupDataType } from "./readerGroupDataType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.7/#6.2.7.5.1
 */
export class PubSubConnectionDataType implements IIdentifiable {
    constructor(
        public Name: string | undefined,
        public Enabled: boolean,
        public PublisherId: Variant,
        public TransportProfileUri: string | undefined,
        public Address: NetworkAddressDataType,
        public ConnectionProperties: KeyValuePair[],
        public TransportSettings: ConnectionTransportDataType,
        public WriterGroups: WriterGroupDataType[],
        public ReaderGroups: ReaderGroupDataType[]
    ) { }

    readonly id = 15617

    public static decode(reader: BufferReader): PubSubConnectionDataType {
        const obj = new PubSubConnectionDataType(
            reader.readString(),
            reader.readBoolean(),
            reader.readVariant(),
            reader.readString(),
            NetworkAddressDataType.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = KeyValuePair.decode(reader); } return arr; })(),
            ConnectionTransportDataType.decode(reader),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = WriterGroupDataType.decode(reader); } return arr; })(),
            (() => { const length = reader.readInt32(); if (length < 0) return []; const arr = new Array(length); for (let i = 0; i < length; i++) { arr[i] = ReaderGroupDataType.decode(reader); } return arr; })()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.Name);
        writer.writeBoolean(this.Enabled);
        this.PublisherId.encode(writer);
        writer.writeString(this.TransportProfileUri);
        this.Address.encode(writer);
        {
            const arr = this.ConnectionProperties ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        this.TransportSettings.encode(writer);
        {
            const arr = this.WriterGroups ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
        {
            const arr = this.ReaderGroups ?? [];
            writer.writeInt32(arr.length);
            for (const v of arr) {
                v.encode(writer);
            }
        };
    }
}
