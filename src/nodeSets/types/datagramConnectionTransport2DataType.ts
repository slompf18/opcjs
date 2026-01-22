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
}
