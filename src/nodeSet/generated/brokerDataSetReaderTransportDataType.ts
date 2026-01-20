// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { BrokerTransportQualityOfServiceEnum } from "./brokerTransportQualityOfService";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.4.2/#6.4.2.6.6
 */
export class BrokerDataSetReaderTransportDataType implements IEncodable {
    constructor(
        public QueueName: string | undefined,
        public ResourceUri: string | undefined,
        public AuthenticationProfileUri: string | undefined,
        public RequestedDeliveryGuarantee: BrokerTransportQualityOfServiceEnum,
        public MetaDataQueueName: string | undefined
    ) { }

    public static decode(reader: BufferReader): BrokerDataSetReaderTransportDataType {
        const obj = new BrokerDataSetReaderTransportDataType(
            reader.readString(),
            reader.readString(),
            reader.readString(),
            BrokerTransportQualityOfServiceEnum.decode(reader),
            reader.readString()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.QueueName);
        writer.writeString(this.ResourceUri);
        writer.writeString(this.AuthenticationProfileUri);
        BrokerTransportQualityOfServiceEnum.encode(writer, this.RequestedDeliveryGuarantee);
        writer.writeString(this.MetaDataQueueName);
    }
}
