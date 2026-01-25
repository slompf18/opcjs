// AUTO-GENERATED – DO NOT EDIT
import { BufferReader } from "../../codecs/binary/bufferReader";
import { BufferWriter } from "../../codecs/binary/bufferWriter";
import { NodeId } from "../../types/nodeId";
import { MessageSecurityModeEnum } from "./messageSecurityMode";
import { ByteString } from "../../types/baseTypes";
import { IIdentifiable } from "../../codecs/iIdentifiable";

/**
 * https://reference.opcfoundation.org/v105/Core/docs/Part5/12.12
 */
export class SessionSecurityDiagnosticsDataType implements IIdentifiable {
    constructor(
        public SessionId: NodeId,
        public ClientUserIdOfSession: string | undefined,
        public ClientUserIdHistory: string[],
        public AuthenticationMechanism: string | undefined,
        public Encoding: string | undefined,
        public TransportProtocol: string | undefined,
        public SecurityMode: MessageSecurityModeEnum,
        public SecurityPolicyUri: string | undefined,
        public ClientCertificate: ByteString
    ) { }

    readonly id = 868
}
