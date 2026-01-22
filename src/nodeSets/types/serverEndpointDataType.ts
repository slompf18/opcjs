// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part12/7.10.23
 */
export class ServerEndpointDataType implements IIdentifiable {
    constructor(
        public EndpointUrls: string | undefined[],
        public SecuritySettingNames: string | undefined[],
        public TransportProfileUri: string | undefined,
        public UserTokenSettingNames: string | undefined[],
        public ReverseConnectUrls: string | undefined[]
    ) { }

    readonly id = 15558
}
