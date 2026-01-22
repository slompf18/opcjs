// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NetworkAddressDataType } from "./networkAddressDataType";
import { ReceiveQosDataType } from "./receiveQosDataType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.4.1/#6.4.1.6.5
 */
export class DatagramDataSetReaderTransportDataType implements IIdentifiable {
    constructor(
        public Address: NetworkAddressDataType,
        public QosCategory: string | undefined,
        public DatagramQos: ReceiveQosDataType[],
        public Topic: string | undefined
    ) { }

    readonly id = 23614
}
