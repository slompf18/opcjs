// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { BrokerTransportQualityOfServiceEnum } from "./brokerTransportQualityOfService";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.4.2/#6.4.2.6.6
 */
export class BrokerDataSetReaderTransportDataType implements IIdentifiable {
    constructor(
        public QueueName: string | undefined,
        public ResourceUri: string | undefined,
        public AuthenticationProfileUri: string | undefined,
        public RequestedDeliveryGuarantee: BrokerTransportQualityOfServiceEnum,
        public MetaDataQueueName: string | undefined
    ) { }

    getId(): number { return 15670; }
}
