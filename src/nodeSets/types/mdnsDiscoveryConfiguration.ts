// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.13.2
 */
export class MdnsDiscoveryConfiguration implements IIdentifiable {
    constructor(
        public MdnsServerName: string | undefined,
        public ServerCapabilities: string[]
    ) { }

    getId(): number { return 12891; }
}
