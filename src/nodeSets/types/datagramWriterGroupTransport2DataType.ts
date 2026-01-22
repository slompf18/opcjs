// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
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
}
