// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { BrokerTransportQualityOfServiceEnum } from "./brokerTransportQualityOfService";
import { IEncodable } from "../../coders/iEncodable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.4.2/#6.4.2.3.5
 */
export class BrokerWriterGroupTransportDataType implements IEncodable {
    constructor(
        public QueueName: string | undefined,
        public ResourceUri: string | undefined,
        public AuthenticationProfileUri: string | undefined,
        public RequestedDeliveryGuarantee: BrokerTransportQualityOfServiceEnum
    ) { }

    public static decode(reader: BufferReader): BrokerWriterGroupTransportDataType {
        const obj = new BrokerWriterGroupTransportDataType(
            reader.readString(),
            reader.readString(),
            reader.readString(),
            BrokerTransportQualityOfServiceEnum.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.QueueName);
        writer.writeString(this.ResourceUri);
        writer.writeString(this.AuthenticationProfileUri);
        BrokerTransportQualityOfServiceEnum.encode(writer, this.RequestedDeliveryGuarantee);
    }
}
