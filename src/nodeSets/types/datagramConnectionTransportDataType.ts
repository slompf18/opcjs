// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NetworkAddressDataType } from "./networkAddressDataType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.4.1/#6.4.1.2.2
 */
export class DatagramConnectionTransportDataType implements IIdentifiable {
    constructor(
        public DiscoveryAddress: NetworkAddressDataType
    ) { }

    getId(): number { return 17467; }
}
