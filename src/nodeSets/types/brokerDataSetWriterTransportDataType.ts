// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { BrokerTransportQualityOfServiceEnum } from "./brokerTransportQualityOfService";
import { Float64 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.4.2/#6.4.2.5.7
 */
export class BrokerDataSetWriterTransportDataType implements IIdentifiable {
    constructor(
        public QueueName: string | undefined,
        public ResourceUri: string | undefined,
        public AuthenticationProfileUri: string | undefined,
        public RequestedDeliveryGuarantee: BrokerTransportQualityOfServiceEnum,
        public MetaDataQueueName: string | undefined,
        public MetaDataUpdateTime: Float64
    ) { }

    readonly id = 15669
}
