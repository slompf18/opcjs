// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { ApplicationDescription } from "./applicationDescription";
import { ByteString, UInt8 } from "../../types/baseTypes";
import { MessageSecurityModeEnum } from "./messageSecurityMode";
import { UserTokenPolicy } from "./userTokenPolicy";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part4/7.14
 */
export class EndpointDescription implements IIdentifiable {
    constructor(
        public EndpointUrl: string | undefined,
        public Server: ApplicationDescription,
        public ServerCertificate: ByteString,
        public SecurityMode: MessageSecurityModeEnum,
        public SecurityPolicyUri: string | undefined,
        public UserIdentityTokens: UserTokenPolicy[],
        public TransportProfileUri: string | undefined,
        public SecurityLevel: UInt8
    ) { }

    getId(): number { return 312; }
}
