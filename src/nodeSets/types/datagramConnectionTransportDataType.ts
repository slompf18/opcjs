// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../coders/binary/bufferReader";
import { BufferWriter } from "../../coders/binary/bufferWriter";
import { NetworkAddressDataType } from "./networkAddressDataType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.4.1/#6.4.1.2.2
 */
export class DatagramConnectionTransportDataType implements IIdentifiable {
    constructor(
        public DiscoveryAddress: NetworkAddressDataType
    ) { }

    readonly id = 17467

    public static decode(reader: BufferReader): DatagramConnectionTransportDataType {
        const obj = new DatagramConnectionTransportDataType(
            NetworkAddressDataType.decode(reader)
        );
        return obj;
    }

    encode(writer: BufferWriter): void {
        this.DiscoveryAddress.encode(writer);
    }
}
