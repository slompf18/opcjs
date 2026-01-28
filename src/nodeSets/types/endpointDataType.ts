// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt16 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part12/7.10.22
 */
export class EndpointDataType implements IIdentifiable {
    constructor(
        public DiscoveryUrls: string[],
        public NetworkName: string | undefined,
        public Port: UInt16
    ) { }

    getId(): number { return 15557; }
}
