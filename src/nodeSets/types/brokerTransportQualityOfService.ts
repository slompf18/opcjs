// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.4.2/#6.4.2.1
 */
export enum BrokerTransportQualityOfServiceEnum {
    NotSpecified = 0,
    BestEffort = 1,
    AtLeastOnce = 2,
    AtMostOnce = 3,
    ExactlyOnce = 4,
}

export namespace BrokerTransportQualityOfServiceEnum {
    export function decode(reader: BufferReader): BrokerTransportQualityOfServiceEnum {
        return reader.readInt32() as BrokerTransportQualityOfServiceEnum;
    }

    export function encode(writer: BufferWriter, value: BrokerTransportQualityOfServiceEnum): void {
        writer.writeInt32(value as any);
    }
}
