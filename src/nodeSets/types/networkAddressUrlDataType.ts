// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part14/6.2.7/#6.2.7.5.4
 */
export class NetworkAddressUrlDataType implements IIdentifiable {
    constructor(
        public Url: string | undefined
    ) { }

    getId(): number { return 15510; }
}
