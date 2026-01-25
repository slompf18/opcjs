// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { UInt32 } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/5.5.3/#5.5.3.2
 */
export class ServerOnNetwork implements IIdentifiable {
    constructor(
        public RecordId: UInt32,
        public ServerName: string | undefined,
        public DiscoveryUrl: string | undefined,
        public ServerCapabilities: string[]
    ) { }

    readonly id = 12189
}
