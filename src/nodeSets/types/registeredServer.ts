// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { LocalizedText } from "../../types/localizedText";
import { ApplicationTypeEnum } from "./applicationType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.31
 */
export class RegisteredServer implements IIdentifiable {
    constructor(
        public ServerUri: string | undefined,
        public ProductUri: string | undefined,
        public ServerNames: LocalizedText[],
        public ServerType: ApplicationTypeEnum,
        public GatewayServerUri: string | undefined,
        public DiscoveryUrls: string[],
        public SemaphoreFilePath: string | undefined,
        public IsOnline: boolean
    ) { }

    readonly id = 432
}
