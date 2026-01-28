// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { LocalizedText } from "../../types/localizedText";
import { ApplicationTypeEnum } from "./applicationType";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.3.3
 */
export class ApplicationDescription implements IIdentifiable {
    constructor(
        public ApplicationUri: string | undefined,
        public ProductUri: string | undefined,
        public ApplicationName: LocalizedText,
        public ApplicationType: ApplicationTypeEnum,
        public GatewayServerUri: string | undefined,
        public DiscoveryProfileUri: string | undefined,
        public DiscoveryUrls: string[]
    ) { }

    getId(): number { return 308; }
}
