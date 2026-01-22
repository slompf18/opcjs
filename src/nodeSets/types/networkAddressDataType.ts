// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.7/#6.2.7.5.3
 */
export class NetworkAddressDataType implements IIdentifiable {
    constructor(
        public NetworkInterface: string | undefined
    ) { }

    readonly id = 15502
}
