// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { MessageSecurityModeEnum } from "./messageSecurityMode";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part18/4.4.2
 */
export class EndpointType implements IIdentifiable {
    constructor(
        public EndpointUrl: string | undefined,
        public SecurityMode: MessageSecurityModeEnum,
        public SecurityPolicyUri: string | undefined,
        public TransportProfileUri: string | undefined
    ) { }

    getId(): number { return 15528; }
}
