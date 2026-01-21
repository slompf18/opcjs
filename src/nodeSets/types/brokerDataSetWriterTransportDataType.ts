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

    public static decode(reader: BufferReader): BrokerDataSetWriterTransportDataType {
        const obj = new BrokerDataSetWriterTransportDataType(
            reader.readString(),
            reader.readString(),
            reader.readString(),
            BrokerTransportQualityOfServiceEnum.decode(reader),
            reader.readString(),
            reader.readFloat64()
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        writer.writeString(this.QueueName);
        writer.writeString(this.ResourceUri);
        writer.writeString(this.AuthenticationProfileUri);
        BrokerTransportQualityOfServiceEnum.encode(writer, this.RequestedDeliveryGuarantee);
        writer.writeString(this.MetaDataQueueName);
        writer.writeFloat64(this.MetaDataUpdateTime);
    }
}
