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
}
